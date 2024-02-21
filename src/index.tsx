import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '@styles/core/global';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/core';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </>,
);
