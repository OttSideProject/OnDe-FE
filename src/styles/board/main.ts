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
  font-size: 16px;
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
  box-sizing: border-box;
  padding-left: 10px;
  height: 39px;
  line-height: 39px;
  font-size: 16px;
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
  padding: 1.3rem 1rem 1.3rem 1rem;
  border-bottom: 0.1rem solid #212121;
  ${(props) =>
    props.isLast &&
    `
    border-bottom: 1rem solid #212121;
    `}
`;

export const DirectionWrapper = styled.div`
  display: flex;
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
  padding-top: 0.7rem;
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
  font-weight: 700;
  line-height: 1.909rem;
  padding: 1rem 1rem 1rem 0rem;
`;

export const UserProfileImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 70%;
  box-sizing: border-box;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #6d6d6d;
  box-sizing: border-box;
  padding: 1rem 0 0 2rem;
`;

export const UserName = styled.div`
  margin: 0 0.6rem 0 0.6rem;
`;

export const UserInfoText = styled.div`
  display: flex;
`;
export const PostInfoText = styled.div`
  display: flex;
  line-height: 1.432rem;
`;

export const LikeCountText = styled.div`
  margin: 0.1rem 0.4rem 0.1rem 0.4rem;
`;

export const CommentCountText = styled.div`
  margin: 0.1rem 0.4rem 0.1rem 0.4rem;
`;
