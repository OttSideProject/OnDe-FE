import Link from 'next/link';
import styles from './SubHeader.module.css';

/* SubHeader type */
type SubHeaderProps = {
  title: string;
  linkText?: string;
  linkUrl?: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  linkUrl,
  linkText = '더보기',
}) => {
  return (
    <header className={styles.container}>
      <h3>{title}</h3>
      {linkUrl && (
        <Link href={linkUrl} className={styles.link}>
          <span>{linkText}</span> <span className="view-more" />
        </Link>
      )}
    </header>
  );
};

export default SubHeader;
