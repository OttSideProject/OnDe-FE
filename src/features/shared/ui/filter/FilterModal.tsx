'use client';

import { useEffect } from 'react';
import { FilterAccordion } from '@/features/shared/ui/filter';
import { Button } from '@/features/shared/ui/button-group';
import { useFilterStore } from '@/entities/contents/filter';
import type { FilterGroup } from '@/_types/contents';
import styles from './FilterModal.module.css';
import FilterChips from './FilterChips';

const FilterModal = () => {
  const {
    isOpen,
    filterGroups,
    selectedChips,
    selectedFilters,
    setSelectedFilters,
    closeFilterModal,
  } = useFilterStore();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeFilterModal();
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeFilterModal]);

  if (!isOpen) return null;

  const handleFilterChange = (groupId: string, items: string[]) => {
    setSelectedFilters(groupId, items);
  };

  const handleRemoveFilter = (groupId: string, itemId: string) => {
    const updatedItems = selectedFilters[groupId].filter((id) => id !== itemId);
    setSelectedFilters(groupId, updatedItems);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            type="button"
            onClick={closeFilterModal}
            className={styles.closeButton}
          >
            <img src="/assets/images/icons/close-x.svg" alt="close" />
          </button>
          <h2>콘텐츠 필터</h2>
        </div>

        <FilterChips
          selectedFilters={selectedChips}
          groups={filterGroups}
          onRemove={handleRemoveFilter}
        />

        <div className={styles.filterContent}>
          <FilterAccordion
            groups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button variant="primary" onClick={closeFilterModal}>
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
