import Link from 'next/link';
import styles from './SubHeader.module.css';
import imageMapping from '@/utils/imageMapping'; // import the mapping

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
  const imageTextUrl = imageMapping[pageType]?.[imageTitle] || ''; // get the image URL from the mapping
  console.log('SubHeader title:', title);
  console.log('SubHeader imageTitle:', imageTitle);
  console.log('SubHeader userName:', userName);
  console.log('SubHeader pageType:', pageType);
  console.log('SubHeader imageTextUrl:', imageTextUrl);

  return (
    <header className={styles.container}>
      <h3 aria-label={imageTextUrl}>
        {imageTextUrl ? (
          userName ? (
            <>
              <span>{userName}</span> <img src={imageTextUrl} alt={title} />
            </>
          ) : (
            <img src={imageTextUrl} alt={title} className={styles.image} />
          )
        ) : (
          title
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
