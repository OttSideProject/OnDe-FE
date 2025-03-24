'use client';

import { useState, useEffect } from 'react';
/* Components */
import { StatusBar } from '@/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
/* Types */
import { Slide } from '@/shared/types/contents';

import {
  RankingMainContainer,
  RankingTabContents,
} from '@/features/contents/ui/ranking';

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
  const [currentCategory, setCurrentCategory] = useState<string>('');

  // 필터 적용 이벤트 리스너 등록
  useEffect(() => {
    const handleFilterApplied = (event: CustomEvent<{ category: string }>) => {
      console.log('Page: Filter applied event received:', event.detail);
      const { category } = event.detail;
      setCurrentCategory(category);
    };

    // 이벤트 리스너 등록
    window.addEventListener(
      'filterApplied',
      handleFilterApplied as EventListener,
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener(
        'filterApplied',
        handleFilterApplied as EventListener,
      );
    };
  }, []);

  // OTT 선택 이벤트 리스너 등록
  useEffect(() => {
    const handleOTTSelected = (event: CustomEvent<{ ott: string }>) => {
      console.log('Page: OTT selected event received:', event.detail);
      const { ott } = event.detail;

      // OTT 선택 시 필터 초기화하고 OTT만 적용
      setCurrentCategory(ott || '');
    };

    // 이벤트 리스너 등록
    window.addEventListener('ottSelected', handleOTTSelected as EventListener);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener(
        'ottSelected',
        handleOTTSelected as EventListener,
      );
    };
  }, []);

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
        <RankingMainContainer
          category={currentCategory}
          getImageSrc={getImageSrc}
        />
        <RankingTabContents
          getImageSrc={getImageSrc}
          onCategoryChange={setCurrentCategory}
        />
      </section>
    </main>
  );
};

export default RankingPage;
