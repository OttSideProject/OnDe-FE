import { imageMapping } from '@/shared/utils'; // import the mapping
import styles from './Header.module.css';

/* Header type */
type HeaderProps = {
  headerText?: string;
  iconUrl?: string; // iconUrl을 optional로 변경
  imageTitle?: string; // imageTitle prop 추가
  userName?: string;
  pageType?: 'contentMain' | 'ranking' | 'recommended' | 'type' | ''; // 페이지 종류 추가, 빈값 추가
  getImageSrc?: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended' | 'type' | '',
  ) => string;
};

const Header: React.FC<HeaderProps> = ({
  headerText,
  iconUrl,
  imageTitle,
  userName = '',
  pageType = '',
  getImageSrc,
}) => {
  // getImageSrc가 있으면 사용하고, 없으면 기존 방식으로 이미지 URL을 가져옵니다.
  const imageTextUrl =
    imageTitle && pageType
      ? getImageSrc
        ? getImageSrc(
            imageTitle,
            pageType as 'contentMain' | 'ranking' | 'recommended' | 'type' | '',
          )
        : imageMapping[pageType]?.[imageTitle]
      : '';

  return (
    <header className={styles.container}>
      <h2>
        {userName && <span className={styles.userName}>{userName}</span>}
        {imageTextUrl ? (
          <img src={imageTextUrl} alt={headerText} />
        ) : (
          headerText
        )}
        {iconUrl && <img src={iconUrl} alt="icon" />}
      </h2>
    </header>
  );
};

export default Header;
