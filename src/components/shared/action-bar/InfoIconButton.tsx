'use client';

import { InfoIconButtonProps } from '@/_types/contents/contents';

import styles from './IconButton.module.css';

const InfoIconButton: React.FC<InfoIconButtonProps> = () => {
  return (
    <button className={styles.iconButton} >
      <img src="/assets/images/icons/info.svg" alt="정보" />
    </button>
  );
};

export default InfoIconButton;
