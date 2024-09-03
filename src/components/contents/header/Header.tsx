import styles from './Header.module.css';

export type HeaderProps = {
	headerText: string;
};


const Header: React.FC<HeaderProps> = ({ headerText }) => {
  return (
    <header className={styles.container}>
      <h2>{headerText}</h2>
    </header>
  );
};

export default Header;