import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ClientLayout from '@/components/ClientLayout';

import '../styles/core/globals.css';

const pretendardRegular = localFont({
  src: '../../public/assets/fonts/Pretendard-Regular.woff',
  weight: '400',
  display: 'swap',
  variable: '--primary-font' /* CSS 변수로 폰트 설정 */,
});

export const pretendardBold = localFont({
  src: '../../public/assets/fonts/Pretendard-SemiBold.woff',
  weight: '600',
  display: 'swap',
  variable: '--primary-title-font' /* CSS 변수로 폰트 설정 */,
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
    <html
      lang="ko"
      className={`${pretendardRegular.variable} ${pretendardBold.variable}`}
    >
      <body className={pretendardRegular.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
