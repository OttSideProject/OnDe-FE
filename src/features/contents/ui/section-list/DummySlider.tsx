'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Slider from 'react-slick';

import { SectionSlide } from '@/shared/types/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SectionSlider.module.css';

const DummySlider: React.FC<{
  sections: SectionSlide[];
}> = ({ sections }) => {
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

  const router = useRouter();

  const goLink = (id: string) => {
    router.push(`/contents/detail/${id}`);
  };

  return (
    <article className={styles.container}>
      <div className={`${styles.slider} section-slider`}>
        <Slider {...settings}>
          {sections.map((sectionSlide, index) => (
            <div
              key={index}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* <button
                type="button"
                className={styles.cardLink}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                  goLink(sectionSlide.id.toString());
                }}
              > */}
              <div className={styles.cardLink}>
                <figure className={styles.slide}>
                  <Image
                    src={`https://picsum.photos/375/375?random=${sectionSlide.id}`}
                    alt={`Slide ${sectionSlide.id}`}
                    width={105}
                    height={155}
                  />
                </figure>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </article>
  );
};

export default DummySlider;
