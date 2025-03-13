'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TodayPickContent, BoardSectionSlide } from '@/_types/contents';
import {
  fetchTodayPick,
  fetchBoardSection,
} from '@/entities/contents/main/api';
import { useImageMapping } from '@/entities/contents/hooks';

/* Components */
import { Loading } from '@/features/shared/ui';
import { StatusBar } from '@/features/shared/ui';
import { Header } from '@/features/contents/ui/header';
import { MainSlider } from '@/features/contents/ui/today-pick';
import { BoardSectionSlider } from '@/features/contents/ui/board-section';
import { SectionSliderContainer } from '@/features/contents/ui/section-list';

/* Styles */
import styles from './page.module.css';

const headerText = '오늘의 Dimi’s pick';

const iconUrl = '/assets/images/icons/dimi-eyes-on.svg';

const logoUrl = '/assets/images/icons/logo-ond.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const HomePage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  const [todayPicks, setTodayPicks] = useState<TodayPickContent[]>([]);
  const [boardSections, setBoardSections] = useState<BoardSectionSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [todayResponse, boardResponse] = await Promise.all([
          fetchTodayPick(),
          fetchBoardSection(),
        ]);
        setTodayPicks(todayResponse.data);
        setBoardSections(boardResponse.data);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <main className={styles.container}>
      <StatusBar logoUrl={logoUrl} iconUrlList={iconUrlList} />
      <section>
        <Header headerText={headerText} iconUrl={iconUrl} />
        <MainSlider slides={todayPicks} />
        <BoardSectionSlider
          boardSectionSlides={boardSections}
          getImageSrc={getImageSrc}
        />
        <SectionSliderContainer getImageSrc={getImageSrc} />
      </section>
      <div className={styles.recommendContainer}>
        <img
          src="/assets/images/dimi-group-text.png"
          alt="원하는 콘텐츠를 찾지 못하셨나요? Dimi가 직접 추천하는 당신만을 위한 콘텐츠를 확인해보세요."
        />
        {/* <p>
          <strong>원하는 콘텐츠를 찾지 못하셨나요? </strong> <br />
          <strong>Dimi</strong>가 직접 추천하는 당신만을 위한 콘텐츠를
          확인해보세요.
        </p> */}
      </div>
      <Link
        href="/contents/recommended"
        title="추천 바로가기"
        className={styles.fullButton}
      >
        추천 바로가기
      </Link>
    </main>
  );
};

export default HomePage;
