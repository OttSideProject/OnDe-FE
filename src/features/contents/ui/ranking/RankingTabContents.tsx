import { useState, useEffect } from 'react';
import { Tabs } from '@/shared/ui/tabs';
import { useModalStore } from '@/shared/lib/stores';
import type { PageType } from '@/shared/types/contents';
import { OTTSelector } from '@/features/contents/ui/ott-selector';
import {
  RankingSubListContainer,
  RankingSubMainContainer,
} from '@/features/contents/ui/ranking';
import { FilterButton, FilterModal } from '@/shared/ui';
import { useRankingStore } from '@/entities/contents/stores/ranking';
import styles from './RankingTabContents.module.css';

type RankingTabContentsProps = {
  getImageSrc: (title: string, pageType: PageType) => string;
  onCategoryChange?: (category: string) => void;
};

const RankingTabContents = ({
  getImageSrc,
  onCategoryChange,
}: RankingTabContentsProps) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedOTTs, setSelectedOTTs] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string>('');
  const [hasMainData, setHasMainData] = useState<boolean>(true); // 메인 컨테이너에 데이터가 있는지 여부
  const { openModal } = useModalStore();

  // 랭킹 스토어에서 현재 카테고리 상태 가져오기
  const { currentCategory } = useRankingStore();

  // 스토어의 currentCategory가 변경될 때 selectedOTTs 상태 동기화
  useEffect(() => {
    // OTT 플랫폼 목록
    const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];

    // 현재 카테고리에서 OTT 플랫폼 부분 추출
    const ottParts = currentCategory
      .split(',')
      .filter((part) => ottPlatforms.includes(part.trim()));

    if (ottParts.length > 0) {
      console.log(
        'RankingTabContents: Syncing selectedOTTs with store category parts:',
        ottParts,
      );
      setSelectedOTTs(ottParts);
    } else if (!currentCategory) {
      // 카테고리가 비어있으면 selectedOTTs도 초기화
      console.log(
        'RankingTabContents: Resetting selectedOTTs due to empty category',
      );
      setSelectedOTTs([]);
    }
  }, [currentCategory]);

  useEffect(() => {
    const handleFilterApplied = (event: CustomEvent<{ category: string }>) => {
      console.log('Filter applied event received:', event.detail);
      const { category } = event.detail;
      setAppliedFilters(category);

      const effectiveCategory = getEffectiveCategory(selectedOTTs, category);
      onCategoryChange?.(effectiveCategory);
    };

    window.addEventListener(
      'filterApplied',
      handleFilterApplied as EventListener,
    );

    return () => {
      window.removeEventListener(
        'filterApplied',
        handleFilterApplied as EventListener,
      );
    };
  }, [selectedOTTs, onCategoryChange]);

  // OTT 선택 시 호출되는 함수
  const handleOTTSelect = (ott: string) => {
    console.log(
      'RankingTabContents: OTT selected:',
      ott,
      'Previous:',
      selectedOTTs,
    );

    // 토글 기능: OTT가 이미 선택되어 있으면 제거, 아니면 추가
    let newSelectedOTTs: string[];

    if (selectedOTTs.includes(ott)) {
      // 이미 선택된 OTT인 경우 제거
      console.log('OTT already selected, removing:', ott);
      newSelectedOTTs = selectedOTTs.filter(
        (selectedOtt) => selectedOtt !== ott,
      );
    } else {
      // 선택되지 않은 OTT인 경우 추가
      console.log('OTT not selected, adding:', ott);
      newSelectedOTTs = [...selectedOTTs, ott];
    }

    // 중복 제거 (filter 메서드 사용)
    newSelectedOTTs = newSelectedOTTs.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    // 상태 업데이트
    setSelectedOTTs(newSelectedOTTs);

    // 이벤트 생성 및 발송
    try {
      // 이벤트 파라미터에서도 중복 제거 (안전장치)
      const uniqueOtts = newSelectedOTTs.filter(
        (value, index, self) => self.indexOf(value) === index,
      );

      const ottSelectedEvent = new CustomEvent('ottSelected', {
        detail: { otts: uniqueOtts },
        bubbles: true,
        cancelable: true,
      });

      console.log('Dispatching ottSelected event with:', uniqueOtts);
      window.dispatchEvent(ottSelectedEvent);

      // 카테고리 변경 콜백 호출
      const effectiveCategory = getEffectiveCategory(
        uniqueOtts,
        appliedFilters,
      );
      onCategoryChange?.(effectiveCategory);
    } catch (error) {
      console.error('Error dispatching ottSelected event:', error);
    }
  };

  const handleMainDataStateChange = (hasData: boolean) => {
    console.log('Main container data state changed:', { hasData });
    setHasMainData(hasData);
  };

  // 효과적인 카테고리 문자열 생성 (OTT + 필터)
  const getEffectiveCategory = (otts: string[], filters: string): string => {
    let category = '';

    // OTT가 선택되어 있으면 카테고리에 추가
    if (otts.length > 0) {
      category = otts.join(',');
    }

    // 필터가 있으면 카테고리에 추가
    if (filters) {
      category = category ? `${category},${filters}` : filters;
    }

    return category;
  };

  const categories = [
    { label: '월간', key: 'monthly' },
    { label: '주간', key: 'weekly' },
  ];

  const renderContent = (selectedCategory: string) => {
    const effectiveCategory = getEffectiveCategory(
      selectedOTTs,
      appliedFilters,
    );

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <OTTSelector
            activeOTTs={selectedOTTs}
            onSelectOTT={handleOTTSelect}
          />
          <FilterButton onClick={() => openModal('filter')} />
        </div>
        {/* RankingMainContainer 추가 (데이터 상태 콜백 포함) */}
        <div className={styles.mainContainer}>
          <div>
            <RankingSubMainContainer
              category={effectiveCategory}
              getImageSrc={getImageSrc}
              onDataStateChange={(hasData) =>
                handleMainDataStateChange(hasData)
              }
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
