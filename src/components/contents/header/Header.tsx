import { HeaderProps } from '@/_types/contents/contents';

import styles from './Header.module.css';

const Header: React.FC<HeaderProps> = ({ headerText, iconUrl }) => {
  return (
    <header className={styles.container}>
      <h2>
        {headerText} {iconUrl && <img src={iconUrl} alt={headerText} />}
      </h2>
    </header>
  );
};

export default Header;
