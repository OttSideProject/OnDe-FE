'use client';

import { useEffect } from 'react';
import { FilterAccordion, FilterChips } from '@/features/shared/ui/filter';
import { useFilterStore } from '@/entities/contents/filter';
import { Button } from '@/features/shared/ui/button-group';
import styles from './FilterModal.module.css';

const FilterModal = () => {
  const {
    isOpen,
    filterGroups,
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

        <FilterChips groups={filterGroups} />

        <div className={styles.filterContent}>
          <FilterAccordion groups={filterGroups} />
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
