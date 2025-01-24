'use client';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';

/* Components */
import SubHeader from '@/components/contents/header/SubHeader';
import ImageSubList from '@/components/contents/ImageSubList';

/* API */
import { fetchRankings } from '@/api/fetchRankings';

/* Types */
import { Ranking, RankingsResponse } from '@/_types/contents/contents';

/* Styles */
import styles from './RankingSubListContainer.module.css';

const id = uuidv4();

type RankingSubListContainerProps = {
  type: 'monthly' | 'weekly'; // 랭킹 타입
  ott: string | null; // 현재 활성화된 OTT
};

const RankingSubListContainer: React.FC<RankingSubListContainerProps> = ({
  type,
  ott,
}) => {
  const { ref, inView } = useInView();

  // 무한 스크롤 데이터를 가져오는 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<RankingsResponse, Error>({
      queryKey: ['rankings', type, ott, id],
      queryFn: ({ pageParam = 1 }) =>
        fetchRankings(type || 'monthly', ott || 'netflix', pageParam as number),
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
      <SubHeader title="지금 가장 HOT한 콘텐츠" />
      {/* 섹션 데이터 렌더링 */}
      {data?.pages.map((page) =>
        page.rankings.map((ranking: Ranking) => (
          <section key={ranking.id}>
            {/* <SubHeader title={ranking.title} /> */}
            <ImageSubList rankings={page.rankings} />
          </section>
        )),
      )}

      {/* 로딩 및 감지 영역 */}
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </section>
  );
};

export default RankingSubListContainer;
