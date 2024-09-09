import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ClientLayout from '@/components/ClientLayout';

import '../styles/core/globals.css';
import '../styles/core/custom.css'; /* 슬라이더 커스텀 css */

const pretendard = localFont({
  src: '../../public/assets/fonts/Pretendard-Regular.woff',
  weight: '400',
  display: 'swap',
  variable: '--primary-font' /* CSS 변수로 폰트 설정 */,
});

/* 디자인 폰트를 메인 홈 페이지에서만  사용 */
const ibmPlexSanskr = localFont({
  src: '../../public/assets/fonts/IBMPlexSansKR-Bold.woff2',
  weight: '700',
  display: 'swap',
  variable: '--design-font',
});

/* 숫자에만 사용하는 폰트 */
const suit = localFont({
  src: '../../public/assets/fonts/SUIT-Bold.woff2',
  weight: '700',
  display: 'swap',
  variable: '--number-font',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${ibmPlexSanskr.variable} ${suit.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
