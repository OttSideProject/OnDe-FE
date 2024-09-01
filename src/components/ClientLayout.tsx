'use client';

import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';
import ClientWrapper from '@/components/ClientWrapper';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryProvider>
  );
};

export default ClientLayout;
