'use client';

import styles from './IconButton.module.css';

/* IconButton type */
type InfoIconButtonProps = {
  onClick: () => void;
};

const InfoIconButton: React.FC<InfoIconButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <img src="/assets/images/icons/info.svg" alt="icon" />
    </button>
  );
};

export default InfoIconButton;
