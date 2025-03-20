'use client';

import { StatusBar } from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';

/* Types */
import { ContentType } from '@/_types/contents';

/* Styles */
import styles from './page.module.css';
import MovieSubListContainer from '@/features/shared/ui/type/MovieSubListContainer';

const MoviesPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();

  const headerText = '온 세상 모든 영화는 온-디';

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
