import React, { useCallback, useMemo } from 'react';
import styles from './DropDown.module.css';

//피그마에 없이 임의로 만듦
interface DropDownProps {
  DropDownMenu: { [key: string]: number };
  handleSortBoardText: (text: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  DropDownMenu,
  handleSortBoardText,
}) => {
  //드롭다운 메뉴
  const DropDownMenuText = useMemo(() => {
    return Object.keys(DropDownMenu).map((menu, idx) => {
      return (
        <div
          key={idx}
          onClick={() => {
            handleSortBoardText(menu);
          }}
        >
          {menu}
        </div>
      );
    });
  }, []);
  return (
    <div className={styles.dropDownContainer}>
      <div>{DropDownMenuText}</div>
    </div>
  );
};

export default DropDown;
