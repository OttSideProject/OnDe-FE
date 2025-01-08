'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSections } from '@/__mocks__/helpers/fetchers';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';

/* Components */
import SubHeader from '@/components/contents/header/SubHeader';
import SectionSlider from '@/components/contents/SectionSlider';
import { DimmedBackground } from '@/components/shared/dimmed-background/DimmedBackground';
/* Types */
// import { Section } from '@/_types/contents/contents';
/* Zustand store */
import useDropDownStore from '@/stores/useDropDownStore';
import DropDownOptions from '../shared/action-bar/DropDownOptions';
/* Styles */
import styles from './SectionSliderContainer.module.css';

const id = uuidv4();

// const sections: Section[] = [
//   {
//     id: 1,
//     title: '님이 즐겨찾는 콘텐츠',
//     linkText: '',
//     linkUrl: '/contents/collect-view',
//     sectionSlides: [
//       {
//         id: 1,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 2,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 3,
//         imgUrl: '',
//         detailUrl: '',
//       },
//       {
//         id: 4,
//         imgUrl: '',
//         detailUrl: '',
//       },
//       {
//         id: 5,
//         imgUrl: '',
//         detailUrl: '',
//       },
//       {
//         id: 6,
//         imgUrl: '',
//         detailUrl: '',
//       },
//       {
//         id: 7,
//         imgUrl: '',
//         detailUrl: '',
//       },
//       {
//         id: 8,
//         imgUrl: '',
//         detailUrl: '',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: '소년만화 좋아하시죠?',
//     linkText: '',
//     linkUrl: '/contents/recommend',
//     sectionSlides: [
//       {
//         id: 1,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 2,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 3,
//         imgUrl: 'https://picsum.photos/104/156?random=3',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 4,
//         imgUrl: 'https://picsum.photos/104/156?random=4',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 5,
//         imgUrl: 'https://picsum.photos/104/156?random=5',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 6,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 7,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 8,
//         imgUrl: 'https://picsum.photos/104/156?random=3',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 9,
//         imgUrl: 'https://picsum.photos/104/156?random=4',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 10,
//         imgUrl: 'https://picsum.photos/104/156?random=5',
//         detailUrl: `/contents/detail/${id}`,
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: 'NEW! 따끈따끈한 신작',
//     linkText: '',
//     linkUrl: '/contents/new',
//     sectionSlides: [
//       {
//         id: 1,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 2,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 3,
//         imgUrl: 'https://picsum.photos/104/156?random=3',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 4,
//         imgUrl: 'https://picsum.photos/104/156?random=4',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 5,
//         imgUrl: 'https://picsum.photos/104/156?random=5',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 6,
//         imgUrl: 'https://picsum.photos/104/156?random=6',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 7,
//         imgUrl: 'https://picsum.photos/104/156?random=7',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 8,
//         imgUrl: 'https://picsum.photos/104/156?random=8',
//         detailUrl: `/contents/detail/${id}`,
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: '지금 가장 인기있는 시리즈',
//     linkText: '',
//     linkUrl: '/contents/popular-dramas',
//     sectionSlides: [
//       {
//         id: 1,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 2,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 3,
//         imgUrl: 'https://picsum.photos/104/156?random=3',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 4,
//         imgUrl: 'https://picsum.photos/104/156?random=4',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 5,
//         imgUrl: 'https://picsum.photos/104/156?random=5',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 6,
//         imgUrl: 'https://picsum.photos/104/156?random=6',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 7,
//         imgUrl: 'https://picsum.photos/104/156?random=7',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 8,
//         imgUrl: 'https://picsum.photos/104/156?random=8',
//         detailUrl: `/contents/detail/${id}`,
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: '지금 가장 인기있는 영화',
//     linkText: '',
//     linkUrl: '/contents/popular-movies',
//     sectionSlides: [
//       {
//         id: 1,
//         imgUrl: 'https://picsum.photos/104/156?random=1',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 2,
//         imgUrl: 'https://picsum.photos/104/156?random=2',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 3,
//         imgUrl: 'https://picsum.photos/104/156?random=3',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 4,
//         imgUrl: 'https://picsum.photos/104/156?random=4',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 5,
//         imgUrl: 'https://picsum.photos/104/156?random=5',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 6,
//         imgUrl: 'https://picsum.photos/104/156?random=6',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 7,
//         imgUrl: 'https://picsum.photos/104/156?random=7',
//         detailUrl: `/contents/detail/${id}`,
//       },
//       {
//         id: 8,
//         imgUrl: 'https://picsum.photos/104/156?random=8',
//         detailUrl: `/contents/detail/${id}`,
//       },
//     ],
//   },
// ];

const userName = '디미';

const SectionSliderContainer: React.FC = () => {
  const { isDropDownOpen, openDropDown, closeDropDown } = useDropDownStore();

  const { data: sections, isLoading } = useQuery({ queryKey: ['sections'], queryFn: fetchSections });

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* DropDown이 열려있을 때 DimmedBackground 표시 */}
      {isDropDownOpen && (
        <>
          <DimmedBackground onClick={closeDropDown} />
          <DropDownOptions
            options={options}
            onSelect={handleOptionSelect}
            title="작품 제목"
          />
        </>
      )}
      {/* SectionSlider */}
      {sections?.map((section) => (
        <div key={section.id}>
          {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
          <SubHeader
            title={
              section.id === 1 ? `${userName}${section.title}` : section.title
            }
            linkText={section.linkText}
            linkUrl={section.linkUrl}
          />
          <SectionSlider
            sectionSlides={section.sectionSlides}
            showActionBar={section.id === 1}
          />
        </div>
      ))}
    </div>
  );
};

export default SectionSliderContainer;
