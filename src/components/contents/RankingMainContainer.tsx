'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import Button from '../shared/button-group/Button';

import { MainSliderProps } from '@/_types/contents/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './RankingMainContainer.module.css';

const RankingMainContainer: React.FC<MainSliderProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const router = useRouter();

  const goMypage = () => {
    router.push('/users/mypage');
  };

  const goLink = () => {
    const id = uuidv4();
    router.push(`/contents/detail/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.cardLink}>
            <figure
              className={`${styles.rankingItem} ${
                activeSlide === index ? styles.activeSlide : ''
              }`}
            >
              <Image
                src={slide.url}
                alt={`Slide ${slide.id}`}
                width={113}
                height={170}
              />
              <div className={styles.bottomContainer}>
                <figcaption>
                  <h3>{slide.title}</h3>
                  <h4>{slide.subTitle.join(' · ')}</h4>
                </figcaption>
              </div>
              <div>
                <strong className={styles.topNumber}>1</strong>
              </div>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingMainContainer;
