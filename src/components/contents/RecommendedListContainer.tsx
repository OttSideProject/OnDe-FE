'use client';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

/* Components */
import SubHeader from '@/components/contents/header/SubHeader';
import RecommendedSlider from '@/components/contents/RecommendedSlider';

/* API */
import { fetchSections } from '@/api/fetchSections';

/* Types */
import { Section, SectionsResponse } from '@/_types/contents/contents';

/* Styles */
import styles from './SectionSliderContainer.module.css';

const userName = '디미';
const RecommendedListContainer: React.FC = () => {
  const { ref, inView } = useInView();

  // 무한 스크롤 데이터를 가져오는 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<SectionsResponse, Error>({
      queryKey: ['sections'],
      queryFn: ({ pageParam = 1 }) => fetchSections(pageParam as number),
      getNextPageParam: (lastPage) => {
        return lastPage.pageNo < lastPage.totalPages
          ? lastPage.pageNo + 1
          : undefined;
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
        page.sections.map((section: Section) => (
          <section key={section.id}>
            {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
            <SubHeader
              userName={section.id === 1 ? userName : ''} // userName 사용
              imageTitle={section.title} // 항상 section.title을 사용
              linkText={section.linkText}
              linkUrl={section.linkUrl}
              pageType="recommended" // pageType 추가
            />
            <RecommendedSlider recommendedSlides={section.sectionSlides} />
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
