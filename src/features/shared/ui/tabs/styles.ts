'use client';

import styled from '@emotion/styled';

// props type
export type CategoryTitleStyleProps = {
  selectedCategory: string;
  fontSize?: string;
  category: string;
  onClick: () => void;
};

export type CategoryWrapperStyleProps = {
  hasBefore?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CategoryTitle = styled.button<CategoryTitleStyleProps>`
  font-family: var(--primary-font);
  cursor: pointer;
  font-size: ${(props) => props.fontSize || '1.4rem'};
  color: ${(props) =>
    props.selectedCategory === props.category
      ? 'var(--primary-white)'
      : 'var(--gray400)'};
  border-bottom: ${(props) =>
    props.selectedCategory === props.category
      ? '0.2rem solid var(--primary100)'
      : '0rem'};

`;

export const CategoryWrapper = styled.section<CategoryWrapperStyleProps>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  text-align: center;
  box-sizing: border-box;
  padding: 5px 0px 2px 0px;
  height: 45px;
  line-height: 48px;
  font-size: 16px;
  background-color: var(--primary-black);

  ${(props) =>
    props.hasBefore &&
    `
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1; /* 상단에 배치 */
    width: 100%;
    height: 20px; /* 원하는 높이로 조정 */
    opacity: 0.5;
    background: #aeb685;
    filter: blur(7.5px);
    pointer-events: none; /* 클릭 방지 */
  }
	`}
`;

export const ContentWrapper = styled.section`
  min-height: 212px;
  padding: 20px 0 0;
  font-size: 1.2rem;
  color: var(--gray400);
  line-height: 150%;
`;
