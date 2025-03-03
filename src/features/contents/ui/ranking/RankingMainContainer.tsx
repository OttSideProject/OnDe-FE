'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RankingMainSliderProps } from '@/_types/contents/contents';
/* Utils */
import { ageImage } from '@/features/shared/utils';

import {useCenterTopNumberList} from '@/entities/contents/hooks';

import styles from './RankingMainContainer.module.css';

const RankingMainContainer: React.FC<RankingMainSliderProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const router = useRouter();

  const goLink = (id: number) => {
    router.push(`/contents/detail/${id}`);
  };

  // 재구성된 배열 가져오기
  const centerTopNumberList = useCenterTopNumberList(slides);

  return (
    <article className={styles.container}>
      <div className={styles.list}>
        {centerTopNumberList.map((slide, index) => (
          <div key={index} className={styles.cardLink} onClick={() => goLink(slide.id)}>
            <figure
              className={`${styles.rankingItem} ${
                activeSlide === index ? styles.activeSlide : ''
              }`}
            >
              <Image
                src={slide.url}
                alt={`Slide ${slide.title}`}
                width={113}
                height={170}
              />
              <div className={styles.bottomContainer}>
                <figcaption>
                  <h3>{slide.title}</h3>
                  <h4>
                    <span>{slide.subTitle.join(' · ')} · </span>
                    <Image
                      src={ageImage(slide.age ?? '', 'shared')} // age는 이제 이미지 URL
                      alt="Age restriction"
                      width={20}
                      height={20}
                    />
                  </h4>
                </figcaption>
              </div>
              <div className={styles.textContainer}>
                <strong className={styles.topNumber}>{slide.id}</strong>
              </div>
            </figure>
          </div>
        ))}
      </div>
    </article>
  );
};

export default RankingMainContainer;
