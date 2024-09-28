'use client';

import { useState, useCallback } from 'react';

import { TabProps } from '@/_types/contents/contents';

import {
  CategoryWrapper,
  CategoryTitle,
  Container,
	ContentWrapper,
} from './styles'; // 기존 스타일 임포트


const Tabs = ({ categories, renderContent }: TabProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(categories)[0],
  );

  const handleSelectedCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <Container>
      {/* 카테고리 탭 */}
      <CategoryWrapper>
        {Object.keys(categories).map((category, idx) => (
          <CategoryTitle
            key={idx}
            selectedCategory={selectedCategory}
            onClick={() => handleSelectedCategory(category)}
          >
            {category}
          </CategoryTitle>
        ))}
      </CategoryWrapper>

      {/* 선택한 카테고리의  내용 */}
      <ContentWrapper>
        {renderContent(selectedCategory)}
      </ContentWrapper>
    </Container>
  );
};

export default Tabs;
