'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import { Ranking } from '@/shared/types/contents';
/* Utils */
import { ageImage } from '@/shared/utils';

import { useRankingStore } from '@/entities/contents/stores/ranking';

import { SubHeader } from '../header';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './RankingSubMainContainer.module.css';

type RankingSubMainContainerProps = {
  category: string | null; // 카테고리 추가
  slides: Ranking[];
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
  onDataStateChange?: (hasData: boolean, isLoading: boolean) => void; // 로딩 상태도 함께 전달
};

const RankingSubMainContainer: React.FC<RankingSubMainContainerProps> = ({
  category = '', // 기본값은 빈 문자열
  getImageSrc,
  onDataStateChange,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [effectiveCategory, setEffectiveCategory] = useState<string>(
    category || '',
  );

  const settings = {
    // dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: false,
    centerPadding: '10px',
    afterChange: (current: number) => setActiveSlide(current),
  };

  // useRankingData 훅 대신 useRankingStore 사용
  const { isLoading, dataState, getTopThreeRankings } = useRankingStore();

  // 상위 3개 랭킹 데이터 가져오기
  const topThreeRankings = getTopThreeRankings();

  const router = useRouter();

  // props로 전달된 category 변경 감지
  useEffect(() => {
    console.log('RankingSubMainContainer: Category changed to:', category);
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

  console.log('RankingSubMainContainer: Ranking data:', topThreeRankings);
  console.log('RankingSubMainContainer: Loading state:', isLoading);

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
    <>
      <SubHeader
        imageTitle="콘텐츠 필터 기준 TOP 3"
        imagePath={getImageSrc('콘텐츠 필터 기준 TOP 3', 'ranking')}
        isImageRequired={true}
      />
      <article className={styles.container}>
        <div className={`${styles.list} ranking-sub-main`}>
          <Slider {...settings}>
            {topThreeRankings.map((rank: Ranking, index) => (
              <div
                key={index}
                className={styles.cardLink}
                onClick={() => goLink(rank.contentId)}
              >
                <div className={styles.cardContainer}>
                  <div className={styles.textContainer}>
                    <strong className={styles.topNumber}>{index + 1}</strong>
                  </div>
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
                      width={110}
                      height={160}
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
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </article>
    </>
  );
};

export default RankingSubMainContainer;
