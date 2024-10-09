'use client';

import { useRouter } from 'next/navigation';
import { GoBackProps } from '@/_types/contents/contents';

import styles from './GoBack.module.css';

const GoBack: React.FC<GoBackProps> = ({ isOpen, isClose = false }) => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log('GoBack');
    router.back();
  };
  return (
    <div className={`${styles.container} ${isOpen ? styles.show : ''}`}>
      <div className={styles.btnContainer}>
        <div className={styles.btnInner}>
          <button
            type="button"
            className={`${styles.goBackBtn} `}
            onClick={handleGoBack}
          >
            <img
              src="/assets/images/icons/close-circle.svg"
              alt="close-circle"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoBack;
