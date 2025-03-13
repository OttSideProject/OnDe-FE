'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* Components */
import { SubHeader } from '@/features/contents/ui/header';
import { ImageSubList } from '@/features/contents/ui/ranking';

/* Types */
import { Ranking } from '@/_types/contents';

/* Utils */
import { ageImage } from '@/features/shared/utils/ageImage';

/* Styles */
import styles from './RankingSubListContainer.module.css';

/* Hooks */
import { useRankingData } from '@/entities/contents/hooks/useRankingData';

type RankingSubListContainerProps = {
  category: string | null; // 카테고리
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const RankingSubListContainer: React.FC<RankingSubListContainerProps> = ({
  category = '', // 기본값은 빈 문자열
  getImageSrc,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRankingData(category);
  const [rankings, setRankings] = useState<Ranking[]>([]); // 한 번에 로드된 랭킹 데이터
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 IntersectionObserver

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // // 페이지 데이터를 추적하여 중복을 방지
  useEffect(() => {
    if (data?.pages) {
      const updatedRankings = data.pages.flatMap((page) => page.content); // 모든 페이지 데이터 합침

      // 순위를 4부터 시작하도록 설정
      const adjustedRankings = updatedRankings
        .slice(0, 45)
        .map((ranking, index) => ({
          ...ranking,
          ranking_num: index + 4, // 순위가 4부터 시작
          // age: ranking.age ? ageImage(ranking.age, 'shared') : '', // age가 존재할 경우에만 ageImage 호출
        }));

      setRankings((prevRankings) => {
        // 기존 상태와 새 데이터를 합치고 중복 제거
        const uniqueRankings = Array.from(
          new Map(
            adjustedRankings.map((item) => [item.contentId, item]),
          ).values(),
        );

        return uniqueRankings.map((rank, index) => ({
          ...rank,
          ranking_num: index + 4,
          age: rank.age ? ageImage(rank.age, 'shared') : '', // age가 존재할 경우에만 ageImage 호출
        }));
      });
    }
  }, [data]);

  return (
    <section className={styles.container}>
      <SubHeader
        imageTitle="지금 가장 HOT한 콘텐츠"
        imagePath={getImageSrc('지금 가장 HOT한 콘텐츠', 'ranking')}
        isImageRequired={true}
      />
      {/* 데이터를 ImageSubList로 전달 */}
      <ImageSubList content={rankings} />
      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={ref} />
    </section>
  );
};

export default RankingSubListContainer;
