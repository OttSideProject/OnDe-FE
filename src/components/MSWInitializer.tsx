// src/components/MSWInitializer.tsx
'use client';

import { useEffect } from 'react';

const MSWInitializer = () => {
  useEffect(() => {
    if (
      // process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_API_MOCKING === 'true'
    ) {
      const startWorker = async () => {
        const { worker } = await import('../__mocks__/browser');
        await worker.start();
      };
      startWorker();
    }
  }, []);

  return null;
};

export default MSWInitializer;
