'use client';

import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import QueryProvider from './QueryProvider';

type Props = {
  children: ReactNode;
};

const ClientWrapper = ({ children }: Props) => {
  return (
    <QueryProvider>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryProvider>
  );
};

export default ClientWrapper;
