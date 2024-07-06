// app/_app.tsx
import type { AppProps } from 'next/app';

import GlobalStyles from '@/components/GlobalStyles';

import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/core/theme';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
