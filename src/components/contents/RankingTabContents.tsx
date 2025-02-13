'use client';
import { useEffect, useState } from 'react';
import Tabs from '@/components/shared/tabs/Tabs';
import OTTSelector from './OTTSelector';
import RankingSubListContainer from './RankingSubListContainer';
import styles from './RankingTabContents.module.css';

const RankingTabContents = () => {
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
            />
          </>
        );
      case 'weekly':
        return (
          <div className="coming-soon">
            <img
              src="/assets/images/coming-soon-message.png"
              alt="준비중 입니다..."
            />
          </div>
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
