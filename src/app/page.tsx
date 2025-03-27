import HomePage from '@/app/contents/main/page';

export const metadata = {
  alternates: {
    canonical: 'https://www.ondemandia.com/contents/main',
  },
};

export default function MainPage() {
  return <HomePage />;
}

export const runtime =
  process.env.NODE_ENV === 'development' ? 'nodejs' : 'experimental-edge';
