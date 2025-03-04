'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ageImage } from '@/features/shared/utils/ageImage';
import Slider from 'react-slick';

import { Button } from '@/features/shared/ui/button-group';

import { TodayPickContent } from '@/_types/contents/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './MainSlider.module.css';

export type MainSliderProps = {
  slides: TodayPickContent[];
};

const MainSlider: React.FC<MainSliderProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '0',
    afterChange: (current: number) => setActiveSlide(current),
  };

  const router = useRouter();

  const goMypage = () => {
    router.push('/users/mypage');
  };

  const goLink = (id: string) => {
    router.push(`/contents/detail/${id}`);
  };

  return (
    <article className={styles.container}>
      <div className={styles.slider}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={styles.cardLink}
              onClick={() => goLink(slide.contentId)}
            >
              <figure
                className={`${styles.slide} ${
                  activeSlide === index ? styles.activeSlide : ''
                }`}
              >
                <Image
                  src={
                    slide.contentImg ||
                    `https://picsum.photos/240/360?random=${index}`
                  }
                  alt={`Slide ${slide.contentId}`}
                  width={238}
                  height={360}
                />
                <div className={styles.bottomContainer}>
                  <figcaption>
                    <h3>{slide.title}</h3>
                    <h4>
                      <span>
                        {slide.genres ? slide.genres.join(' · ') : ''} ·
                      </span>
                      <span className={styles.ageImageBackground}>
                        {' '}
                        <Image
                          src={ageImage(slide.age, 'shared')}
                          alt="Age restriction"
                          width={20}
                          height={20}
                        />
                      </span>
                    </h4>
                  </figcaption>
                  <div className={styles.btnContainer}>
                    {/* 첫 번째 버튼 */}
                    <Button
                      variant="default"
                      size="small"
                      text="모아보기"
                      iconUrl="/assets/images/icons/collect-box.svg"
                      onClick={goMypage}
                    >
                      모아보기
                    </Button>
                    {/* 두 번째 버튼 */}
                    <Button
                      variant="primary"
                      size="small"
                      text="바로가기"
                      iconUrl="/assets/images/icons/info-black.svg"
                      onClick={() => goLink(slide.contentId)}
                    >
                      바로가기
                    </Button>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </article>
  );
};

export default MainSlider;
