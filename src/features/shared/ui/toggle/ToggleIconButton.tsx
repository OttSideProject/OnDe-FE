'use client';

import useToggleActionStore from '@/entities/contents/main/stores/useToggleActionStore';

import styles from './ToggleIconButton.module.css';

const ToggleIconButton: React.FC<{}> = () => {
  const { isActive, toggleClick } = useToggleActionStore();
  return (
    <button
      className={`${styles.iconButton} ${isActive ? styles.active : ''}`}
      onClick={toggleClick}
    >
      <img src="/assets/images/icons/like-icon.svg" alt="icon" />
    </button>
  );
};

export default ToggleIconButton;
