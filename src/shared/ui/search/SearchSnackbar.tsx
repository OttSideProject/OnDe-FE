'use client';

import React from 'react';
import Image from 'next/image';
import styles from './SearchSnackbar.module.css';

type SearchSnackbarProps = {
  message: string;
  onClose?: () => void;
  autoHide?: boolean;
  duration?: number;
};

const SearchSnackbar: React.FC<SearchSnackbarProps> = ({
  message = '기분 따라 콘텐츠를 추천받아 보세요!\n원하는 분위기를 #문장으로 검색할 수 있어요.\n한 번 더 클릭하면 일반 검색으로 바뀌어요.',
  onClose,
  autoHide = true,
  duration = 5000,
}) => {
  // 디버깅: 메시지 내용 확인
  console.log('Snackbar message:', JSON.stringify(message));
  console.log('Split message:', message.split('\n'));
  React.useEffect(() => {
    if (autoHide && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose]);

  return (
    <div className={`${styles.snackbarContainer} ${styles.decorativeElements}`}>
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked!');
            onClose();
          }}
        >
          <Image
            src="/assets/images/icons/close-x-g.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className={styles.snackbarContent}>
        <div className={styles.snackbarBody}>
          {message.split('\n').map((line, index) => (
            <span key={index} className={styles.messageLine}>
              {line.includes('#문장으로 검색') ? (
                <>
                  {line.split('#문장으로 검색')[0]}
                  <span className={styles.gradientText}>#문장으로 검색</span>
                  {line.split('#문장으로 검색')[1]}
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </div>

        <div className={styles.progressBar} />

        <div className={styles.screenLayer} />
      </div>
    </div>
  );
};

export default SearchSnackbar;
