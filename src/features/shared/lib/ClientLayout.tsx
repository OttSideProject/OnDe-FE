'use client';

import { ReactNode } from 'react';
import QueryProvider from '@/features/shared/lib/QueryProvider';
import ClientWrapper from '@/features/shared/lib/ClientWrapper';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryProvider>
  );
};

export default ClientLayout;
