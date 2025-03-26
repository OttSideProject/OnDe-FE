'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from './navItems'; // navItems 가져오기

import styles from './Navigation.module.css';

type NavItemProps = {
  iconName: string;
  label: string;
  href: string;
  isActive: boolean;
};

const NavItem = ({ iconName, label, href, isActive }: NavItemProps) => {
  const [lastAlertTime, setLastAlertTime] = useState<number>(0);
  
  const iconSrc = isActive
    ? `/assets/images/nav/${iconName}-on.svg`
    : `/assets/images/nav/${iconName}.svg`;

  const labelStyle =
    isActive && iconName === 'recommended'
      ? { color: '#BA76FF' } // 추천 상태일 때 다른 색상
      : undefined;

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (label === '추천') {
      e.preventDefault(); // Prevent navigation
      
      const now = Date.now();
      if (now - lastAlertTime < 500) return; // 500ms 내에 중복 알림 방지
      
      setLastAlertTime(now);
      alert('준비중입니다');
      return; // Ensure no further action is taken
    }

    if (iconName === 'my') {
      e.preventDefault();
      const isLoggedIn = Boolean(localStorage.getItem('userId')); // 로그인 여부 확인
      if (isLoggedIn) {
        window.location.href = '/users/mypage'; // 마이페이지로 이동
      } else {
        window.location.href = '/users/login'; // 로그인 페이지로 이동
      }
    }
  };

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.on : ''}`}
      onClick={handleClick}
    >
      <img src={iconSrc} alt={label} />
      <span style={labelStyle}>{label}</span>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/login' && pathname !== '/signup' && (
        <footer className={styles.container}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className={`${styles.navItem} ${
                    pathname === item.href ? styles.on : ''
                  }`}
                >
                  <NavItem
                    iconName={item.iconName}
                    label={item.label}
                    href={item.href}
                    isActive={pathname === item.href}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      )}
    </>
  );
};

export default Navigation;
