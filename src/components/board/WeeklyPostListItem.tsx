import { PostDetailType, UserInfo } from '@/_types/board/board';
import Api from '@/api/core/Api';
import {
  CommentCountText,
  DirectionWrapper,
  InfoContainer,
  LikeCountText,
  PostContents,
  PostDetailWrapper,
  PostInfoText,
  PostTitle,
  UserInfoText,
  UserName,
  UserProfileImg,
  WeeklyBestPostNumber,
  WeeklyBestPostWrapper,
} from '@/styles/board/main';
import { getTimeAgo } from '@/utils/getTime';
import React, { useCallback, useEffect, useState } from 'react';

interface WeeklyPostListItemProps {
  post: PostDetailType;
  user_idx: number;
  idx: number;
}

const WeeklyPostListItem: React.FC<WeeklyPostListItemProps> = ({
  post,
  user_idx,
  idx,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const getPostUserInfo = useCallback((user_idx: number) => {
    // Api.get(`users/${userId}`, {
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMDAiLCJpYXQiOjE3MjUxOTI4MDEsImV4cCI6MzEyNzY1MTkyODAxfQ.cbcDN4MT2GfmYi6EyqMp1ALgCAEY93isylor4uZTT90',
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
    setUserInfo({
      user_idx: 1,
      userName: '테스터',
      profile_path:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    });
  }, []);

  useEffect(() => {
    getPostUserInfo(user_idx);
  }, []);

  return (
    <WeeklyBestPostWrapper>
      <DirectionWrapper>
        <WeeklyBestPostNumber>{idx + 1}</WeeklyBestPostNumber>
        <PostDetailWrapper>
          <PostTitle>{post.title}</PostTitle>
          <PostContents>{post.contents}</PostContents>
        </PostDetailWrapper>
      </DirectionWrapper>
      <InfoContainer>
        <UserInfoText>
          <UserProfileImg src={userInfo?.profile_path} alt="" />
          <UserName>{userInfo?.userName}</UserName>
          {getTimeAgo(post.createdAt)}
        </UserInfoText>
        <PostInfoText>
          <img src="assets/images/icons/heart-gray.svg" alt="" />
          <LikeCountText> {post.like_count} </LikeCountText>
          <img src="assets/images/icons/message-gray.svg" alt="" />

          {/* FIXME 수정 필요(게시판 좋아요 수 확인 필요) */}
          <CommentCountText>{post.post_views}</CommentCountText>
        </PostInfoText>
      </InfoContainer>
    </WeeklyBestPostWrapper>
  );
};

export default WeeklyPostListItem;
