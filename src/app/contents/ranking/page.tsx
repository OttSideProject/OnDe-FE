'use client';

import { useState } from 'react';
import Link from 'next/link';
/* Components */
import StatusBar from '@/components/shared/status-bar/StatusBar';
import Header from '@/components/contents/header/Header';
import RankingMainContainer from '@/components/contents/RankingMainContainer';
import RankingTabContents from '@/components/contents/RankingTabContents';
import OTTSelector from '@/components/contents/OTTSelector';

/* Types */
import { Slide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';
import RankingSubListContainer from '@/components/contents/RankingSubListContainer';

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
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=1',
  },
  {
    id: 2,
    title: '에일리언',
    subTitle: ['독특한', '서스펜스', 'SF'],
    url: 'https://picsum.photos/240/360?random=2',
  },
  {
    id: 3,
    title: '귀공자',
    subTitle: ['독특한', '서스펜스', 'SF'],
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

const HomePage: React.FC = () => {
  return (
    <main className={styles.container}>
      <StatusBar statusText="랭킹" iconUrlList={iconUrlList} />
      <section>
        <Header headerText={headerText} iconUrl={iconUrl} />
        <RankingMainContainer slides={rankingTopList} />
        <RankingTabContents />
      </section>
    </main>
  );
};

export default HomePage;
