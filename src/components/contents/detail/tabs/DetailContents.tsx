'use client';

import Tabs from '@/components/shared/tabs/Tabs';
import ViewMoreButton from '@/components/shared/view-more/ViewMoreButton';

const DetailContents = () => {
  const categories = {
    상세정보: 'info',
    한마디: 'comments',
  };

  const detailInfo = `출연: 도하석, 김예운, 정예원,조윤우, 윤수오, 고민주, 신혜원
					감독: 피트 닥터
					타입: 애니메이션, 영화
					장르: 애니, 모험
					연대별: 2020년대
					러닝타임: 96분
				`;
  const viewIcon = '/assets/images/icons/all-view-icon.svg';

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case '상세정보':
        return (
          <div>
            <ViewMoreButton content={detailInfo} viewIcon={viewIcon} />
          </div>
        );
      case '한마디':
        return (
          <div>
            <p>한마디 내용이 여기에 표시됩니다.</p>
          </div>
        );
      default:
        return <p>내용이 없습니다.</p>;
    }
  };

  return <Tabs categories={categories} renderContent={renderContent} />;
};

export default DetailContents;
