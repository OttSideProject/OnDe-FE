import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './PostList.module.css';
import DropDown from './DropDown';
import Api from '@/api/core/Api';
import { PostDetailType } from '@/_types/board/board';
import PostListItem from './PostListItem';

interface PostListProps {
  selectedCategoryNumber: number;
}

const PostList: React.FC<PostListProps> = ({ selectedCategoryNumber }) => {
  const [sortBoardText, setsortBoardText] = useState<string>('인기순');
  const [isDropDownClicked, setisDropDownClicked] = useState(false);
  const DropDownMenu: { [key: string]: number } = {
    인기순: 1,
    최신순: 2,
    좋아요순: 3,
  };
  const [isSortDESC, setIsSortDESC] = useState(true);
  const [sortedPostList, setSortedPostList] = useState<PostDetailType[]>([]);

  const getPostList = useCallback(() => {
    console.log(selectedCategoryNumber);
    Api.get(`board/${selectedCategoryNumber}`)
      .then((res) => {
        setSortedPostList(res.data);
        console.log('응답', sortedPostList);
      })
      .catch((err) => console.log('에러', err));
  }, [sortedPostList, selectedCategoryNumber]);

  const handleToggleDropDown = useCallback(() => {
    setisDropDownClicked(!isDropDownClicked);
  }, [isDropDownClicked]);

  const handleSortBoardText = useCallback((text: string) => {
    setsortBoardText(text);
    setisDropDownClicked(false);
  }, []);

  const handleSortDESC = useCallback(() => {
    setIsSortDESC(!isSortDESC);
  }, [isSortDESC]);

  useEffect(() => {
    getPostList();
  }, [selectedCategoryNumber]);

  return (
    <div>
      <div className={styles.sortBoardContainer}>
        <span
          className={styles.sortBoardText}
          onClick={() => handleToggleDropDown()}
        >
          {sortBoardText}
        </span>
        {isSortDESC ? (
          <span onClick={handleSortDESC}>↓</span>
        ) : (
          <span onClick={handleSortDESC}>↑</span>
        )}

        {isDropDownClicked ? (
          <DropDown
            DropDownMenu={DropDownMenu}
            handleSortBoardText={handleSortBoardText}
          ></DropDown>
        ) : null}
      </div>
      <div className={styles.postWrapper}>
        {sortedPostList.map((post, idx) => {
          return <PostListItem key={idx} post={post}></PostListItem>;
        })}
      </div>
      <img
        className={styles.floatButton}
        src="assets/images/icons/post-create-float.svg"
        alt=""
      />
    </div>
  );
};

export default PostList;
