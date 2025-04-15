'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* API */
import { useDropDownStore } from '@/entities/contents/main';

/* Types */
import { OrderContent } from '@/shared/types/contents';

/* Utils */
import { ageImage } from '@/shared/utils/ageImage';

import { useOrderData } from '@/entities/contents/hooks'; // 주석 해제

/* Components */
import { SubHeader } from '@/features/contents/ui/header';
import { SectionSlider } from '@/features/contents/ui/section-list';
import { DimmedBackground } from '@/shared/ui/dimmed-background';
import { DropDownOptions } from '@/shared/ui/action-bar';

/* Styles */
import styles from './SectionSliderContainer.module.css';

const userName = '디미';
const recommendedTitle = '예능';
type SectionSliderContainerProps = {
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
  latestContent: OrderContent[];
  popularContent: OrderContent[];
};

const SectionSliderContainer: React.FC<SectionSliderContainerProps> = ({
  getImageSrc,
  latestContent,
  popularContent,
}) => {
  const latestOrderQuery = useOrderData('최신순');
  const popularOrderQuery = useOrderData('인기순');

  const { ref, inView } = useInView();
  const { isDropDownOpen, openDropDown, closeDropDown } = useDropDownStore();

  useEffect(() => {
    if (isDropDownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDropDownOpen]);

  useEffect(() => {
    if (inView && latestOrderQuery.hasNextPage) {
      latestOrderQuery.fetchNextPage();
    }
  }, [inView, latestOrderQuery]);

  const options = [
    { id: 1, label: '에피소드 및 정보', url: '/assets/images/icons/info.svg' },
    { id: 2, label: '모아보기', url: '/assets/images/icons/collect-box.svg' },
    {
      id: 3,
      label: '모아보기 삭제',
      url: '/assets/images/icons/iconamoon_close-light.svg',
    },
    { id: 4, label: '에피소드 및 정보', url: '/assets/images/icons/info.svg' },
    { id: 5, label: '모아보기', url: '/assets/images/icons/collect-box.svg' },
    {
      id: 6,
      label: '모아보기 삭제',
      url: '/assets/images/icons/iconamoon_close-light.svg',
    },
    { id: 7, label: '에피소드 및 정보', url: '/assets/images/icons/info.svg' },
    { id: 8, label: '모아보기', url: '/assets/images/icons/collect-box.svg' },
    {
      id: 9,
      label: '모아보기 삭제',
      url: '/assets/images/icons/iconamoon_close-light.svg',
    },
  ];

  const handleOptionSelect = (id: number) => {
    console.log('선택된 옵션:', id, options[id - 1].label);
    closeDropDown();
  };

  return (
    <section className={styles.container}>
      {/* DropDown이 열려있을 때 DimmedBackground 표시 */}
      {isDropDownOpen && (
        <>
          <DimmedBackground onClick={closeDropDown} />
          <DropDownOptions
            options={options}
            onSelect={handleOptionSelect}
            title="작품 제목"
            height={300}
            isPositioned
          />
        </>
      )}

      {/* 최신순 섹션 */}
      <section>
        <SubHeader
          imageTitle="NEW! 따끈따끈한 신작"
          imagePath={getImageSrc('NEW! 따끈따끈한 신작', 'contentMain')}
          isImageRequired={true}
        />
        <SectionSlider content={latestContent} showActionBar={false} />
      </section>

      {/* 인기순 섹션 */}
      <section>
        <SubHeader
          imageTitle="지금 가장 인기있는 영화"
          imagePath={getImageSrc('지금 가장 인기있는 영화', 'contentMain')}
          isImageRequired={true}
        />
        <SectionSlider content={popularContent} showActionBar={false} />
      </section>

      {/* 로딩 및 감지 영역 */}
      <div ref={ref} />
    </section>
  );
};

export default SectionSliderContainer;
