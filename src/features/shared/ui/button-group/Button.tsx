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
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant = 'default',
  size = 'default',
  isActive = false,
  children,
  iconUrl,
  onClick,
  className = '',
}: ButtonProps) {
  const [active, setIsActive] = useState(() => isActive);

  const handleClick = () => {
    setIsActive((prevActive) => !prevActive);
    onClick?.(); /* Optional chaining을 사용해 안전하게 호출 */
  };

  return (
		<BtnInner className={className}>
    <Btn variant={variant} size={size} active={active} onClick={handleClick}>
      {iconUrl && <Icon src={iconUrl} alt="icon" />}
      <span>{children}</span>
    </Btn></BtnInner>
  );
}
