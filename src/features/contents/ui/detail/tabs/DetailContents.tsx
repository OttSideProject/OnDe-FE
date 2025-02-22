'use client';
import { useEffect, useState } from 'react';
import { Section } from '@/_types/contents/contents';
import Tabs from '@/features/shared/ui/tabs/Tabs';
import ViewMoreButton from '@/features/shared/ui/view-more/ViewMoreButton';
import SubHeader from '@/features/contents/ui/header/SubHeader';
import SectionSlider from '@/features/contents/ui/section-list/SectionSlider';
import styles from './DetailContents.module.css';

const DetailContents = ({ id }: { id: number }) => {
  let [commentsCount, setCommentsCount] = useState(0);

  commentsCount = 777;

  const categories = [
    { label: '상세정보', key: 'info' },
    {
      label: <span>ON생각</span>,
      key: 'comment',
    },
  ];

  const detailInfo = `출연: 도하석, 김예운, 조윤우, 고민주, 신혜원
					감독: 피트 닥터
					타입: 애니메이션, 영화
					장르: 애니, 모험
					연대별: 2020년대
					러닝타임: 96분
				`;
  const viewIcon = '/assets/images/icons/all-view-icon.svg';

  const sections: Section[] = [
    {
      id: 1,
      title: '인사이드 아웃',
      linkText: '',
      linkUrl: '/contents/recommended',
      sectionSlides: [
        {
          id: 1,
          imgUrl: 'https://picsum.photos/104/156?random=1',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 2,
          imgUrl: 'https://picsum.photos/104/156?random=2',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 3,
          imgUrl: 'https://picsum.photos/104/156?random=3',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 4,
          imgUrl: 'https://picsum.photos/104/156?random=4',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 5,
          imgUrl: 'https://picsum.photos/104/156?random=5',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 6,
          imgUrl: 'https://picsum.photos/104/156?random=1',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 7,
          imgUrl: 'https://picsum.photos/104/156?random=2',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 8,
          imgUrl: 'https://picsum.photos/104/156?random=3',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 9,
          imgUrl: 'https://picsum.photos/104/156?random=4',
          detailUrl: `/contents/detail/${id}`,
        },
        {
          id: 10,
          imgUrl: 'https://picsum.photos/104/156?random=5',
          detailUrl: `/contents/detail/${id}`,
        },
      ],
    },
  ];

  useEffect(() => {
    setCommentsCount(commentsCount);
  }, []);

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'info':
        return (
          <>
            <ViewMoreButton content={detailInfo} viewIcon={viewIcon} />
            {/* SectionSlider */}
            {sections.map((section) => (
              <div key={section.id} className={styles.container}>
                <SubHeader
                  title={`'${section.title}'과(와) 비슷한 작품`}
                  imageTitle={section.title}
                  pageType="contentMain"
                />
                <div className={styles.sliderContainer}>
                  <SectionSlider sectionSlides={section.sectionSlides} />
                </div>
              </div>
            ))}
          </>
        );
      case 'comment':
        return (
          <div className="coming-soon">
            <img
              src="/assets/images/coming-soon-message.png"
              alt="준비중 입니다..."
            />
          </div>
        );
      default:
        return <p>내용이 없습니다.</p>;
    }
  };

  return (
    <Tabs
      categories={categories}
      renderContent={renderContent}
      hasBefore={true}
    />
  );
};

export default DetailContents;
