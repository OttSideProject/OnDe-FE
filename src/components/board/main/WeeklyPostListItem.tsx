import { PostDetailType, UserInfo } from '@/_types/board/board';
import Api from '@/api/core/Api';
import { useTimeStamp } from '@/hooks/useTimeStamp';
import {
  CommentCountText,
  CommentWrapper,
  DirectionWrapper,
  DirectionWrapper2,
  HeartIcon,
  InfoContainer,
  LikeCountText,
  LikeWrapper,
  MessegeIcon,
  PostContents,
  PostDetailWrapper,
  PostInfoText,
  PostTitle,
  UserInfoText,
  UserProfileImg,
  WeeklyBestPostNumber,
  WeeklyBestPostWrapper,
} from '@/styles/board/main';
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
    <WeeklyBestPostWrapper isLast={idx == 2}>
      <DirectionWrapper>
        <WeeklyBestPostNumber>{idx + 1}</WeeklyBestPostNumber>
        <DirectionWrapper2>
          <PostDetailWrapper>
            <PostTitle>{post.title}</PostTitle>
            <PostContents>{post.contents}</PostContents>
          </PostDetailWrapper>
          <InfoContainer>
            <UserInfoText>
              <UserProfileImg src={userInfo?.profile_path} alt="" />
              <div>{userInfo?.userName}</div>
              <div>{useTimeStamp(post.createdAt)}</div>
            </UserInfoText>
            <PostInfoText>
              <CommentWrapper>
                <MessegeIcon
                  src="assets/images/icons/message-circle.svg"
                  alt=""
                />
                {/* FIXME 수정 필요(게시판 댓글 수 확인 필요) */}
                <CommentCountText>{post.post_views}</CommentCountText>
              </CommentWrapper>
              <LikeWrapper>
                <HeartIcon src="assets/images/icons/heart-gray.svg" alt="" />
                <LikeCountText> {post.like_count} </LikeCountText>
              </LikeWrapper>
            </PostInfoText>
          </InfoContainer>
        </DirectionWrapper2>
      </DirectionWrapper>
    </WeeklyBestPostWrapper>
  );
};

export default WeeklyPostListItem;
