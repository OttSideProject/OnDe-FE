'use client';

import Tabs from '@/components/shared/tabs/Tabs';

const DetailContents = () => {
  const categories = {
    상세정보: 'info',
    한마디: 'comments',
  };

  const renderContent = (selectedCategory: string) => {
    switch (selectedCategory) {
      case '상세정보':
        return (
          <div>
            <p>출연: 도하석, 김예운, 정예원,조윤우, 윤수오, 고민주, 신혜원</p>
            <p>감독: 피트 닥터</p>
            <p>타입: 애니메이션, 영화</p>
            <p>장르: 애니, 모험</p>
            <p>연대별: 2020년대</p>
            <p>러닝타임: 96분</p>
            <img src="/assets/images/icons/all-view-icon.svg" alt="all-view" />
          </div>
        );
      case '한마디':
        return (
          <div>
            <p>한마디 내용이 여기에 표시됩니다.</p>
          </div>
        );
      default:
        return <div>상세정보</div>;
    }
  };

  return <Tabs categories={categories} renderContent={renderContent} />;
};

export default DetailContents;
