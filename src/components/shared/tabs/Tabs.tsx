'use client';

import { useState, useCallback } from 'react';
import {
  CategoryWrapper,
  CategoryTitle,
  Container,
  ContentWrapper,
} from './styles';

/* Tab props type */
type Category = {
  label: string | JSX.Element;
  key: string;
};

type TabProps = {
  categories: Category[]; // 카테고리 목록
  renderContent: (selectedCategory: string) => JSX.Element; // 선택된 카테고리에 따른 렌더링 함수
};

const Tabs = ({
  categories,
  renderContent,
  hasBefore = false,
	fontSize = '1.4rem',
}: TabProps & { hasBefore?: boolean, fontSize?: string } ) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].key,
  );

  const handleSelectedCategory = useCallback((key: string) => {
    setSelectedCategory(key);
  }, []);

  return (
    <Container>
      {/* 카테고리 탭 */}
      <CategoryWrapper hasBefore={hasBefore}>
        {categories.map((category, idx) => (
          <CategoryTitle
            fontSize={fontSize}
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
