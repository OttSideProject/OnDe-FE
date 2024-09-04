'use client';

import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';
import Button from '../shared/button-group/Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SectionSlider.module.css';

/* 슬라이드를 위한 타입 */
export type SectionSlide = {
  id: number;
	url: string;
};

/* 슬라이더 컴포넌트를 위한 타입 */
export type SectionSliderProps = {
	sectionSlides: SectionSlide[];
}

const SectionSlider: React.FC<SectionSliderProps> = ({ sectionSlides }) => {
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
            <Link
              key={index}
              href={sectionSlide.url}
              className={styles.cardLink}
            >
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
                <div
                  className={styles.btnContainer}
                  style={{ display: 'none' }}
                >
                  {/* 첫 번째 버튼 */}
                  <Button
                    variant="primary"
                    size="small"
                    text="First Button"
                    onClick={() => alert('First Button Clicked!')}
                  >
                    First Button
                  </Button>

                  {/* 두 번째 버튼 */}
                  <Button
                    variant="secondary"
                    size="small"
                    text="Second Button"
                    onClick={() => alert('Second Button Clicked!')}
                  >
                    Second Button
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

export default SectionSlider;
