'use client';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const DivStyle = styled.div`
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
