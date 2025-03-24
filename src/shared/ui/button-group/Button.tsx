'use client';

import { useState } from 'react';

import { BtnInner, Btn, Icon } from './ButtonStyles';

/* Button type */
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'default';
  text?: string;
  iconUrl?: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?:
    | ((e: React.TouchEvent<HTMLButtonElement>) => void)
    | (() => void);
  className?: string;
};

export default function Button({
  variant = 'default',
  size = 'default',
  isActive = false,
  children,
  iconUrl,
  onClick,
  onTouchStart,
  className = '',
}: ButtonProps) {
  const [active, setIsActive] = useState(() => isActive);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive((prevActive) => !prevActive);
    onClick?.(e);
    /* Optional chaining을 사용해 안전하게 호출 */
  };

  const handleTouch = (e: React.TouchEvent<HTMLButtonElement>) => {
    onTouchStart?.(e);
  };

  return (
    <BtnInner className={className}>
      <Btn
        variant={variant}
        size={size}
        active={active}
        onClick={handleClick}
        onTouchStart={onTouchStart ? handleTouch : undefined}
      >
        {iconUrl && <Icon src={iconUrl} alt="icon" />}
        <span>{children}</span>
      </Btn>
    </BtnInner>
  );
}
