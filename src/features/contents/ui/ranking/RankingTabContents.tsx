import { useState, useEffect } from 'react';
import { Tabs } from '@/shared/ui/tabs';
import { useModalStore } from '@/shared/lib/stores';
import type { PageType } from '@/shared/types/contents';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import { RankingSubListContainer, RankingMainContainer } from '@/features/contents/ui/ranking';
import { FilterButton, FilterModal } from '@/shared/ui';
import { useRankingStore } from '@/entities/contents/stores/ranking';
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
  
  // 랭킹 스토어에서 현재 카테고리 상태 가져오기
  const { currentCategory } = useRankingStore();

  // 스토어의 currentCategory가 변경될 때 selectedOTT 상태 동기화
  useEffect(() => {
    // OTT 플랫폼 목록
    const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];
    
    // 현재 카테고리에서 OTT 플랫폼 부분 추출
    const ottPart = currentCategory
      .split(',')
      .find(part => ottPlatforms.includes(part.trim()));
    
    if (ottPart) {
      console.log('RankingTabContents: Syncing selectedOTT with store category part:', ottPart);
      setSelectedOTT(ottPart);
    } else if (!currentCategory) {
      // 카테고리가 비어있으면 selectedOTT도 초기화
      console.log('RankingTabContents: Resetting selectedOTT due to empty category');
      setSelectedOTT('');
    }
  }, [currentCategory]);

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
    console.log('RankingTabContents: OTT selected:', ott, 'Previous:', selectedOTT);
    
    // 토글 기능: 같은 OTT를 다시 선택한 경우 선택 해제
    if (selectedOTT === ott) {
      console.log('Same OTT selected, toggling off');
      setSelectedOTT('');
      setAppliedFilters('');
      
      // 이벤트 발송 (OTT 선택 해제)
      try {
        const ottSelectedEvent = new CustomEvent('ottSelected', {
          detail: { ott: '' },
          bubbles: true,
          cancelable: true
        });
        
        console.log('Dispatching ottSelected event with empty OTT');
        window.dispatchEvent(ottSelectedEvent);
        
        // 카테고리 변경 콜백 호출 (빈 문자열)
        onCategoryChange?.('');
      } catch (error) {
        console.error('Error dispatching ottSelected event:', error);
      }
      
      return;
    }
    
    // 새로운 OTT 선택 시 상태 업데이트
    setSelectedOTT(ott);
    setAppliedFilters(''); 
    
    // 이벤트 생성 및 발송
    try {
      const ottSelectedEvent = new CustomEvent('ottSelected', {
        detail: { ott },
        bubbles: true, // 이벤트 버블링 활성화
        cancelable: true // 이벤트 취소 가능
      });
      
      console.log('Dispatching ottSelected event with:', ott);
      const dispatched = window.dispatchEvent(ottSelectedEvent);
      console.log('Event dispatched successfully:', dispatched);
      
      // 카테고리 변경 콜백 호출
      onCategoryChange?.(ott);
    } catch (error) {
      console.error('Error dispatching ottSelected event:', error);
    }
  };

  const handleMainDataStateChange = (hasData: boolean) => {
    console.log('Main container data state changed:', { hasData });
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
              onDataStateChange={(hasData) => handleMainDataStateChange(hasData)}
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
