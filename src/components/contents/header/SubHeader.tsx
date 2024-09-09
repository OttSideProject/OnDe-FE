import Link from 'next/link';

import type { SubHeaderProps } from '@/_types/contents/contents';

import styles from './SubHeader.module.css';

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  linkUrl,
  linkText = '더보기',
}) => {
  return (
    <header className={styles.container}>
      <h3>{title}</h3>
      <Link href={linkUrl} className={styles.link}>
        {linkText} <span className="view-more" />
      </Link>
    </header>
  );
};

export default SubHeader;
