'use client';

/* Components */
import InfoIconButton from './InfoIconButton';
import MoreOptionsIconButton from './MoreOptionsIconButton';
/* Zustand store */
import { useDropDownStore } from '@/entities/contents/main';
/* Styles */
import styles from './ActionBar.module.css';

const ActionBar: React.FC = () => {
  const { openDropDown } = useDropDownStore();
  const handleActionBar = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); /* 이벤트 버블링 방지 */
    e.preventDefault(); // 최상단 링크 이동기본 동작 중지 
  };

  const toggleClick = () => {
    // setToggle(!toggle);
  };
  return (
    <div className={styles.container} onClick={handleActionBar}>
      <InfoIconButton onClick={toggleClick} />
      <MoreOptionsIconButton onClick={openDropDown} />
    </div>
    
  );
};

export default ActionBar;
