'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* API */
import { useDropDownStore } from '@/entities/contents/main';

/* Types */
import { OrderContent } from '@/_types/contents';

/* Utils */
import { ageImage } from '@/features/shared/utils/ageImage';

import { useOrderData } from '@/entities/contents/hooks/useOrderData';

/* Components */
import { SubHeader } from '@/features/contents/ui/header';
import { SectionSlider } from '@/features/contents/ui/section-list';
import { DimmedBackground } from '@/features/shared/ui/dimmed-background';
import { DropDownOptions } from '@/features/shared/ui/action-bar';

/* Styles */
import styles from './SectionSliderContainer.module.css';

const userName = '디미';
const recommendedTitle = '예능';
type SectionSliderContainerProps = {
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const SectionSliderContainer: React.FC<SectionSliderContainerProps> = ({
  getImageSrc,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOrderData('최신순');
  const [orderData, setOrderData] = useState<OrderContent[]>([]);
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
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

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
      {/* 섹션 데이터 렌더링 */}
      {/* SectionSlider */}
      {orderData.map((section: OrderContent) => (
        <section key={section.contentId}>
          {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
          <SubHeader
            userName={section.id === 1 ? userName : ''} // userName 사용
            recommendedTitle={section.id === 2 ? recommendedTitle : ''} // recommendedTitle 사용
            imageTitle={section.title} // 항상 section.title을 사용
            imagePath={getImageSrc(section.title, 'contentMain')}
            linkText={section.linkText}
            linkUrl={section.linkUrl}
            isImageRequired={true} // contentMain 페이지는 항상 이미지가 필수
          />
          <SectionSlider
            sectionSlides={section.sectionSlides}
            showActionBar={section.id === 1}
          />
        </section>
      ))}
      {/* 로딩 및 감지 영역 */}
      <div ref={ref} />
    </section>
  );
};

export default SectionSliderContainer;
