'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';

import { BoardSectionSlide } from '@/_types/contents';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './BoardSectionSlider.module.css';
import { SubHeader } from '../header';

export type BoardSectionSliderProps = {
  boardSectionSlides: BoardSectionSlide[];
  getImageSrc?: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const BoardSectionSlider: React.FC<BoardSectionSliderProps> = ({
  boardSectionSlides,
  getImageSrc,
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
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    // initialSlide: 1,
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.slider} board-section-slider`}>
        <SubHeader
          imageTitle="지금 뜨는 ON생각"
          imagePath={
            getImageSrc
              ? getImageSrc('지금 뜨는 ON생각', 'contentMain')
              : '/assets/images/sub_titles/main-board.svg'
          }
          isImageRequired={true}
        />
        <Slider {...settings}>
          {boardSectionSlides.map((boardSectionSlide, postIdx) => (
            <div
              key={postIdx}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Link
                href={`/board/details/${boardSectionSlide.postIdx}`}
                className={styles.cardLink}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <div className={`${styles.slide} `}>
                  {/* <div
                  className={`${styles.slide} ${
                    !boardSectionSlide.imgUrl ? styles.emptySlide : ''
                  }`}
                > */}
                  {
                    // {boardSectionSlide.imgUrl && (
                    <>
                      <div className={styles.userInfo}>
                        {
                          // {boardSectionSlide.profileImg && (
                          <img
                            src={
                              boardSectionSlide.profileImg ||
                              'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'
                            }
                            alt="프로필 이미지"
                          />
                        }
                        <span>
                          {boardSectionSlide.name || `가나${postIdx + 1}`}
                        </span>
                      </div>
                      <div className={styles.contentContainer}>
                        <div>
                          <figure className={styles.imgContainer}>
                            <Image
                              src={
                                boardSectionSlide.imgUrl ||
                                `https://picsum.photos/60/90?random=${postIdx}`
                              }
                              alt={`Slide ${boardSectionSlide.postIdx} ${postIdx}`}
                              width={60}
                              height={90}
                            />
                          </figure>
                          <div className={styles.textContainer}>
                            <h3 className="ellipsis ">
                              {boardSectionSlide.title}
                            </h3>
                            <p className="ellipsis lineclamp">
                              {boardSectionSlide.contents}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.bottomContainer}>
                        <div>
                          <img
                            src="/assets/images/icons/heart-gray.svg"
                            alt="좋아요 아이콘"
                          />
                          <span className={styles.likeCount}>
                            {boardSectionSlide.likeCount}
                          </span>
                        </div>
                        {/* <div>
                          <img
                            src="/assets/images/icons/message-gray-circle.svg"
                            alt="메시지 아이콘"
                          />
                          <span className={styles.messageCount}>
                            {boardSectionSlide.messageCount}
                          </span>
                        </div> */}
                      </div>
                    </>
                  }
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BoardSectionSlider;
