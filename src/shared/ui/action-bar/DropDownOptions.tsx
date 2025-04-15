'use client';

import Link from 'next/link';
import styles from './DropDownOptions.module.css';

/* DropDownOptionsProps type */
type Option = {
  id: number;
  label?: string;
  link?: string;
  url?: string;
};

type DropDownOptionsProps = {
  title?: string;
  height?: number;
  options: Option[];
  onSelect?: (id: number) => void;
  isPositioned?: boolean;
};

const DropDownOptions: React.FC<DropDownOptionsProps> = ({
  title = '',
  height,
  options,
  onSelect,
  isPositioned = false,
}) => {
  return (
    <div
      className={styles.container}
      style={height ? { height: `${height}px` } : undefined}
    >
      <div 
        className={styles.inner}
        style={isPositioned ? { position: 'absolute' } : undefined}
      >
        <h4>{title}</h4>
        <div className="scrollbar">
          <div className={styles.scrollBarInner}>
            <ul>
              {options.map((option) => (
                <li key={option.id} className={styles.option}>
                  {onSelect ? (
                    <button onClick={() => onSelect(option.id)}>
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
