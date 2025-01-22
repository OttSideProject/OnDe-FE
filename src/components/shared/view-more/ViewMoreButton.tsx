'use client';

import { useState } from 'react';
import styles from './ViewMoreButton.module.css';

/* ViemMoreButton toggle type*/
type ViewMoreButtonProps = {
  content: string;
  viewIcon?: string;
};

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
            <img
              src="/assets/images/icons/arrow-up.svg"
              alt="up-arrow"
              aria-label="닫기"
            />
          </>
        ) : (
          <>
            <img
              src="/assets/images/icons/arrow-down.svg"
              alt="up-arrow"
              aria-label="더보기"
            />
          </>
        )}
      </button>
    </div>
  );
};

export default ViewMoreButton;
