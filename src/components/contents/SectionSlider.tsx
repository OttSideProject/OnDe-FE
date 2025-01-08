'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';

import ActionBar from '../shared/action-bar/ActionBar';

import { SectionSliderProps } from '@/_types/contents/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SectionSlider.module.css';

const SectionSlider: React.FC<SectionSliderProps> = ({
  sectionSlides,
  showActionBar,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) {
      return;
    }
    const moveX = Math.abs(e.clientX - startX);
    if (moveX > 5) {
      // 마우스를 5px 이상 이동했을 때 드래그로 판단
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    // initialSlide: 2,
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.slider} section-slider`}>
        <Slider {...settings}>
          {sectionSlides.map((sectionSlide, index) => (
            <div
              key={index}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Link
                href={sectionSlide.detailUrl}
                className={styles.cardLink}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <figure
                  className={`${styles.slide} ${
                    !sectionSlide.imgUrl ? styles.emptySlide : ''
                  }`}
                >
                  {sectionSlide.imgUrl && (
                    <Image
                      src={sectionSlide.imgUrl}
                      alt={`Slide ${sectionSlide.id} ${index}`}
                      width={104}
                      height={156}
                    />
                  )}
                </figure>
                {showActionBar && sectionSlide.imgUrl && <ActionBar />}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionSlider;
