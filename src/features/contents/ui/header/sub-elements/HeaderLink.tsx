import Link from 'next/link';
import styles from '../SubHeader.module.css';

type LinkProps = {
  url?: string;
  text?: string;
};

const HeaderLink: React.FC<LinkProps> = ({ url, text = '더보기' }) => {
  if (!url) return null;

  return (
    <Link href={url} className={styles.link}>
      <span>{text}</span> <span className="view-more" />
    </Link>
  );
};

export default HeaderLink;
