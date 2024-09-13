import Link from 'next/link';

import type { SubHeaderProps } from '@/_types/contents/contents';

import styles from './SubHeader.module.css';

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  linkUrl,
  linkText = '더보기',
}) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/OnDe-FE' : '';

  const backgroundImageUrl = `${basePath}/assets/images/icons/view-more.svg`;
  return (
    <header className={styles.container}>
      <h3>{title}</h3>
      <Link href={linkUrl} className={styles.link}>
        <span>{linkText}</span>{' '}
        {linkUrl && (
          <span
            className="view-more"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        )}
      </Link>
    </header>
  );
};

export default SubHeader;
