'use client';

import styles from './IconButton.module.css';

type MoreOptionsIconButtonProps = {
  onClick: () => void;
};

const MoreOptionsIconButton: React.FC<MoreOptionsIconButtonProps> = ({
  onClick,
}) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <img src="/assets/images/icons/more-options.svg" alt="정보" />
    </button>
  );
};

export default MoreOptionsIconButton;
