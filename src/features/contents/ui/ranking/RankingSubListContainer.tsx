'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* Types */
import { Ranking } from '@/_types/contents';

/* Utils */
import { ageImage } from '@/features/shared/utils/ageImage';

/* Components */
import { SubHeader } from '@/features/contents/ui/header';
import { ImageSubList } from '@/features/contents/ui/ranking';

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

  // 페이지 데이터를 추적하여 중복을 방지
  useEffect(() => {
    if (data?.pages) {
      const updatedRankings = data.pages.flatMap((page) => page.content); // 모든 페이지 데이터 합침

      // 순위를 4부터 시작하도록 설정
      const adjustedRankings = updatedRankings
        .slice(0, 51)
        .map((ranking, index) => ({
          ...ranking,
          rank: index + 4, // 순위가 4부터 시작
          ageImage: ranking.age
            ? ageImage(String(ranking.age), 'shared')
            : null, // age 속성명 변경
        }))
        .filter((_, index) => index >= 3); // 1위부터 3위까지 제외

      // 렌더링할 때 3개씩 나누어 보여주기
      // const rows = [];
      // for (let i = 0; i < adjustedRankings.length; i += 3) {
      //   rows.push(adjustedRankings.slice(i, i + 3));
      // }

      setRankings((prevRankings) => {
        // 기존 상태와 새 데이터를 합치고 중복 제거
        const uniqueRankings = Array.from(
          new Map(
            [...prevRankings, ...adjustedRankings].map((item) => [
              item.contentId,
              item,
            ]),
          ).values(),
        );

        return uniqueRankings.map((ranking, index) => ({
          ...ranking,
          rank: index + 4,
          ageImage: ranking.age
            ? ageImage(String(ranking.age), 'shared')
            : null, // age 속성명 변경
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
