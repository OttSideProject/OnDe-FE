'use client';
import styled from '@emotion/styled';

type CategoryTitleStyleProps = {
  selectedCategory: string;
  onClick: () => void;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0px 16px 0px;
  height: 74px;
  line-height: 48px;
  font-size: 16px;
`;

export const CategoryTitle = styled.div<CategoryTitleStyleProps>`
  cursor: pointer;
  color: ${(props) =>
    props.selectedCategory === props.children
      ? 'var(--primary-white)'
      : 'var(--gray400)'};
  border-bottom: ${(props) =>
    props.selectedCategory === props.children
      ? '0.2rem solid var(--primary100)'
      : '0rem'};
`;

export const ContentWrapper = styled.div`
  min-height: 212px;
  padding: 10px 12px 60px;
  font-size: 1.2rem;
  color: var(--gray400);
  line-height: 150%;
`;
