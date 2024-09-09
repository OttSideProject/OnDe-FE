'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';

import Button from '../shared/button-group/Button';

import { MainSliderProps } from '@/_types/contents/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './MainSlider.module.css';

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

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <Link key={index} href={''} className={styles.cardLink}>
              <figure
                className={`${styles.slide} ${
                  activeSlide === index ? styles.activeSlide : ''
                }`}
              >
                <Image
                  src={slide.url}
                  alt={`Slide ${slide.id}`}
                  width={240}
                  height={360}
                />
                <figcaption>
                  <h3>{slide.title}</h3>
                  <h4>{slide.subTitle.join(' · ')}</h4>
                </figcaption>
                <div className={styles.btnContainer}>
                  {/* 첫 번째 버튼 */}
                  <Button
                    variant="primary"
                    size="small"
                    text="모아보기"
                    iconUrl="/assets/images/icons/collect-box.svg"
                    onClick={() => alert('First Button Clicked!')}
                  >
                    모아보기
                  </Button>

                  {/* 두 번째 버튼 */}
                  <Button
                    variant="default"
                    size="small"
                    text="모아보기"
                    iconUrl="/assets/images/icons/collect-box.svg"
                    onClick={() => alert('Second Button Clicked!')}
                  >
                    모아보기
                  </Button>
                </div>
              </figure>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainSlider;
