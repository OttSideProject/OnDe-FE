'use client';
import styled from '@emotion/styled';

interface CategoryTitleProps {
  selectedCategory: string;
  onClick: () => void;
}

interface WeeklyBestPostWrapperProps {
  isLast: boolean;
}

export const MainPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  min-width: 320px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0px 16px 0px;
  height: 74px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 600;
`;

export const CategoryTitle = styled.div<CategoryTitleProps>`
  cursor: pointer;
  color: ${(props) =>
    props.selectedCategory === props.children ? '#F2F2F2' : '#4F4F4F'};
  border-bottom: ${(props) =>
    props.selectedCategory === props.children
      ? '0.2rem solid #A4E600'
      : '0rem'};
`;

export const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
  padding: 2.4rem 1rem;
  font-size: 18px;
  font-weight: 700;
`;

export const WeeklyBestPostContainer = styled.div`
  display: flex;
  flex-direction: colunm;
  width: 100%;
  font-size: 1.6rem;
`;

export const WeeklyBestPostWrapper = styled.div<WeeklyBestPostWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem 2.4rem 1rem;
  ${(props) =>
    props.isLast &&
    `
    border-bottom: 0.8rem solid #191a18;
    `}
`;

export const DirectionWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const DirectionWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const PostDetailContainer = styled.div`
  width: 100%;
`;

export const PostDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.8rem;
  height: 4rem;
  cursor: pointer;
  gap: 0.4rem;
`;

export const PostTitle = styled.div`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PostContents = styled.div`
  color: #d1d1d1;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.671rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NullPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 18.4rem;
`;

export const WeeklyBestPostNumber = styled.div`
  display: inline;
  color: #bfff00;
  font-weight: 800;
  padding-right: 1rem;
`;

export const UserProfileImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 70%;
  box-sizing: border-box;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #6c6e68;
`;

export const UserInfoText = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const MessegeIcon = styled.img`
  padding: 0.15rem;
`;

export const PostInfoText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const HeartIcon = styled.img`
  padding: 0.15rem;
`;

export const CommentWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
`;

export const LikeWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
`;

export const LikeCountText = styled.div`
  font-weight: 700;
  line-height: 2.4rem;
`;

export const CommentCountText = styled.div`
  font-weight: 700;
  line-height: 2.4rem;
`;
