import Link from 'next/link';
import SVGTitle from '@/features/contents/ui/header/svg-title/SVGTitle';
import styles from './SubHeader.module.css';

/* SubHeader type */
type SubHeaderProps = {
  title?: string; // title prop is optional with default value
  imageTitle: string; // imageTitle prop 추가
  userName?: string; // userName prop 추가
  recommendedTitle?: string; // recommendedTitle prop 추가
  linkText?: string;
  linkUrl?: string;
  pageType: 'contentMain' | 'ranking' | 'recommended'; // 페이지 종류 추가
  isImageRequired: boolean; // prop으로 받도록 수정
};

const SubHeader: React.FC<SubHeaderProps> = ({
  title = '', // default value for title
  imageTitle, // imageTitle prop 추가
  userName = '', // default value for userName
  recommendedTitle = '', // default value for recommendedTitle
  linkUrl,
  linkText = '더보기',
  pageType,
  isImageRequired,
}) => {
  return (
    <header className={styles.container}>
      <h3>
        {userName && <span>{userName}</span>}
        {recommendedTitle && <span>{recommendedTitle}&nbsp;</span>}
        <SVGTitle
          pageType={pageType}
          imageTitle={imageTitle}
          isImageRequired={isImageRequired}
        />
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
