'use client';

import { useState, useCallback } from 'react';

import { TabProps } from '@/_types/contents/contents';

import {
  CategoryWrapper,
  CategoryTitle,
  Container,
  ContentWrapper,
} from './styles';

const Tabs = ({ categories, renderContent }: TabProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].key,
  );

  const handleSelectedCategory = useCallback((key: string) => {
    setSelectedCategory(key);
  }, []);

  return (
    <Container>
      {/* 카테고리 탭 */}
      <CategoryWrapper>
        {categories.map((category, idx) => (
          <CategoryTitle
            key={idx}
            category={category.key} // category 값 전달
            selectedCategory={selectedCategory}
            onClick={() => handleSelectedCategory(category.key)}
          >
            {category.label}
          </CategoryTitle>
        ))}
      </CategoryWrapper>

      {/* 선택한 카테고리의  내용 */}
      <ContentWrapper>{renderContent(selectedCategory)}</ContentWrapper>
    </Container>
  );
};

export default Tabs;
