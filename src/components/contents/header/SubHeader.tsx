import Link from 'next/link';
import styles from './SubHeader.module.css';
import SVGTitle from '@/components/contents/SVGTitle'; // 새로운 SVG 컴포넌트 import

/* SubHeader type */
type SubHeaderProps = {
  title?: string; // title prop is optional with default value
  imageTitle: string; // imageTitle prop 추가
  userName?: string; // userName prop 추가
  linkText?: string;
  linkUrl?: string;
  pageType: 'contentMain' | 'ranking' | 'recommended'; // 페이지 종류 추가
};

const SubHeader: React.FC<SubHeaderProps> = ({
  title = '', // default value for title
  imageTitle, // imageTitle prop 추가
  userName = '', // default value for userName
  linkUrl,
  linkText = '더보기',
  pageType,
}) => {
  return (
    <header className={styles.container}>
      <h3>
        {userName ? (
          <>
            <span>{userName}</span> <SVGTitle pageType={pageType} imageTitle={imageTitle} />
          </>
        ) : (
          <SVGTitle pageType={pageType} imageTitle={imageTitle} />
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
