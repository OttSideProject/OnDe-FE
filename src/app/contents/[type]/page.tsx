'use client';

import { Loading } from '@/shared/ui';
import { StatusBar } from '@/shared/ui';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
import { useTypeData } from '@/entities/contents/hooks';

import { GenericContentListContainer } from '@/shared/ui/type';

/* Styles */
import styles from './page.module.css';
import { useState } from 'react';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const iconTypes = ['alert', 'search'];

const arrowIconUrl = '/assets/images/icons/arrow-back-g.svg'; // 화살표 아이콘 URL 추가

const statusTextMap: Record<string, string> = {
  movie: '영화',
  drama: '드라마',
  ani: '애니',
  enter: '예능',
  docu: ' 다큐',
  new: '신작',
};

const headerTextMap: Record<string, string> = {
  movie: '온 세상 모든 영화는 온-디',
  drama: '온 세상 모든 드라마는 온-디',
  ani: '온 세상 모든 애니는 온-디',
  enter: '온 세상 모든 예능은 온-디',
  docu: '온 세상 모든 다큐는 온-디',
  new: '지루한 일상에 새로운 콘텐츠',
};

const ContentPage: React.FC<{ params: { type: string } }> = ({ params }) => {
  const { getImageSrc } = useImageMapping();
  const statusText = statusTextMap[params.type] || '영화';
  const headerText = headerTextMap[params.type] || '온 세상 모든 온-디';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: contentData } = useTypeData(params.type);
  const items = contentData?.pages.flatMap((page) => page.content) || []; // 모든 페이지의 아이템을 가져옴

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <main className={styles.container}>
      <StatusBar
        arrowIconUrl={arrowIconUrl}
        statusText={statusText}
        iconUrlList={iconUrlList}
        iconTypes={iconTypes}
      />
      <section>
        <Header
          headerText={headerText}
          imageTitle={headerText}
          pageType="type"
          getImageSrc={getImageSrc}
        />
        <GenericContentListContainer type={params.type} items={items} />
      </section>
    </main>
  );
};

export default ContentPage;
