'use client';
import { useState } from 'react';
import { Tabs } from '@/features/shared/ui/tabs';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import { RankingSubListContainer } from '@/features/contents/ui/ranking';
import styles from './RankingTabContents.module.css';
type RankingTabContentsProps = {
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const RankingTabContents = ({ getImageSrc }: RankingTabContentsProps) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedOTT, setSelectedOTT] = useState<string>('netflix');

  const categories = [
    { label: '월간', key: 'monthly' },
    {
      label: '주간',
      key: 'weekly',
    },
  ];

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'monthly':
        return (
          <>
            <OTTSelector activeOTT={selectedOTT} onSelectOTT={setSelectedOTT} />
            <RankingSubListContainer
              ott={selectedOTT}
              type={activeTab as 'monthly' | 'weekly'}
              getImageSrc={getImageSrc}
            />
          </>
        );
      case 'weekly':
        return (
          <>
            <OTTSelector activeOTT={selectedOTT} onSelectOTT={setSelectedOTT} />
            <RankingSubListContainer
              ott={selectedOTT}
              type={activeTab as 'monthly' | 'weekly'}
              getImageSrc={getImageSrc}
            />
          </>
        );
      default:
        return <p>내용이 없습니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <Tabs
        categories={categories}
        fontSize={'1.6rem'}
        renderContent={renderContent}
        onTabChange={(key) => setActiveTab(key as 'monthly' | 'weekly')}
      />
    </div>
  );
};

export default RankingTabContents;
