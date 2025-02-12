import styles from './Header.module.css';
import imageMapping from '@/utils/imageMapping'; // import the mapping

/* Header type */
type HeaderProps = {
  headerText: string;
  iconUrl?: string; // iconUrl을 optional로 변경
  imageTitle?: string; // imageTitle prop 추가
  pageType?: 'contentMain' | 'ranking' | 'recommended' | ''; // 페이지 종류 추가, 빈값 추가
};

const Header: React.FC<HeaderProps> = ({ headerText, iconUrl, imageTitle, pageType = '' }) => {
  const imageTextUrl = imageTitle && pageType ? imageMapping[pageType]?.[imageTitle] : ''; // get the image URL from the mapping

  console.log('Header imageTitle:', imageTitle);
  console.log('Header pageType:', pageType);
  console.log('Header imageTextUrl:', imageTextUrl);
  console.log('Header iconUrl:', iconUrl);
  console.log('Header headerText:', headerText);

  return (
    <header className={styles.container}>
      <h2>
        {imageTextUrl ? <img src={imageTextUrl} alt={headerText} /> : headerText}
        {iconUrl && <img src={iconUrl} alt="icon" />}
      </h2>
    </header>
  );
};

export default Header;
