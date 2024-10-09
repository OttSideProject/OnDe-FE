import type { DimmedBackgroundProps } from '@/_types/contents/contents';

import styles from './DimmedBackground.module.css';

export const DimmedBackground: React.FC<DimmedBackgroundProps> = ({
  onClick,
}) => {
  return <div className={styles.container} onClick={onClick} />;
};
