"use client";

import { useEffect } from 'react';
import { useMounted } from './useMounted';

export const useDidMountEffect = (callback: () => void, deps: any[]) => {
  const wasMounted = useMounted();

  useEffect(() => {
    if (!wasMounted) return;
    callback();
  }, [...deps]);
};
