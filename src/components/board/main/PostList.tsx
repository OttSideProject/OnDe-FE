import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './PostList.module.css';
import DropDown from './DropDown';
import Api from '@/api/core/Api';

const PostList = () => {
  const [sortBoardText, setsortBoardText] = useState<string>('인기순');
  const [isDropDownClicked, setisDropDownClicked] = useState(false);
  const DropDownMenu: { [key: string]: number } = {
    인기순: 1,
    최신순: 2,
    좋아요순: 3,
  };
  const [isSortDESC, setIsSortDESC] = useState(true);
  const [sortedPostList, setSortedPostList] = useState([]);

  const getPostList = useCallback(() => {
    const curSortBoardText = DropDownMenu[sortBoardText];
    Api.get(`board/${curSortBoardText}`)
      .then((res) => {
        setSortedPostList(res.data);
        console.log(sortedPostList);
      })
      .catch((err) => console.log(err));
  }, [sortedPostList, sortBoardText]);

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
  }, [sortBoardText]);

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
    </div>
  );
};

export default PostList;
