import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ClientLayout, MSWInitializer } from '@/features/shared/lib';

import { Navigation } from '@/features/shared/ui';

import '@/styles/core/globals.css';
import '@/styles/core/custom.css'; /* 슬라이더 커스텀 css */

/* 기본 텍스트 */
const pretendard = localFont({
  src: '../../public/assets/fonts/Pretendard-Regular.woff',
  weight: '400',
  display: 'swap',
  variable: '--primary-font' /* CSS 변수로 폰트 설정 */,
});

/* 디자인 폰트를 이미지 카드 제목 에서만  사용 */
const ibmPlexSanskr = localFont({
  src: '../../public/assets/fonts/IBMPlexSansKR-Bold.woff2',
  weight: '700',
  display: 'swap',
  variable: '--design-font',
});

/* 제목, 영문, 큰 숫자에 사용하는 폰트*/
const title = localFont({
  src: '../../public/assets/fonts/Paperlogy-Bold.woff2',
  weight: '700',
  display: 'swap',
  variable: '--title-font',
});

export const metadata: Metadata = {
  title: '당신이 필요한 콘텐츠를 ON! ',
  description:
    '쉽고 간편한 검색과 다양한 추천 서비스를 제공하는 OTT 정보 플랫폼 서비스입니다. ',
  icons: '/favicon.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${ibmPlexSanskr.variable} ${title.variable}`}
      >
        <MSWInitializer />
        <ClientLayout>{children}</ClientLayout>
        {/* 로그인 및 가입 페이지가 아닐 경우에만 네비게이션 표시 */}
        <Navigation />
      </body>
    </html>
  );
}
