import { useState } from 'react';
import { Tabs } from '@/features/shared/ui/tabs';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import { RankingSubListContainer } from '@/features/contents/ui/ranking';
import { FilterButton, FilterModal } from '@/features/shared/ui';
import { useFilterStore } from '@/entities/contents/filter';
import styles from './RankingTabContents.module.css';

type PageType = 'contentMain' | 'ranking' | 'recommended';

type RankingTabContentsProps = {
  getImageSrc: (title: string, pageType: PageType) => string;
};

const RankingTabContents = ({ getImageSrc }: RankingTabContentsProps) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedOTT, setSelectedOTT] = useState<string>('');
  const { openFilterModal } = useFilterStore();

  const categories = [
    { label: '월간', key: 'monthly' },
    { label: '주간', key: 'weekly' },
  ];

  const renderContent = (selectedCategory: string) => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <OTTSelector activeOTT={selectedOTT} onSelectOTT={setSelectedOTT} />
          <FilterButton onClick={openFilterModal} />
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
        renderContent={renderContent}
        onTabChange={(key) => setActiveTab(key as 'monthly' | 'weekly')}
      />
    </div>
  );
};

export default RankingTabContents;
