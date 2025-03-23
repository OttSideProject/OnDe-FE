'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/entities/contents/filter';
import { fetchRankingByCategory } from '@/entities/contents/ranking/api/fetchRankingByCategory';
import { FilterAccordion, FilterChips } from '@/shared/ui/filter';
import { Button } from '@/shared/ui/button-group';
import { useModalStore } from '@/shared/lib/stores';
import styles from './FilterModal.module.css';

const FilterModal = () => {
  const router = useRouter();
  const { activeModal, closeModal } = useModalStore();
  const { filterGroups, selectedFilters } = useFilterStore();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeModal]);

  if (activeModal !== 'filter') return null;

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
          <Button
            variant="primary"
            onClick={async () => {
              try {
                // 장르 필터 찾기
                console.log('filterGroups:', filterGroups);
                const genreGroup = filterGroups.find(
                  (group) => group.label === '장르',
                );
                console.log('genreGroup:', genreGroup);
                if (!genreGroup) return;

                // 선택된 장르 가져오기
                console.log('selectedFilters:', selectedFilters);
                const selectedGenres = selectedFilters[genreGroup.id] || [];
                console.log('selectedGenres:', selectedGenres);
                if (selectedGenres.length === 0) return;

                // 첫 번째 선택된 장르의 라벨 가져오기
                console.log('genreGroup.items:', genreGroup.items);
                const selectedGenre = genreGroup.items.find(
                  (item) => item.id === selectedGenres[0],
                );
                console.log('selectedGenre:', selectedGenre);
                if (!selectedGenre) return;

                // API 호출
                console.log('API 호출 파라미터:', {
                  category: selectedGenre.label,
                  nowPage: 0,
                  pageCount: 20,
                });
                await fetchRankingByCategory({
                  category: selectedGenre.label,
                  nowPage: 0,
                  pageCount: 20,
                });

                closeModal();
                router.refresh(); // 페이지 새로고침
              } catch (error) {
                console.error('랭킹 데이터 조회 실패:', error);
                console.error(
                  '에러 상세:',
                  error instanceof Error ? error.message : error,
                );
              }
            }}
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
