'use client';

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
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 2,
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.slider} section-slider`}>
        <Slider {...settings}>
          {sectionSlides.map((sectionSlide, index) => (
            <>
              <Link key={index} href="#" className={styles.cardLink}>
                <figure
                  className={`${styles.slide} ${
                    !sectionSlide.url ? styles.emptySlide : ''
                  }`}
                >
                  {sectionSlide.url && (
                    <Image
                      src={sectionSlide.url}
                      alt={`Slide ${sectionSlide.id} ${index}`}
                      width={104}
                      height={156}
                    />
                  )}
                </figure>
                {showActionBar && sectionSlide.url && <ActionBar />}
              </Link>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionSlider;
