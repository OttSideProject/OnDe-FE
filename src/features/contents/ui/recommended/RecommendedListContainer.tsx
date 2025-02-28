'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

/* Components */
import SubHeader from '@/features/contents/ui/header/SubHeader';
import RecommendedSlider from '@/features/contents/ui/recommended/RecommendedSlider';

/* API */
import { fetchRecommended } from '@/api/fetchRecommended';

/* Types */
import {
  RecommendedSection,
  RecommendedResponse,
} from '@/_types/contents/contents';

/* Styles */
import styles from './RecommendedListContainer.module.css';

const userName = '디미';
type RecommendedListContainerProps = {
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};
const RecommendedListContainer: React.FC<RecommendedListContainerProps> = ({
  getImageSrc,
}) => {
  const { ref, inView } = useInView();

  // 무한 스크롤 데이터를 가져오는 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<RecommendedResponse, Error>({
      queryKey: ['sections'],
      queryFn: ({ pageParam = 1 }) => fetchRecommended(pageParam as number),
      getNextPageParam: (lastPage) => {
        const lastSectionId =
          lastPage.sections[lastPage.sections.length - 1]?.id;
        return lastSectionId ? lastSectionId + 1 : undefined;
      },
      initialPageParam: 1, // 첫번째 섹션의 ID
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className={styles.container}>
      {/* 섹션 데이터 렌더링 */}
      {data?.pages.map((page) =>
        page.sections.map((section: RecommendedSection) => (
          <section key={section.id} className={styles.inner}>
            <div>
              {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
              <SubHeader
                userName={section.id === 1 ? userName : ''} // userName 사용
                imageTitle={section.title} // 항상 section.title을 사용
                linkText={section.id === 1 ? '' : section.linkText} // section.id === 1이면 null
                linkUrl={section.id === 1 ? '' : section.linkUrl} // section.id === 1이면 null
                imagePath={getImageSrc(section.title, 'recommended')}
                isImageRequired={true}
              />
              <RecommendedSlider recommendedSlides={section.sectionSlides} />
            </div>
          </section>
        )),
      )}

      {/* 로딩 및 감지 영역 */}
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </section>
  );
};

export default RecommendedListContainer;
