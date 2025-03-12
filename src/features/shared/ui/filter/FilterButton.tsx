'use client';

import Image from 'next/image';
import { useFilterStore } from '@/entities/contents/filter';
import styles from './FilterButton.module.css';

type FilterButtonProps = {
  onClick: () => void;
  className?: string;
};

const FilterButton = ({ onClick, className = '' }: FilterButtonProps) => {
  const { selectedFilters } = useFilterStore();

  // 선택된 필터의 총 개수 계산
  const totalSelectedCount = Object.values(selectedFilters).reduce(
    (sum, items) => sum + items.length,
    0
  );
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.btnContainer}>
        <div className={styles.btnInner}>
          <button
            type="button"
            onClick={onClick}
            className={totalSelectedCount > 0 ? styles.active : ''}
          >
            <Image
              src={totalSelectedCount > 0
                ? '/assets/images/icons/filter-icon-active.svg'
                : '/assets/images/icons/filter-icon.svg'}
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
