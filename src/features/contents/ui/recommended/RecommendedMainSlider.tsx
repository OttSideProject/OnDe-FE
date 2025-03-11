'use client';

import Image from 'next/image';

import Slider from 'react-slick';

import { RecommendedMainSlide } from '@/_types/contents';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import styles from './RecommendedMainSlider.module.css';
import SubHeader from '../header/SubHeader';

export type RecommendedMainSliderProps = {
  recommendedMainSlides: RecommendedMainSlide[];
};

const RecommendedMainSlider: React.FC<RecommendedMainSliderProps> = ({
  recommendedMainSlides,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    // initialSlide: 1,
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.slider} scrollbar`}>
        <div className={styles.inner}>
          {recommendedMainSlides.map((slide, index) => (
            <div key={index}>
              {slide.imgUrl && (
                <div className={styles.contentContainer}>
                  <figure className={styles.imgContainer}>
                    <Image
                      src={slide.imgUrl}
                      alt={`Slide ${slide.id} ${index}`}
                      width={60}
                      height={90}
                    />
                  </figure>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedMainSlider;
