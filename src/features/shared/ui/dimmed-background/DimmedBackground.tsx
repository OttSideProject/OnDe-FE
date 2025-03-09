import styles from './DimmedBackground.module.css';

/* DimmedBackground type */
type DimmedBackgroundProps = {
  onClick: () => void;
};

export const DimmedBackground: React.FC<DimmedBackgroundProps> = ({
  onClick,
}) => {
  return <div className={styles.container} onClick={onClick} />;
};

export default DimmedBackground;
