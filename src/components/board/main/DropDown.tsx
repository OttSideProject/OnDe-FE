import React, { useCallback, useMemo } from 'react';
import styles from './DropDown.module.css';

interface DropDownProps {
  DropDownMenu: { [key: string]: number };
  handleSortBoardText: (text: string) => void;
  selectedSort: string; // 현재 선택된 정렬값 추가
}

const DropDown: React.FC<DropDownProps> = ({
  DropDownMenu,
  handleSortBoardText,
  selectedSort,
}) => {
  const DropDownMenuText = useMemo(() => {
    return Object.keys(DropDownMenu).map((menu, idx) => {
      const isSelected = menu === selectedSort;
      return (
        <div
          key={idx}
          onClick={() => handleSortBoardText(menu)}
          style={{
            fontWeight: isSelected ? '600' : '400',
            color: isSelected ? 'white' : 'var(--gray400)',
          }}
        >
          {menu}
        </div>
      );
    });
  }, [DropDownMenu, selectedSort]);

  return (
    <div className={styles.dropDownContainer}>
      <div
        style={{
          fontSize: '2.2rem',
          fontWeight: '700',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '2.0rem 1rem',
        }}
      >
        정렬 <img src="/assets/images/icons/close-x.svg" alt="Close" />
      </div>
      <span>{DropDownMenuText}</span>
    </div>
  );
};

export default DropDown;
