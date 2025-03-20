'use client';

import { StatusBar } from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
import { useTypeData } from '@/entities/contents/hooks';

/* Types */
import { ContentType } from '@/_types/contents';

/* Styles */
import styles from './page.module.css';
import { GenericContentListContainer } from '@/features/shared/ui/type';

const MoviesPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  const { data: moviesData } = useTypeData('movie');
  const items = moviesData?.pages.flatMap((page) => page.content) || []; // 모든 페이지의 아이템을 가져옴

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
        <GenericContentListContainer type="movie" items={items} />
      </section>
    </main>
  );
};

export default MoviesPage;
