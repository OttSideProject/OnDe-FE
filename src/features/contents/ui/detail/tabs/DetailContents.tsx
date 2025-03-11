'use client';

import Image from 'next/image';
import { DetailData, Section } from '@/_types/contents';
import { Tabs } from '@/features/shared/ui/tabs';
import { ViewMoreButton } from '@/features/shared/ui/view-more';
import { SubHeader } from '@/features/contents/ui/header';
import { SectionSlider } from '@/features/contents/ui/section-list';
import { getDummyData } from '@/entities/contents/main/api/fetchDetailData';
import {
  ageImage,
  getDecade,
  getKoreanContentType,
} from '@/features/shared/utils';
import styles from './DetailContents.module.css';

const DetailContents = ({
  id,
  detailData,
}: {
  id: string;
  detailData: DetailData;
}) => {
  // const [commentsCount, setCommentsCount] = useState(0);
  const dummyData = getDummyData();

  const categories = [
    { label: '상세정보', key: 'info' },
    {
      label: <span>ON생각</span>,
      key: 'comment',
    },
  ];

  // 실제 데이터가 있는 필드는 바로 사용하고, 없는 필드만 더미 데이터 사용
  const detailInfo = `출연: ${
    detailData?.actors?.join(', ') || dummyData.actors?.join(', ')
  }
감독: ${detailData?.director || dummyData.director}
타입: ${getKoreanContentType(detailData.ctype) || dummyData.ctype}
장르: ${detailData.genres.join(', ')}
연대별: ${getDecade(detailData.released)}
러닝타임: ${detailData?.runningTime || dummyData.runningTime}분`;

  const renderDetailInfo = () => (
    <>
      <span>{detailInfo}</span>
      <Image
        src={ageImage(detailData.age, 'detail')}
        alt={`${detailData.age}세 이용가`}
        width={20}
        height={20}
      />
    </>
  );

  const sections: Section[] = [
    {
      id: 1,
      title: detailData.title,
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
      ],
    },
  ];

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'info':
        return (
          <>
            <ViewMoreButton content={renderDetailInfo()} />
            {sections.map((section) => (
              <div key={section.id} className={styles.container}>
                <SubHeader title={`'${section.title}'과(와) 비슷한 작품`} />
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
