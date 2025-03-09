'use client';

import { ReactNode } from 'react';
import { QueryProvider, ClientWrapper } from '@/features/shared/lib';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryProvider>
  );
};

export default ClientLayout;
