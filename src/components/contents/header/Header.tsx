import styles from './Header.module.css';

/* Header type */
type HeaderProps = {
  headerText: string;
  iconUrl: string;
};

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
