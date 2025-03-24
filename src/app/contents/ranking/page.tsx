'use client';

import { useEffect } from 'react';
/* Types */
import { Slide } from '@/shared/types/contents';

/* Components */
import { useImageMapping } from '@/entities/contents/hooks';
import { useLoaderStore } from '@/shared/lib/stores';
import { Loading } from '@/shared/ui/loading';
import { StatusBar } from '@/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import {
  RankingMainContainer,
  RankingTabContents,
} from '@/features/contents/ui/ranking';

/* Data Hooks & Stores */
import { useRankingStore } from '@/entities/contents/stores/ranking';
import { useRankingData } from '@/entities/contents/hooks';

/* Styles */
import styles from './page.module.css';

const headerText = '전체 콘텐츠 랭킹';

const iconUrl = '/assets/images/icons/crown.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const iconTypes = ['alert', 'search'];

const rankingTopList: Slide[] = [
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
];

const RankingPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  const { setIsLoading } = useLoaderStore();

  // 랭킹 스토어 사용
  const {
    currentCategory,
    dataState,
    error,
    initialize,
    initializeFromStorage,
    handleFilterApplied,
    handleOttSelected,
    handleDataStateChange,
    getEmptyMessage,
  } = useRankingStore();

  // React Query를 사용한 데이터 로드
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage 
  } = useRankingData(currentCategory);

  // 컴포넌트 마운트 시 스토어 초기화
  useEffect(() => {
    console.log('Page: Initializing ranking store');
    initialize();
  }, [initialize]);

  // 데이터 로드 상태 변경 시 데이터 상태 업데이트
  useEffect(() => {
    console.log('Page: Data load status changed:', { 
      isLoading, 
      hasData: data?.pages.length && data.pages[0].content.length > 0
    });
    
    const hasData = data?.pages.length && data.pages[0].content.length > 0;
    
    // 데이터 상태 업데이트
    handleDataStateChange(!!hasData, isLoading, currentCategory);
    
    // 전역 로딩 상태 업데이트
    setIsLoading(isLoading);
  }, [data, isLoading, currentCategory, handleDataStateChange, setIsLoading]);

  // 필터 적용 이벤트 리스너 등록
  useEffect(() => {
    const handleFilterAppliedEvent = (
      event: CustomEvent<{ category: string }>,
    ) => {
      console.log('Page: Filter applied event received:', event.detail);
      const { category } = event.detail;
      handleFilterApplied(category);
    };

    // 이벤트 리스너 등록
    window.addEventListener(
      'filterApplied',
      handleFilterAppliedEvent as EventListener,
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener(
        'filterApplied',
        handleFilterAppliedEvent as EventListener,
      );
    };
  }, [handleFilterApplied]);

  // OTT 선택 이벤트 리스너 등록
  useEffect(() => {
    const handleOTTSelectedEvent = (event: CustomEvent<{ ott: string }>) => {
      console.log('Page: OTT selected event received:', event.detail);
      const { ott } = event.detail;
      
      // 이벤트 발생 소스 확인 로그
      console.log('Event source:', event.target);
      
      // OTT 선택 처리
      handleOttSelected(ott);
      
      // 데이터 강제 리페치 (React Query 캐시 무시)
      setTimeout(() => {
        console.log('Forcing data refetch for category:', ott);
        fetchNextPage({ cancelRefetch: false });
      }, 0);
    };

    // 이벤트 리스너 등록
    window.addEventListener(
      'ottSelected',
      handleOTTSelectedEvent as EventListener,
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener(
        'ottSelected',
        handleOTTSelectedEvent as EventListener,
      );
    };
  }, [handleOttSelected, fetchNextPage]);

  // 현재 카테고리 변경 시 데이터 리페치
  useEffect(() => {
    if (currentCategory) {
      console.log('Page: Current category changed, refetching data:', currentCategory);
      // 데이터 상태를 로딩으로 명시적 설정
      handleDataStateChange(false, true, currentCategory);
      
      // 데이터 강제 리페치
      setTimeout(() => {
        fetchNextPage({ cancelRefetch: false });
      }, 0);
    }
  }, [currentCategory, fetchNextPage, handleDataStateChange]);

  // 로딩 중일 때 로딩 컴포넌트 표시
  if (isLoading && dataState === 'loading') return <Loading />;

  // 에러가 있을 때 에러 메시지 표시
  if (error) return <div className={styles.errorContainer}>{error}</div>;

  return (
    <main className={styles.container}>
      <StatusBar
        statusText="랭킹"
        iconUrlList={iconUrlList}
        iconTypes={iconTypes}
      />
      <section>
        <Header
          headerText={headerText}
          iconUrl={iconUrl}
          imageTitle="전체 콘텐츠 랭킹"
          pageType="ranking"
          getImageSrc={getImageSrc}
        />

        {dataState === 'no_data' || dataState === 'filtered_no_data' ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>{getEmptyMessage()}</p>
          </div>
        ) : (
          <>
            <RankingMainContainer
              category={currentCategory}
              getImageSrc={getImageSrc}
              onDataStateChange={(dataExists, loading) => {
                console.log('RankingMainContainer data state change:', { dataExists, loading });
                handleDataStateChange(dataExists, loading, currentCategory);
              }}
            />
            <RankingTabContents
              getImageSrc={getImageSrc}
              onCategoryChange={handleFilterApplied}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default RankingPage;
