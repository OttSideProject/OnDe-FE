'use client';

import { PostDetailType } from '@/_types/board/board';
import PostList from '@/components/board/main/PostList';
import WeeklyPostListItem from '@/components/board/main/WeeklyPostListItem';
import Api from '@/api/core/Api';
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
import React, { useCallback, useEffect, useState } from 'react';

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('홈');
  const [weeklyBestPost, setWeeklyBestPost] = useState<PostDetailType[]>([]);

  const categoryTitle: { [key: string]: number } = {
    홈: 1,
    후기: 1,
    토크On: 1,
    'Q&A': 1,
  };

  const handleSelectedCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const categoryTitleMemo = Object.keys(categoryTitle).map((title, idx) => {
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

  const getWeeklyBestPost = useCallback(() => {
    //  setLoading(true);
    const boardId = categoryTitle[selectedCategory];
    Api.get(`/board/${boardId}`)
      .then((response) => {
        const sortedPosts = response.data
          .sort((a: PostDetailType, b: PostDetailType) => {
            const likeDiff = b.like_count - a.like_count;
            if (likeDiff !== 0) return likeDiff;
            return b.post_views - a.post_views;
          })
          .slice(0, 3);
        setWeeklyBestPost(sortedPosts);
      })
      .catch((error) => {
        console.error('Error fetching weekly best posts:', error);
        setWeeklyBestPost([]);
      })
      .finally(() => {
        //  setLoading(false);
      });
  }, [selectedCategory, categoryTitle]);
  useEffect(() => {
    getWeeklyBestPost();
  }, [getWeeklyBestPost]);

  return (
    <MainPageWrapper>
      <Container>
        <signup.Header>
          <signup.HeaderInner>게시판</signup.HeaderInner>
        </signup.Header>
        <CategoryWrapper>{categoryTitleMemo}</CategoryWrapper>
        <BoardTitle>🏅Weekly Best</BoardTitle>
        <WeeklyBestPostContainer>
          {weeklyBestPost.length === 0 ? (
            <NullPost>게시글을 기다려주세요!</NullPost>
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
        <PostList
          selectedCategoryNumber={categoryTitle[selectedCategory]}
        ></PostList>
      </Container>
    </MainPageWrapper>
  );
};

export default page;
