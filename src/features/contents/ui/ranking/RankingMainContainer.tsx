'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Ranking } from '@/_types/contents';
/* Utils */
import { ageImage } from '@/features/shared/utils';

import { useCenterTopNumberList } from '@/entities/contents/hooks';
import { useRankingData } from '@/entities/contents/hooks';

import styles from './RankingMainContainer.module.css';

type RankingMainContainerProps = {
  category: string | null; // 카테고리
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const RankingMainContainer: React.FC<RankingMainContainerProps> = ({
  category = '', // 기본값은 빈 문자열
  getImageSrc,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { data } = useRankingData(category);

  const router = useRouter();

  const goLink = (id: string) => {
    router.push(`/contents/detail/${id}`);
  };

  // 상위 3개 랭킹 데이터만 가져오기
  const topThreeRankings =
    data?.pages[0]?.content.slice(0, 3).map((item) => ({
      ...item,
      id: Number(item.contentId), // contentId를 id로 변환
    })) || [];
  const reorderedRankings = useCenterTopNumberList(topThreeRankings);

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
                  rank.contentImg ||
                  `https://picsum.photos/375/375?random=${index}`
                }
                alt={rank.title}
                width={113}
                height={170}
              />
              <div className={styles.bottomContainer}>
                <figcaption>
                  <h3>{rank.title}</h3>
                  <h4>
                    <span>{rank.genres?.join(' · ')} · </span>
                    <Image
                      src={ageImage(String(rank.age), 'shared')}
                      alt="Age restriction"
                      width={20}
                      height={20}
                    />
                  </h4>
                </figcaption>
              </div>
              <div className={styles.textContainer}>
                <strong className={styles.topNumber}>
                  {index === 0 ? 2 : index === 1 ? 1 : 3}
                </strong>
              </div>
            </figure>
          </div>
        ))}
      </div>
    </article>
  );
};

export default RankingMainContainer;
