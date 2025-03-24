'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/entities/contents/filter';
import { useInitGenres } from '@/entities/contents/hooks';
import { FilterAccordion, FilterChips } from '@/shared/ui/filter';
import { Button } from '@/shared/ui/button-group';
import { useModalStore } from '@/shared/lib/stores';
import styles from './FilterModal.module.css';

const FilterModal = () => {
  const router = useRouter();
  const { activeModal, closeModal } = useModalStore();
  const { filterGroups, selectedFilters, resetFilters } = useFilterStore();

  // 장르 목록을 API에서 가져오는 훅 사용
  useInitGenres();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeModal]);

  if (activeModal !== 'filter') return null;

  const handleApplyFilter = () => {
    try {
      // 선택된 모든 필터 항목의 라벨 수집
      const filterParams: string[] = [];

      Object.entries(selectedFilters).forEach(([groupId, itemIds]) => {
        const group = filterGroups.find((g) => g.id === groupId);
        if (!group) return;

        itemIds.forEach((itemId) => {
          const item = group.items.find((i) => i.id === itemId);
          if (item) {
            filterParams.push(item.label);
          }
        });
      });

      if (filterParams.length === 0) {
        console.log('선택된 필터가 없습니다.');
        closeModal();
        return;
      }

      // 필터 파라미터 생성
      const categoryParam = filterParams.join(',');

      console.log('필터 적용 파라미터:', categoryParam);

      // 현재 페이지에서 필터링된 결과를 보여주기 위해 이벤트 발생
      const filterAppliedEvent = new CustomEvent('filterApplied', {
        detail: { category: categoryParam },
      });
      window.dispatchEvent(filterAppliedEvent);

      // 모달 닫기 (이벤트 발생 후에 닫아야 함)
      closeModal();
    } catch (error) {
      console.error('필터 적용 중 오류 발생:', error);
    }
  };

  const handleResetFilter = () => {
    // 필터 초기화
    resetFilters();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            type="button"
            onClick={closeModal}
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
          <Button variant="primary" onClick={handleApplyFilter}>
            필터 적용하기
          </Button>
          {/* <div className={styles.resetBtnWrapper}>
            <Button
              variant="secondary"
              onClick={handleResetFilter}
            >
              필터 초기화
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
