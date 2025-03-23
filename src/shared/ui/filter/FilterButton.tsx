'use client';

import { useFilterStore } from '@/entities/contents/filter';
import { useModalStore } from '@/shared/lib/stores';
import styles from './FilterButton.module.css';

type FilterButtonProps = {
  className?: string;
  onClick?: () => void;
};

const FilterButton = ({ className = '', onClick }: FilterButtonProps) => {
  const { selectedFilters } = useFilterStore();
  const { openModal } = useModalStore();

  const totalSelectedCount = Object.values(selectedFilters).reduce(
    (sum, items) => sum + items.length,
    0,
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.btnContainer}>
        <div className={styles.btnInner}>
          <button
            type="button"
            onClick={() => {
              openModal('filter');
              onClick?.();
            }}
            className={totalSelectedCount > 0 ? styles.active : ''}
          >
            <img
              src={
                totalSelectedCount > 0
                  ? '/assets/images/icons/filter-icon-active.svg'
                  : '/assets/images/icons/filter-icon.svg'
              }
              alt="필터"
              width={12.8}
              height={12}
            />
            <span className={styles.text}>
              콘텐츠 필터
              {totalSelectedCount > 0 && (
                <span className={styles.badge}>({totalSelectedCount})</span>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
