import { useState, useEffect } from 'react';
import { Tabs } from '@/shared/ui/tabs';
import { useModalStore } from '@/shared/lib/stores';
import type { PageType } from '@/shared/types/contents';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import { RankingSubListContainer, RankingMainContainer } from '@/features/contents/ui/ranking';
import { FilterButton, FilterModal } from '@/shared/ui';
import styles from './RankingTabContents.module.css';

type RankingTabContentsProps = {
  getImageSrc: (title: string, pageType: PageType) => string;
  onCategoryChange?: (category: string) => void; 
};

const RankingTabContents = ({ getImageSrc, onCategoryChange }: RankingTabContentsProps) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedOTT, setSelectedOTT] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<string>('');
  const [hasMainData, setHasMainData] = useState<boolean>(true); // 메인 컨테이너에 데이터가 있는지 여부
  const { openModal } = useModalStore();

  useEffect(() => {
    const handleFilterApplied = (event: CustomEvent<{ category: string }>) => {
      console.log('Filter applied event received:', event.detail);
      const { category } = event.detail;
      setAppliedFilters(category);
      
      const effectiveCategory = getEffectiveCategory(selectedOTT, category);
      onCategoryChange?.(effectiveCategory);
    };

    window.addEventListener('filterApplied', handleFilterApplied as EventListener);

    return () => {
      window.removeEventListener('filterApplied', handleFilterApplied as EventListener);
    };
  }, [selectedOTT, onCategoryChange]);

  const handleOTTSelect = (ott: string) => {
    console.log('OTT selected:', ott);
    setSelectedOTT(ott);
    setAppliedFilters(''); 
    
    const ottSelectedEvent = new CustomEvent('ottSelected', {
      detail: { ott }
    });
    window.dispatchEvent(ottSelectedEvent);
    
    onCategoryChange?.(ott);
  };

  // 메인 컨테이너의 데이터 상태 변경 처리
  const handleMainDataStateChange = (hasData: boolean) => {
    console.log('Main container data state changed:', hasData);
    setHasMainData(hasData);
  };

  const categories = [
    { label: '월간', key: 'monthly' },
    { label: '주간', key: 'weekly' },
  ];

  const getEffectiveCategory = (ott: string, filters: string) => {
    let effectiveCategory = '';
    
    if (ott && filters) {
      effectiveCategory = `${ott},${filters}`;
    } else if (ott) {
      effectiveCategory = ott;
    } else if (filters) {
      effectiveCategory = filters;
    }
    
    console.log('Effective category:', effectiveCategory);
    return effectiveCategory;
  };

  const renderContent = (selectedCategory: string) => {
    const effectiveCategory = getEffectiveCategory(selectedOTT, appliedFilters);
    
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <OTTSelector activeOTT={selectedOTT} onSelectOTT={handleOTTSelect} />
          <FilterButton onClick={() => openModal('filter')} />
        </div>
        {/* RankingMainContainer 추가 (데이터 상태 콜백 포함) */}
        <div className={styles.mainContainer}>
          {/* RankingMainContainer 컴포넌트는 이미 페이지에서 렌더링되고 있으므로 여기서는 숨겨진 상태로 추가 */}
          <div style={{ display: 'none' }}>
            {/* 이 컴포넌트는 데이터 상태를 전달하기 위한 용도로만 사용됨 */}
            <RankingMainContainer
              category={effectiveCategory}
              getImageSrc={getImageSrc}
              onDataStateChange={handleMainDataStateChange}
            />
          </div>
        </div>
        {/* 메인 컨테이너에 데이터가 있을 때만 서브 리스트 컨테이너 표시 */}
        {hasMainData && (
          <RankingSubListContainer
            category={effectiveCategory}
            getImageSrc={getImageSrc}
          />
        )}
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
