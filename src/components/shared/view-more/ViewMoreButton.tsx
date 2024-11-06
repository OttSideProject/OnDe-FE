'use client';

import { useState } from 'react';

import { ViewMoreButtonProps } from '@/_types/contents/contents';

import styles from './ViewMoreButton.module.css';

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  content,
  viewIcon,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleView = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.container}>
      <div className={isExpanded ? `expanded` : 'ellipsis lineclamp'}>
        <p className={styles.content}>{content}</p>

        {viewIcon && <img src={viewIcon} alt="view-icon" />}
      </div>
      <button
        className={`${styles.viewMoreButton} ${
          isExpanded ? styles.active : ''
        }`}
        onClick={toggleView}
      >
        {isExpanded ? (
          <>
            <span>닫기</span>
            <img src="/assets/images/icons/arrow-up.svg" alt="up-arrow" />
          </>
        ) : (
          <>
            <span>더보기</span>
            <img src="/assets/images/icons/arrow-down.svg" alt="up-arrow" />
          </>
        )}
      </button>
    </div>
  );
};

export default ViewMoreButton;
