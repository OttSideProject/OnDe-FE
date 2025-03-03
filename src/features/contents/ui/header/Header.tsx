import { imageMapping } from '@/features/shared/utils'; // import the mapping
import styles from './Header.module.css';

/* Header type */
type HeaderProps = {
  headerText?: string;
  iconUrl?: string; // iconUrl을 optional로 변경
  imageTitle?: string; // imageTitle prop 추가
  userName?: string;
  pageType?: 'contentMain' | 'ranking' | 'recommended' | ''; // 페이지 종류 추가, 빈값 추가
};

const Header: React.FC<HeaderProps> = ({
  headerText,
  iconUrl,
  imageTitle,
  userName = '',
  pageType = '',
}) => {
  const imageTextUrl =
    imageTitle && pageType ? imageMapping[pageType]?.[imageTitle] : ''; // get the image URL from the mapping

  return (
    <header className={styles.container}>
      <h2>
        {userName && <span className={styles.userName}>{userName}님, </span>}
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
