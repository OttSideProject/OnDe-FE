'use client';

import React from 'react';
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
  const iconSrc = isActive
    ? `/assets/images/nav/${iconName}-on.svg`
    : `/assets/images/nav/${iconName}.svg`;

  const labelStyle =
    isActive && iconName === 'recommended'
      ? { color: '#BA76FF' } // 추천 상태일 때 다른 색상
      : undefined;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.on : ''}`}
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
                  className={`${styles.navItem} isActive ? styles.on : ''`}
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
