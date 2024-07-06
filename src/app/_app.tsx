// app/_app.tsx
import type { AppProps } from 'next/app';
import QueryProvider from '@/components/QueryProvider';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryProvider>
      <Component {...pageProps} />
    </QueryProvider>
  );
}
