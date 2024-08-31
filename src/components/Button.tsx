// src/components/Button.tsx
import { useState } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'default';
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant = 'primary',
  size = 'default',
  isActive = false,
  children,
  onClick,
}: ButtonProps) {
  const [active, setIsActive] = useState(isActive);

  const handleClick = () => {
    setIsActive(!active);
    onClick && onClick();
  };
  const className = `
	${styles.btn} 
	${styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} 
	${styles[`btn${size.charAt(0).toUpperCase() + size.slice(1)}`]}
	${active ? styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}Active`] : ''}
	`;

  return (
    <div className={styles.btnBody}>
      <button className={className} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}
