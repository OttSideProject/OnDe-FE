'use client';

import { useEffect, useState } from 'react';
import { useScrollEffect } from '@/features/shared/utils/handleScroll';
import { useModalStore } from '@/entities/modal/stores';
import { SearchModal } from '@/features/shared/ui/search';
import styles from './StatusBar.module.css';

type StatusBarProps = {
  statusText?: string;
  logoUrl?: string;
  iconUrlList?: string[];
  iconTypes?: string[];
  pageType?: 'contentMain' | 'ranking' | 'recommended' | '';
  onIconClick?: (index: number) => void;
};

const ICON_TYPES = {
  SEARCH: 'search',
  MENU: 'menu',
} as const;

const StatusBar: React.FC<StatusBarProps> = ({
  logoUrl,
  statusText = '',
  iconUrlList,
  iconTypes = [],
  pageType = '',
  onIconClick,
}) => {
  const [hasGradient, setHasGradient] = useState(pageType === 'recommended');
  const { activeModal, openModal, closeModal } = useModalStore();

  useEffect(() => {
    if (pageType === 'recommended') {
      return useScrollEffect(100, setHasGradient);
    }
  }, [pageType]);

  const handleAlert = (index: number) => {
    const currentIconType = iconTypes[index];

    if (currentIconType === ICON_TYPES.SEARCH) {
      openModal('search');
      return;
    }

    if (onIconClick) {
      onIconClick(index);
    } else {
      alert('준비 중입니다.');
    }
  };

  return (
    <>
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
              <button onClick={() => handleAlert(index)} key={index}>
                <img src={iconUrl} alt={`아이콘${index + 1}`} />
              </button>
            ))}
        </div>
      </header>
      <SearchModal />
    </>
  );
};

export default StatusBar;
