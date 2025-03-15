'use client';

import { useState } from 'react';
/* Components */
import { StatusBar } from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
import {
  RankingMainContainer,
  RankingTabContents,
} from '@/features/contents/ui/ranking';

/* Types */
import { Slide } from '@/_types/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '전체 콘텐츠 랭킹';

const iconUrl = '/assets/images/icons/crown.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

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

const handleOTTClick = async (ott: string) => {
  const [activeOTT, setActiveOTT] = useState<string | null>(null);

  if (activeOTT == ott) {
    // 이미 활성화된 버튼 클릭 시 비활성화
    setActiveOTT(null);
    return;
  }

  setActiveOTT(ott); // 활성화된 버튼으로 설정

  // API 호출 (활성화 시)
  try {
    const response = await fetch(`/api/data?ott=${ott}`);
    const data = await response.json();
    // API 호출 성공 시 데이터 출력
    console.log(`${ott} 데이터 로드 성공:`, data);
  } catch (error) {
    console.error(`${ott} 데이터 로드 실패:`, error);
  }
};

const RankingPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  return (
    <main className={styles.container}>
      <StatusBar statusText="랭킹" iconUrlList={iconUrlList} />
      <section>
        <Header
          headerText={headerText}
          iconUrl={iconUrl}
          imageTitle="전체 콘텐츠 랭킹"
          pageType="ranking"
          getImageSrc={getImageSrc}
        />
        <RankingMainContainer getImageSrc={getImageSrc} />
        <RankingTabContents getImageSrc={getImageSrc} />
      </section>
    </main>
  );
};

export default RankingPage;
