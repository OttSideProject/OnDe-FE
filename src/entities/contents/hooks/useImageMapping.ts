'use client';

import { useCallback } from 'react';
import { imageMapping } from '@/shared/utils';
import type { PageType } from '@/shared/types/contents';

/**
 * 이미지 매핑을 위한 훅
 * @returns {Object} getImageSrc 함수를 포함한 객체
 * @example
 * const { getImageSrc } = useImageMapping();
 * const imageSrc = getImageSrc('제목', 'contentMain');
 */
export const useImageMapping = () => {
  const getImageSrc = useCallback((title: string, pageType: PageType) => {
    return imageMapping[pageType]?.[title] || '';
  }, []);

  return { getImageSrc };
};
