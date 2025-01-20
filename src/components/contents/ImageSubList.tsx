'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionSliderProps } from '@/_types/contents/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ImageSubList.module.css';

const ImageSubList: React.FC<SectionSliderProps> = ({ sectionSlides }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.slider} section-slider`}>
        {sectionSlides.map((sectionSlide, index) => (
          <div key={index}>
            <Link href={sectionSlide.detailUrl} className={styles.cardLink}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSubList;
