'use client';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const divStyle = css`
  background-color: #f4f4f4;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: skyblue;
  }
`;

const Header = () => {
  return <div css={divStyle}>Header</div>;
};

export default Header;
