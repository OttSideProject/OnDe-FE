'use client';

import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';
import ClientWrapper from '@/components/ClientWrapper';
import GlobalStyles from '@/components/GlobalStyles';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <GlobalStyles />
      <ClientWrapper>{children}</ClientWrapper>
    </QueryProvider>
  );
};

export default ClientLayout;
