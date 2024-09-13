'use client';

import { PostDetailType } from '@/_types/board/board';
import PostList from '@/components/board/main/PostList';
import WeeklyPostListItem from '@/components/board/main/WeeklyPostListItem';
import {
  MainPageWrapper,
  CategoryWrapper,
  Container,
  BoardTitle,
  CategoryTitle,
  WeeklyBestPostContainer,
  NullPost,
  PostDetailContainer,
} from '@/styles/board/main';
import signup from '@/styles/user/signup';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState('홈');
  const [weeklyBestPost, setWeeklyBestPost] = useState<PostDetailType[]>([]);
  // const [userInfos, setUserInfos] = useState<UserInfo[]>([]);

  const handleSelectedCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const categoryTitle = ['홈', '후기', '자유톡', 'Q&A'].map((title, idx) => {
    return (
      <CategoryTitle
        key={idx}
        selectedCategory={selectedCategory}
        onClick={() => handleSelectedCategory(title)}
      >
        {title}
      </CategoryTitle>
    );
  });

  // FIXME : 선택 카테고리에 따라서 api 요청을 다르게
  const getWeeklyBestPost = useCallback(() => {
    setWeeklyBestPost([
      {
        post_idx: 6,
        user_idx: 1,
        title: '제목입니다',
        contents:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis',
        post_views: 0,
        boardid: 1,
        like_count: 0,
        createdAt: '2024-07-21T13:34:29',
        modifiedAt: '2024-07-21T13:34:29',
      },
      {
        post_idx: 7,
        user_idx: 2,
        title: '제목입니다2',
        contents:
          'Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor.',
        post_views: 0,
        boardid: 1,
        like_count: 0,
        createdAt: '2024-07-21T13:34:29',
        modifiedAt: '2024-07-21T13:34:29',
      },
      {
        post_idx: 7,
        user_idx: 4,
        title: '제목입니다3',
        contents: '본문입니다',
        post_views: 0,
        boardid: 1,
        like_count: 0,
        createdAt: '2024-07-21T13:34:29',
        modifiedAt: '2024-07-21T13:34:29',
      },
    ]);
  }, []);

  useEffect(() => {
    getWeeklyBestPost();
  }, []);

  return (
    <MainPageWrapper>
      <Container>
        <signup.Header>
          <signup.HeaderInner>게시판</signup.HeaderInner>
        </signup.Header>
        <CategoryWrapper>{categoryTitle}</CategoryWrapper>
        <BoardTitle>주간 베스트 글</BoardTitle>
        <WeeklyBestPostContainer>
          {weeklyBestPost.length === 0 ? (
            <NullPost>게시글이 아직 없습니다!</NullPost>
          ) : (
            <PostDetailContainer>
              {weeklyBestPost.map((post, idx) => (
                <WeeklyPostListItem
                  key={idx}
                  post={post}
                  user_idx={post.user_idx}
                  idx={idx}
                ></WeeklyPostListItem>
              ))}
            </PostDetailContainer>
          )}
        </WeeklyBestPostContainer>
        <PostList></PostList>
      </Container>
    </MainPageWrapper>
  );
};

export default page;
