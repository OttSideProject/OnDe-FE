'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Tabs from '@/components/shared/tabs/Tabs';
import ViewMoreButton from '@/components/shared/view-more/ViewMoreButton';

const DetailContents = () => {
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

  useEffect(() => {
    setCommentsCount(commentsCount);
  }, []);

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'info':
        return (
          <div>
            <ViewMoreButton content={detailInfo} viewIcon={viewIcon} />
          </div>
        );
      case 'comment':
        return (
          <div className="coming-soon">
            <Image
              src="/assets/images/coming-soon.png"
              alt="on생각 준비중"
              sizes="100vw"
              width={500}
              height={670}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        );
      default:
        return <p>내용이 없습니다.</p>;
    }
  };

  return <Tabs categories={categories} renderContent={renderContent} />;
};

export default DetailContents;
