'use client';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const DivStyle = styled.div`
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
  return <DivStyle>Header</DivStyle>;
};

export default Header;
