'use client';

import { DropDownOptionsProps } from '@/_types/contents/contents';

import styles from './DropDownOptions.module.css';

const DropDownOptions: React.FC<DropDownOptionsProps> = ({
	title='',
	height=300,
  options,
  onSelect,
}) => {
  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <div className={styles.inner}>
        <h4>{title}</h4>
        <div className="scrollbar">
          <div className={styles.scrollBarInner}>
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
    </div>
  );
};

export default DropDownOptions;
