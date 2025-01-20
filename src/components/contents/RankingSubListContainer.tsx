'use client';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';

/* Components */
import SubHeader from '@/components/contents/header/SubHeader';
import ImageSubList from '@/components/contents/ImageSubList';

/* API */
import { fetchSections } from '@/api/fetchSections';

/* Types */
import { Section, SectionsResponse } from '@/_types/contents/contents';

/* Styles */
import styles from './RankingSubListContainer.module.css';

const id = uuidv4();

const userName = '디미';

const RankingSubListContainer: React.FC = () => {
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
    <div className={styles.container}>
      {/* 섹션 데이터 렌더링 */}
      {data?.pages.map((page) =>
        page.sections.map((section: Section) => (
          <div key={section.id}>
            {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
            <SubHeader
              title={
                section.id === 1 ? `${userName}${section.title}` : section.title
              }
              linkText={section.linkText}
              linkUrl={section.linkUrl}
            />
            <ImageSubList sectionSlides={section.sectionSlides} />
          </div>
        )),
      )}

      {/* 로딩 및 감지 영역 */}
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </div>
  );
};

export default RankingSubListContainer;
