'use client';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Link from 'next/link';

import Header from '@/components/header/Header';

const TestStyle = styled.div`
  li {
    font-size: 20px;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    font-family: Malgun Gothic;
    margin-bottom: 30px;
    margin-top: 10px;
  }
`;

const Main = () => {
  return (
    <>
      <Header />
      <TestStyle>
        메인화면
        <nav>
          <ul>
            <li>
              {' '}
              <Link href="/contents/main">메인화면</Link>{' '}
            </li>
            <li>
              {' '}
              <Link href="/users/signup">회원가입</Link>{' '}
            </li>
            <li>
              {' '}
              <Link href="/users/mypage">마이페이지</Link>{' '}
            </li>
            <li>
              {' '}
              <Link href="/">로그인</Link>{' '}
            </li>
            <li>
              {' '}
              <Link href="/board">게시판</Link>{' '}
            </li>
          </ul>
        </nav>
      </TestStyle>
    </>
  );
};

export default Main;
