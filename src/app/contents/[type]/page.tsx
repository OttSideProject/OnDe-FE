'use client';

import { StatusBar } from '@/features/shared/ui/status-bar';
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
import { useTypeData } from '@/entities/contents/hooks';

import { GenericContentListContainer } from '@/features/shared/ui/type';

/* Styles */
import styles from './page.module.css';

const ContentPage: React.FC<{ params: { type: string } }> = ({ params }) => {
  const { getImageSrc } = useImageMapping();
  const { data: contentData } = useTypeData(params.type);
  const items = contentData?.pages.flatMap((page) => page.content) || []; // 모든 페이지의 아이템을 가져옴

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

  const statusText = statusTextMap[params.type] || '영화';
  const headerText = headerTextMap[params.type] || '온 세상 모든 온-디';

  const iconUrlList = [
    '/assets/images/icons/alert-icon.svg',
    '/assets/images/icons/find-icon.svg',
  ];

  return (
    <main className={styles.container}>
      <StatusBar statusText={statusText} iconUrlList={iconUrlList} />
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
