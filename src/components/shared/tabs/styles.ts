'use client';
import styled from '@emotion/styled';

import { CategoryTitleStyleProps } from '@/_types/contents/contents';

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
  padding: 10px 0px 10px 0px;
  height: 74px;
  line-height: 48px;
  font-size: 16px;
`;

export const CategoryTitle = styled.button<CategoryTitleStyleProps>`
  font-family: var(--primary-font);
  cursor: pointer;
  color: ${(props) =>
    props.selectedCategory === props.category
      ? 'var(--primary-white)'
      : 'var(--gray400)'};
  border-bottom: ${(props) =>
    props.selectedCategory === props.category
      ? '0.2rem solid var(--primary100)'
      : '0rem'};

  span {
    font-family: var(--number-font);
  }
`;

export const ContentWrapper = styled.div`
  min-height: 212px;
  padding: 10px 0 0;
  font-size: 1.2rem;
  color: var(--gray400);
  line-height: 150%;
`;
