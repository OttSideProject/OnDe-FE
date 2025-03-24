'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* Types */
import { ContentType } from '@/shared/types/contents';

/* Utils */
import { ageImage } from '@/shared/utils/ageImage';

import { useTypeData } from '@/entities/contents/hooks';

/* Components */
import GenericContentList from './GenericContentList';

/* Styles */
import styles from './GenericContentListContainer.module.css';

type GenericContentListContainerProps<T> = {
  type: string | null; // 카테고리
  items: T[]; // 제너릭 타입의 아이템 배열
};

const GenericContentListContainer = <T extends ContentType>({
  type,
  items,
}: GenericContentListContainerProps<T>) => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTypeData(type);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 데이터가 없거나 빈 배열인 경우에도 GenericContentList에 빈 배열을 전달
  const contentItems = items && items.length > 0 ? items : [];

  return (
    <div className={styles.container}>
      <GenericContentList items={contentItems} />
      {isFetchingNextPage && <div>Loading...</div>}
      <div ref={ref} /> {/* 이 div가 보일 때 다음 페이지를 로드 */}
    </div>
  );
};

export default GenericContentListContainer;
