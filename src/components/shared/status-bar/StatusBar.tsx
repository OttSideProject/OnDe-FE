'use client';

import { useEffect, useState } from 'react';
import { useScrollEffect } from '@/utils/handleScroll';
import styles from './StatusBar.module.css';

type StatusBarProps = {
  statusText?: string;
  logoUrl?: string;
  iconUrlList?: string[];
  pageType?: 'contentMain' | 'ranking' | 'recommended' | '';
};

const StatusBar: React.FC<StatusBarProps> = ({
  logoUrl,
  statusText = '',
  iconUrlList,
  pageType = '',
}) => {
  const [hasGradient, setHasGradient] = useState(pageType === 'recommended');

  useEffect(() => {
    if (pageType === 'recommended') {
      return useScrollEffect(100, setHasGradient);
    }
  }, [pageType]);

  const handleAlert = () => {
    alert('준비 중입니다.');
  };

  return (
    <header
      className={`${styles.container} ${
        hasGradient ? styles.gradientBackground : ''
      }`}
    >
      <h2>
        {logoUrl && <img src={logoUrl} alt="로고" />}
        {statusText && statusText}
      </h2>
      <div>
        {iconUrlList &&
          iconUrlList.map((iconUrl, index) => (
            <button onClick={handleAlert} key={index}>
              <img src={iconUrl} alt={`아이콘${index + 1}`} />
            </button>
          ))}
      </div>
    </header>
  );
};

export default StatusBar;
