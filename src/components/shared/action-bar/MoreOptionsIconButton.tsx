'use client';

import { MoreOptionsIconButtonProps } from '@/_types/contents/contents';

import styles from './IconButton.module.css';

const MoreOptionsIconButton: React.FC<MoreOptionsIconButtonProps> = ({
  onClick,
}) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <img
        src={`${
          process.env.NODE_ENV === 'production' ? '/OnDe-FE' : ''
        }/assets/images/icons/more-options.svg`}
        alt="정보"
      />
    </button>
  );
};

export default MoreOptionsIconButton;
