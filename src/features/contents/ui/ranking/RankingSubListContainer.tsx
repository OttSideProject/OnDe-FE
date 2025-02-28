'use client';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

/* Components */
import SubHeader from '@/features/contents/ui/header/SubHeader';
import ImageSubList from '@/features/contents/ui/ranking/ImageSubList';

/* API */
import { fetchRankings } from '@/api/fetchRankings';

/* Utils */
import { ageImage } from '@/features/shared/utils/ageImage';

/* Types */
import { Ranking, RankingsResponse } from '@/_types/contents/contents';

/* Styles */
import styles from './RankingSubListContainer.module.css';

type RankingSubListContainerProps = {
  type: 'monthly' | 'weekly'; // 랭킹 타입
  ott: string | null; // 현재 활성화된 OTT
  getImageSrc: (title: string, pageType: 'contentMain' | 'ranking' | 'recommended') => string;
};

const RankingSubListContainer: React.FC<RankingSubListContainerProps> = ({
  type = 'monthly', // 기본값은 월간
  ott = 'netflix', // 기본값은 넷플릭스
  getImageSrc,
}) => {
  const [rankings, setRankings] = useState<Ranking[]>([]); // 한 번에 로드된 랭킹 데이터
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 IntersectionObserver

  // // 무한 스크롤 데이터를 가져오는 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<RankingsResponse, Error>({
      queryKey: ['rankings', type, ott],
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

  // // 페이지 데이터를 추적하여 중복을 방지
  useEffect(() => {
    if (data?.pages) {
      const updatedRankings = data.pages.flatMap((page) => page.rankings); // 모든 페이지 데이터 합침

      // 순위를 4부터 시작하도록 설정
      const adjustedRankings = updatedRankings
        .slice(0, 45)
        .map((ranking, index) => ({
          ...ranking,
          ranking_num: index + 4, // 순위가 4부터 시작
          age: ageImage(ranking.age, 'shared'), // age값을 이미지 URL로 변환
        }));

      setRankings((prevRankings) => {
        // 기존 상태와 새 데이터를 합치고 중복 제거
        const uniqueRankings = Array.from(
          new Map(adjustedRankings.map((item) => [item.id, item])).values(),
        );
        return uniqueRankings;
      });
    }
  }, [data, type, ott]);

  return (
    <section className={styles.container}>
      <SubHeader
        imageTitle="지금 가장 HOT한 콘텐츠"
        imagePath={getImageSrc('지금 가장 HOT한 콘텐츠', 'ranking')}
        isImageRequired={true}
      />
      {/* 데이터를 ImageSubList로 전달 */}
      <ImageSubList rankings={rankings} />
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </section>
  );
};

export default RankingSubListContainer;
