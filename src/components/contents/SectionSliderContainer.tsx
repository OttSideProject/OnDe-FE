'use client';
import { useEffect } from 'react';
/* Components */
import SubHeader from '@/components/contents/header/SubHeader';
import SectionSlider from '@/components/contents/SectionSlider';
import { DimmedBackground } from '@/components/shared/DimmedBackground';
/* Types */
import { Section } from '@/_types/contents/contents';
/* Zustand store */
import useDropDownStore from '@/stores/useDropDownStore';
import DropDownOptions from '../shared/action-bar/DropDownOptions';
/* Styles */
import styles from './SectionSliderContainer.module.css';

const sections: Section[] = [
  {
    id: 1,
    title: '님이 즐겨찾는 콘텐츠',
    linkText: '모아보기 더보기',
    linkUrl: '/contents/collect-view',
    sectionSlides: [
      {
        id: 1,
        imgUrl: 'https://picsum.photos/104/156?random=1',
        detailUrl: '/contents/collect-view/detail/1',
      },
      {
        id: 2,
        imgUrl: 'https://picsum.photos/104/156?random=2',
        detailUrl: '/contents/collect-view/detail/2',
      },
      {
        id: 3,
        imgUrl: '',
        detailUrl: '',
      },
      {
        id: 4,
        imgUrl: '',
        detailUrl: '',
      },
      {
        id: 5,
        imgUrl: '',
        detailUrl: '',
      },
    ],
  },
  {
    id: 2,
    title: '소년만화 좋아하시죠?',
    linkText: '추천 더보기',
    linkUrl: '/contents/recommend',
    sectionSlides: [
      {
        id: 1,
        imgUrl: 'https://picsum.photos/104/156?random=1',
        detailUrl: '/contents/recommend/detail/1',
      },
      {
        id: 2,
        imgUrl: 'https://picsum.photos/104/156?random=2',
        detailUrl: '/contents/recommend/detail/2',
      },
      {
        id: 3,
        imgUrl: 'https://picsum.photos/104/156?random=3',
        detailUrl: '/contents/recommend/detail/3',
      },
      {
        id: 4,
        imgUrl: 'https://picsum.photos/104/156?random=4',
        detailUrl: '/contents/recommend/detail/4',
      },
      {
        id: 5,
        imgUrl: 'https://picsum.photos/104/156?random=5',
        detailUrl: '/contents/recommend/detail/5',
      },
    ],
  },
  {
    id: 3,
    title: 'NEW! 따끈따끈한 신작',
    linkText: '신작 더보기',
    linkUrl: '/contents/new',
    sectionSlides: [
      {
        id: 1,
        imgUrl: 'https://picsum.photos/104/156?random=1',
        detailUrl: '/contents/new/detail/1',
      },
      {
        id: 2,
        imgUrl: 'https://picsum.photos/104/156?random=2',
        detailUrl: '/contents/new/detail/2',
      },
      {
        id: 3,
        imgUrl: 'https://picsum.photos/104/156?random=3',
        detailUrl: '/contents/new/detail/3',
      },
      {
        id: 4,
        imgUrl: 'https://picsum.photos/104/156?random=4',
        detailUrl: '/contents/new/detail/4',
      },
      {
        id: 5,
        imgUrl: 'https://picsum.photos/104/156?random=5',
        detailUrl: '/contents/new/detail/5',
      },
    ],
  },
  {
    id: 4,
    title: '지금 가장 인기있는 시리즈',
    linkText: '드라마 랭킹 더보기',
    linkUrl: '/contents/popular-dramas',
    sectionSlides: [
      {
        id: 1,
        imgUrl: 'https://picsum.photos/104/156?random=1',
        detailUrl: '/contents/popular-dramas/detail/1',
      },
      {
        id: 2,
        imgUrl: 'https://picsum.photos/104/156?random=2',
        detailUrl: '/contents/popular-dramas/detail/2',
      },
      {
        id: 3,
        imgUrl: 'https://picsum.photos/104/156?random=3',
        detailUrl: '/contents/popular-dramas/detail/3',
      },
      {
        id: 4,
        imgUrl: 'https://picsum.photos/104/156?random=4',
        detailUrl: '/contents/popular-dramas/detail/4',
      },
      {
        id: 5,
        imgUrl: 'https://picsum.photos/104/156?random=5',
        detailUrl: '/contents/popular-dramas/detail/5',
      },
    ],
  },
  {
    id: 5,
    title: '지금 가장 인기있는 영화',
    linkText: '영화 랭킹 더보기',
    linkUrl: '/contents/popular-movies',
    sectionSlides: [
      {
        id: 1,
        imgUrl: 'https://picsum.photos/104/156?random=1',
        detailUrl: '/contents/popular-movies/detail/1',
      },
      {
        id: 2,
        imgUrl: 'https://picsum.photos/104/156?random=2',
        detailUrl: '/contents/popular-movies/detail/2',
      },
      {
        id: 3,
        imgUrl: 'https://picsum.photos/104/156?random=3',
        detailUrl: '/contents/popular-movies/detail/3',
      },
      {
        id: 4,
        imgUrl: 'https://picsum.photos/104/156?random=4',
        detailUrl: '/contents/popular-movies/detail/4',
      },
      {
        id: 5,
        imgUrl: 'https://picsum.photos/104/156?random=5',
        detailUrl: '/contents/popular-movies/detail/5',
      },
    ],
  },
];

const userName = '디미';

const SectionSliderContainer: React.FC = () => {
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
    <div className={styles.container}>
      {/* DropDown이 열려있을 때 DimmedBackground 표시 */}
      {isDropDownOpen && (
        <>
          <DimmedBackground onClick={closeDropDown} />
          <DropDownOptions options={options} onSelect={handleOptionSelect} />
        </>
      )}
      {/* SectionSlider */}
      {sections.map((section) => (
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
