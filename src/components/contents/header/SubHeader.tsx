import Link from 'next/link';
import styles from './SubHeader.module.css';

export type SubHeaderProps = {
  title: string;
  linkText: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  linkText = '더보기',
}) => {
  return (
    <header className={styles.container}>
      <h3>{title}</h3>
      <Link href="#" className={styles.link}>
        {linkText} <span className="view-more" />
      </Link>
    </header>
  );
};

export default SubHeader;
