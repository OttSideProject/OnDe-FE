'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TodayPickContent,
  BoardSectionSlide,
  OrderContent,
  Section,
} from '@/shared/types/contents';
import {
  fetchTodayPick,
  fetchBoardSection,
  fetchOrder,
} from '@/entities/contents/main/api';
import { useImageMapping } from '@/entities/contents/hooks';
import { useLoaderStore } from '@/shared/lib/stores';

/* Components */
import { Loading } from '@/shared/ui';
import { StatusBar } from '@/shared/ui';
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

const iconTypes = ['alert', 'search'];

const sections: Section[] = [
  {
    id: 1,
    title: '지금 가장 인기있는 영화',
    linkText: '',
    linkUrl: '/contents/collect-view',
    sectionSlides: [
      /* ...existing sectionSlides data... */
    ],
  },
  {
    id: 2,
    title: 'NEW! 따끈따끈한 신작',
    linkText: '',
    linkUrl: '/contents/recommended',
    sectionSlides: [
      /* ...existing sectionSlides data... */
    ],
  },
  // ... 나머지 sections 데이터
];

const HomePage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  const [todayPicks, setTodayPicks] = useState<TodayPickContent[]>([]);
  const [boardSections, setBoardSections] = useState<BoardSectionSlide[]>([]);
  const [orderData, setOrderData] = useState<OrderContent[]>([]);
  const { isLoading, setIsLoading } = useLoaderStore();
  const [error, setError] = useState<string | null>(null);
  const [latestOrderData, setLatestOrderData] = useState<OrderContent[]>([]);
  const [popularOrderData, setPopularOrderData] = useState<OrderContent[]>([]);
  const [hasFetchedOrder, setHasFetchedOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const todayResponse = await fetchTodayPick();
        const boardResponse = await fetchBoardSection();

        setTodayPicks(todayResponse.data);
        setBoardSections(boardResponse.data);

        // fetchOrder 호출 여부 체크
        if (!hasFetchedOrder) {
          const [latestResponse, popularResponse] = await Promise.all([
            fetchOrder({
              order: '최신순',
              nowPage: 0,
              pageCount: 20,
            }),
            fetchOrder({
              order: '인기순',
              nowPage: 0,
              pageCount: 20,
            }),
          ]);

          setLatestOrderData(latestResponse.content);
          setPopularOrderData(popularResponse.content);
          setHasFetchedOrder(true); // 호출 상태 업데이트
        }
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasFetchedOrder]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <main className={styles.container}>
      <StatusBar
        logoUrl={logoUrl}
        iconUrlList={iconUrlList}
        iconTypes={iconTypes}
      />
      <section>
        <Header headerText={headerText} iconUrl={iconUrl} />
        <MainSlider slides={todayPicks} />
        <BoardSectionSlider
          boardSectionSlides={boardSections}
          getImageSrc={getImageSrc}
        />
        <SectionSliderContainer
          getImageSrc={getImageSrc}
          latestContent={latestOrderData}
          popularContent={popularOrderData}
        />
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
