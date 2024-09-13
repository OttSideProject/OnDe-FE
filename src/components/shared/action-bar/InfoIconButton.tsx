'use client';

import { InfoIconButtonProps } from '@/_types/contents/contents';

import styles from './IconButton.module.css';

const InfoIconButton: React.FC<InfoIconButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <img
        src={`${
          process.env.NODE_ENV === 'production' ? '/OnDe-FE' : ''
        }/assets/images/icons/info.svg`}
        alt="icon"
      />
    </button>
  );
};

export default InfoIconButton;
