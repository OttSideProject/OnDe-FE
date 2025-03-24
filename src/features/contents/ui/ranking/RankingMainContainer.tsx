'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Ranking } from '@/shared/types/contents';
/* Utils */
import { ageImage } from '@/shared/utils';

import { useCenterTopNumberList } from '@/entities/contents/hooks';
import { useRankingData } from '@/entities/contents/hooks';
import { Loading } from '@/shared/ui/loading';
import { useLoaderStore } from '@/shared/lib/stores';

import styles from './RankingMainContainer.module.css';

type RankingMainContainerProps = {
  category: string | null; // 카테고리 추가
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
  onDataStateChange?: (hasData: boolean, isLoading: boolean) => void; // 로딩 상태도 함께 전달
};

const RankingMainContainer: React.FC<RankingMainContainerProps> = ({
  category = '', // 기본값은 빈 문자열
  getImageSrc,
  onDataStateChange,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [effectiveCategory, setEffectiveCategory] = useState<string>(
    category || '',
  );
  const {
    data,
    refetch,
    isLoading: isQueryLoading,
    isFetching,
  } = useRankingData(effectiveCategory);

  const router = useRouter();

  // 상위 3개 랭킹 데이터만 가져오기
  const topThreeRankings =
    data?.pages[0]?.content?.slice(0, 3).map((item) => ({
      ...item,
      id: String(item.contentId), // contentId를 id로 변환
    })) || [];
  const reorderedRankings = useCenterTopNumberList(topThreeRankings);

  // props로 전달된 category 변경 감지
  useEffect(() => {
    console.log('MainContainer: Category changed to:', category);
    setEffectiveCategory(category || '');
    // 카테고리가 변경되면 데이터 다시 불러오기
    refetch();
  }, [category, refetch]);

  // 쿼리 로딩 상태가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    const queryIsLoading = isQueryLoading || isFetching;
    const hasData = topThreeRankings && topThreeRankings.length > 0;

    // 데이터 상태 변경 시 부모 컴포넌트에 알림
    onDataStateChange?.(hasData, queryIsLoading);
  }, [isQueryLoading, isFetching, onDataStateChange, topThreeRankings]);

  const goLink = (id: string) => {
    router.push(`/contents/detail/${id}`);
  };

  console.log('MainContainer: Ranking data:', data);
  console.log('MainContainer: Top three rankings:', topThreeRankings);
  console.log('MainContainer: Reordered rankings:', reorderedRankings);
  console.log('MainContainer: Loading state:', isQueryLoading || isFetching);

  // 데이터가 없는 경우 빈 컨테이너 반환 (메시지는 페이지에서 처리)
  if (!topThreeRankings || topThreeRankings.length === 0) {
    return null; // 빈 컨테이너 대신 null 반환하여 렌더링하지 않음
  }

  return (
    <article className={styles.container}>
      <div className={styles.list}>
        {reorderedRankings.map((rank: Ranking, index) => (
          <div
            key={index}
            className={styles.cardLink}
            onClick={() => goLink(rank.contentId)}
          >
            <figure
              className={`${styles.rankingItem} ${
                activeSlide === index ? styles.activeSlide : ''
              }`}
            >
              <Image
                src={
                  rank.contentImg && rank.contentImg !== 'NoData'
                    ? rank.contentImg
                    : `https://picsum.photos/240/360?random=${index}`
                }
                alt={rank.title}
                width={113}
                height={170}
              />
              <div className={styles.bottomContainer}>
                <figcaption>
                  <h3>{rank.title}</h3>
                  <h4>
                    <span>
                      {rank.genres &&
                      Array.isArray(rank.genres) &&
                      rank.genres.length > 0 &&
                      !rank.genres.includes('NoData')
                        ? rank.genres.join(' · ')
                        : ''}
                      ·{' '}
                    </span>
                    <Image
                      src={ageImage(
                        rank.age && rank.age !== 'NoData' ? rank.age : '',
                        'shared',
                      )}
                      alt="Age restriction"
                      width={20}
                      height={20}
                    />
                  </h4>
                </figcaption>
                <div className={styles.textContainer}>
                  <strong className={styles.topNumber}>{index + 1}</strong>
                </div>
              </div>
            </figure>
          </div>
        ))}
      </div>
    </article>
  );
};

export default RankingMainContainer;
