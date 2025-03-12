'use client';

import { useEffect } from 'react';
import { FilterAccordion } from '@/features/shared/ui/filter';
import { useFilterStore } from '@/entities/contents/filter';
import type { FilterGroup } from '@/_types/contents';
import styles from './FilterModal.module.css';

const FilterModal = () => {
  const {
    isOpen,
    filterGroups,
    selectedFilters,
    setSelectedFilters,
    closeFilterModal,
  } = useFilterStore();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFilterModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeFilterModal]);

  if (!isOpen) {
    return null;
  }

  const handleFilterChange = (groupId: string, items: string[]) => {
    setSelectedFilters(groupId, items);
  };

  const handleApplyFilters = () => {
    closeFilterModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button onClick={closeFilterModal} className={styles.closeButton}>
            <img src="/assets/images/icons/close-x.svg" alt="close" />
          </button>
          <h2>콘텐츠 필터</h2>
        </div>
        <FilterAccordion
          groups={filterGroups as FilterGroup[]}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
        />
      </div>
    </div>
  );
};

export default FilterModal;
