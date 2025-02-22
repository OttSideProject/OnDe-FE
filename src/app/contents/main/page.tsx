'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TodayPickContent,
  BoardSectionSlide,
} from '@/_types/contents/contents';
import {
  fetchTodayPick,
  fetchBoardSection,
} from '@/entities/contents/main/api';


/* Components */
import {Loading} from '@/features/shared/ui/loading';
import {StatusBar} from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { MainSlider } from '@/features/contents/ui/today-pick';
import { BoardSectionSlider } from '@/features/contents/ui/board-section';
import { SectionSliderContainer } from '@/features/contents/ui/section-list';


/* Types */
import { Slide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '오늘의 Dimi’s pick';

const iconUrl = '/assets/images/icons/dimi-eyes-on.svg';

const logoUrl = '/assets/images/icons/logo-ond.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const slides: Slide[] = [
  {
    id: 1,
    title: '더 인플루언서',
    age: 'all',
    subTitle: ['흥미진진한', '시리즈'],
    url: 'https://picsum.photos/240/360?random=1',
  },
  {
    id: 2,
    age: '19',
    title: '에일리언',
    subTitle: ['독특한', '서스펜스'],
    url: 'https://picsum.photos/240/360?random=2',
  },
  {
    id: 3,
    age: '15+',
    title: '귀공자',
    subTitle: ['독특한', '서스펜스'],
    url: 'https://picsum.photos/240/360?random=3',
  },
  {
    id: 4,
    age: '12+',
    title: 'title 4',
    subTitle: ['흥미진진한', '시리즈'],
    url: 'https://picsum.photos/240/360?random=4',
  },
  {
    id: 5,
    age: '19',
    title: 'title 5',
    subTitle: ['흥미진진한', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=5',
  },
];

const HomePage: React.FC = () => {
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
        <BoardSectionSlider boardSectionSlides={boardSections} />
        <SectionSliderContainer />
      </section>
      <div className={styles.recommendContainer}>
        <p>
          <strong>원하는 콘텐츠를 찾지 못하셨나요? </strong> <br />
          <strong>Dimi</strong>가 직접 추천하는 당신만을 위한 콘텐츠를
          확인해보세요.
        </p>
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
