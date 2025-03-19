import { useState } from 'react';
import { Tabs } from '@/features/shared/ui/tabs';
import { useModalStore } from '@/entities/modal/stores';
import type { PageType } from '@/_types/contents';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import { RankingSubListContainer } from '@/features/contents/ui/ranking';
import { FilterButton, FilterModal } from '@/features/shared/ui';
import styles from './RankingTabContents.module.css';

type RankingTabContentsProps = {
  getImageSrc: (title: string, pageType: PageType) => string;
};

const RankingTabContents = ({ getImageSrc }: RankingTabContentsProps) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedOTT, setSelectedOTT] = useState<string>('');
  const { openModal } = useModalStore();

  const categories = [
    { label: '월간', key: 'monthly' },
    { label: '주간', key: 'weekly' },
  ];

  const renderContent = (selectedCategory: string) => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <OTTSelector activeOTT={selectedOTT} onSelectOTT={setSelectedOTT} />
          <FilterButton onClick={() => openModal('filter')} />
        </div>
        <RankingSubListContainer
          category={selectedOTT}
          getImageSrc={getImageSrc}
        />
        <FilterModal />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Tabs
        categories={categories}
        fontSize={'1.6rem'}
        renderContent={(key) => renderContent(key)}
        onTabChange={(key) => setActiveTab(key as 'monthly' | 'weekly')}
      />
    </div>
  );
};

export default RankingTabContents;
