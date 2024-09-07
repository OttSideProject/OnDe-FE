'use client';

/* Components */
import InfoIconButton from './InfoIconButton';
import MoreOptionsIconButton from './MoreOptionsIconButton';
/* Zustand store */
import useDropDownStore from '@/stores/useDropDownStore';
/* Styles */
import styles from './ActionBar.module.css';

const ActionBar: React.FC = () => {
  const { openDropDown } = useDropDownStore();
  const toggleClick = () => {
    // setToggle(!toggle);
  };
  return (
    <div className={styles.container}>
      <InfoIconButton onClick={toggleClick} />
      <MoreOptionsIconButton onClick={openDropDown} />
    </div>
  );
};

export default ActionBar;
