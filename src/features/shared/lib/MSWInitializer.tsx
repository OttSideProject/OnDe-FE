// src/components/MSWInitializer.tsx
'use client';

import { useEffect } from 'react';

/**
 * MSW를 초기화하는 컴포넌트
 * 개발 환경에서만 작동하도록 설정
 */
const MSWInitializer = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_API_MOCKING === 'true'
    ) {
      const startWorker = async () => {
        const { worker } = await import('../../../__mocks__/browser');
        await worker.start();
      };
      startWorker();
    }
  }, []);

  return null;
};

export default MSWInitializer;
