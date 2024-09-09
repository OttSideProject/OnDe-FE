'use client';

import { DropDownOptionsProps } from '@/_types/contents/contents';

import styles from './DropDownOptions.module.css';

const DropDownOptions: React.FC<DropDownOptionsProps> = ({
  options,
  onSelect,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className="scrollbar">
          <h4>메뉴를 선택해주세요!</h4>
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                className={styles.option}
                onClick={() => onSelect(option.id)}
              >
                {option.url && <img src={option.url} alt="option.label" />}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDownOptions;
