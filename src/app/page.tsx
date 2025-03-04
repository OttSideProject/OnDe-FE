import Main from '@/components/Main';

export const metadata = {
  title: 'Main',
};

export default function HomePage() {
  return <Main />;
}

export const runtime = process.env.NODE_ENV === "development" ? "nodejs" : "experimental-edge";
