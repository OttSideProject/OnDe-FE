'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Ranking } from '@/shared/types/contents';
/* Utils */
import { ageImage } from '@/shared/utils';

import { useRankingStore } from '@/entities/contents/stores/ranking';

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

  // useRankingData 훅 대신 useRankingStore 사용
  const { isLoading, dataState, getTopThreeRankings } = useRankingStore();

  // 상위 3개 랭킹 데이터 가져오기
  const topThreeRankings = getTopThreeRankings();

  const router = useRouter();

  // props로 전달된 category 변경 감지
  useEffect(() => {
    console.log('MainContainer: Category changed to:', category);
    setEffectiveCategory(category || '');
  }, [category]);

  // 쿼리 로딩 상태가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    const queryIsLoading = isLoading;
    const hasData = topThreeRankings && topThreeRankings.length > 0;

    // 데이터 상태 변경 시 부모 컴포넌트에 알림
    onDataStateChange?.(hasData, queryIsLoading);
  }, [isLoading, onDataStateChange, topThreeRankings]);

  const goLink = (id: string) => {
    router.push(`/contents/detail/${id}`);
  };

  console.log('MainContainer: Ranking data:', topThreeRankings);
  console.log('MainContainer: Loading state:', isLoading);

  // 데이터 상태에 따른 UI 렌더링
  if (dataState === 'loading' || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (dataState === 'no_data' || dataState === 'filtered_no_data') {
    return (
      <div className={styles.emptyContainer}>
        <p>데이터가 없습니다.</p>
      </div>
    );
  }

  // 상위 3개 랭킹이 없는 경우
  if (!topThreeRankings || topThreeRankings.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>랭킹 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <article className={styles.container}>
      <div className={styles.list}>
        {topThreeRankings.map((rank: Ranking, index) => (
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
                  {/* 순위 매핑: 2위, 1위, 3위 순서로 표시 */}
                  <strong className={styles.topNumber}>
                    {index === 0 ? 2 : index === 1 ? 1 : 3}
                  </strong>
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
