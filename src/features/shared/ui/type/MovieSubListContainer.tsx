'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* Types */
import { ContentType } from '@/_types/contents';

/* Utils */
import { ageImage } from '@/features/shared/utils/ageImage';

import { useTypeData } from '@/entities/contents/hooks';

/* Components */
import GenericContentList from './GenericContentList';

/* Styles */
import styles from './MovieSubListContainer.module.css';

type MovieSubListContainerProps = {
  type: string | null; // 카테고리
};

const MovieSubListContainer: React.FC<MovieSubListContainerProps> = ({
  type, // 기본값은 빈 문자열
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTypeData(type);
  const [movies, setMovies] = useState<ContentType[]>([]); // 한 번에 로드된 랭킹 데이터
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 IntersectionObserver

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 페이지 데이터를 추적하여 중복을 방지
  useEffect(() => {
    if (data?.pages) {
      const updatedContent = data.pages.flatMap((page) => page.content); // 모든 페이지 데이터 합침
      setMovies((prevContents) => {
        return updatedContent.map((content) => ({
          ...content,
          ageImage: content.age
            ? ageImage(String(content.age), 'shared')
            : null, // age 속성명 변경
        }));
      });
    }
  }, [data]);

  return (
    <section className={styles.container}>
      <GenericContentList items={movies} />
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </section>
  );
};

export default MovieSubListContainer;
