import Link from 'next/link';
import { SVGTitle } from '@/features/contents/ui/header/sub-elements';
import styles from './SubHeader.module.css';

/* SubHeader type */
type SubHeaderProps = {
  title?: string;
  imageTitle?: string;
  imagePath?: string;
  userName?: string;
  recommendedTitle?: string;
  linkText?: string;
  linkUrl?: string;
  isImageRequired?: boolean;
};

const SubHeader: React.FC<SubHeaderProps> = ({
  title = '',
  imageTitle = '',
  userName = '',
  recommendedTitle = '',
  linkUrl,
  linkText = '더보기',
  imagePath,
  isImageRequired = false,
}) => {
  return (
    <header className={styles.container}>
      <h3>
        {userName && <span>{userName}</span>}
        {recommendedTitle && <span>{recommendedTitle}&nbsp;</span>}
        {title && <span>{title}&nbsp;</span>}
        {imageTitle && (
          <SVGTitle
            imagePath={imagePath}
            imageTitle={imageTitle}
            isImageRequired={isImageRequired}
          />
        )}
      </h3>
      {linkUrl && (
        <Link href={linkUrl} className={styles.link}>
          <span>{linkText}</span> <span className="view-more" />
        </Link>
      )}
    </header>
  );
};

export default SubHeader;
