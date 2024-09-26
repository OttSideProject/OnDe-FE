'use client';

import Link from 'next/link';

import { DropDownOptionsProps } from '@/_types/contents/contents';

import styles from './DropDownOptions.module.css';

const DropDownOptions: React.FC<DropDownOptionsProps> = ({
  title = '',
  height = 300,
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
                <li key={option.id} className={styles.option}>
                  {onSelect ? (
                    <button onClick={() => onSelect(option.id)}>
                      {option.label}
                      {option.url && (
                        <img src={option.url} alt="option.label" />
                      )}
                      {option.label && option.label}
                    </button>
                  ) : (
                    option.link && (
                      <Link href={option.link} target="_blank">
                        {option.url && (
                          <div className={styles.ottLogoInner}>
                            <img src={option.url} alt="option.label" />
                          </div>
                        )}
                      </Link>
                    )
                  )}
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
