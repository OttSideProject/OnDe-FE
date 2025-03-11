'use client';

import Image from 'next/image';
import styles from './FilterButton.module.css';

type FilterButtonProps = {
  onClick: () => void;
  className?: string;
};

const FilterButton = ({ onClick, className = '' }: FilterButtonProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.btnContainer}>
        <div className={styles.btnInner}>
          <button type="button" onClick={onClick}>
            <Image
              src="/assets/images/icons/filter-icon.svg"
              alt="필터"
              width={12.8}
              height={12}
            />
            <span className={styles.text}>콘텐츠 필터</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
