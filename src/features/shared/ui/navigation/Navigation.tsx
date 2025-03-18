'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

type NavItemProps = {
  iconName: string;
  label: string;
  href: string;
  isActive: boolean;
};

type NavigationProps = {
  navItems: { iconName: string; label: string; href: string }[];
};

const NavItem = ({ iconName, label, href, isActive }: NavItemProps) => {
  const iconSrc = isActive
    ? `/assets/images/nav/${iconName}-on.svg`
    : `/assets/images/nav/${iconName}.svg`;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.on : ''}`}
    >
      <img src={iconSrc} alt={label} />
      <span>{label}</span>
    </Link>
  );
};

const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
  const pathname = usePathname();
  console.log('pathname:', pathname);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li
            key={item.href}
            className={`${styles.navLink} isActive? ${styles.on} : ''`}
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
  );
};

export default Navigation;
