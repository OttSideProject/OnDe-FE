'use client';

import { useState, useEffect } from 'react';
import { StatusBar } from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';

/* Types */
import { ContentType } from '@/_types/contents';

import MovieList from '@/features/shared/ui/type/MovieList';

/* Styles */
import styles from './page.module.css';
import MovieSubListContainer from '@/features/shared/ui/type/MovieSubListContainer';

const MoviesPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchContents({
  //         type: 'movie',
  //         nowPage: 1,
  //         pageSize: 10,
  //       });
  //       setMovieData(response.content || []); // 응답 데이터 구조에 따라 수정
  //       console.log('movies', response);
  //     } catch (error) {
  //       setError('영화 데이터를 불러오는 중 에러가 발생했습니다.');
  //       console.error('Error fetching movie data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const headerText = '전체 콘텐츠 랭킹';

  const iconUrlList = [
    '/assets/images/icons/alert-icon.svg',
    '/assets/images/icons/find-icon.svg',
  ];

  return (
    <main className={styles.container}>
      <StatusBar statusText="영화" iconUrlList={iconUrlList} />
      <section>
        <Header
          headerText={headerText}
          imageTitle="온 세상 모든 영화는 온-디"
          pageType="type"
          getImageSrc={getImageSrc}
        />
        <MovieSubListContainer type="movie" />
      </section>
    </main>
  );
};

export default MoviesPage;
