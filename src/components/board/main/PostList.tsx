import React, { useCallback, useEffect, useState } from 'react';
import styles from './PostList.module.css';
import DropDown from './DropDown';
import { useRouter } from 'next/navigation';
import Api from '@/api/core/Api';

import { PostDetailType } from '@/_types/board/board';
import PostListItem from './PostListItem';

interface PostListProps {
  selectedCategoryNumber: number;
}

const PostList: React.FC<PostListProps> = ({ selectedCategoryNumber }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [sortBoardText, setsortBoardText] = useState<string>('인기순');
  const [isDropDownClicked, setisDropDownClicked] = useState(false);
  const DropDownMenu: { [key: string]: number } = {
    최신순: 2,
    좋아요순: 3,
    인기순: 1,
  };
  const [isSortDESC, setIsSortDESC] = useState(true);

  const [sortedPostList, setSortedPostList] = useState<PostDetailType[]>([]);

  const getPostList = useCallback(() => {
    Api.get(`board/category`, {
      params: {
        boardId: selectedCategoryNumber,
        type: DropDownMenu[sortBoardText],
        nowPage: 0,
        pageSize: 10,
      },
    })
      .then((res) => {
        if (res.data && res.data && Array.isArray(res.data.content)) {
          setSortedPostList(res.data.content);
        } else {
          console.log('응답 데이터가 예상과 다릅니다:', res.data);
        }
      })
      .catch((err) => console.log('에러', err));
  }, [selectedCategoryNumber, sortBoardText]);

  const handleToggleDropDown = useCallback(() => {
    setisDropDownClicked((prev) => !prev);
  }, []);

  const handleSortBoardText = useCallback((text: string) => {
    setsortBoardText(text);
    setisDropDownClicked(false);
  }, []);

  const handleSortDESC = () => {
    setIsSortDESC((prev) => !prev);
  };

  useEffect(() => {
    getPostList();
  }, [selectedCategoryNumber, getPostList]);

  const navigateToPostCreation = () => {
    if (isClient) {
      router.push('/board/create');
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          padding: '1rem',
        }}
      >
        <img
          src="assets/images/icons/sort.svg"
          alt=""
          onClick={navigateToPostCreation}
        />
        <span className={styles.sortBoardText} onClick={handleToggleDropDown}>
          {sortBoardText}
        </span>
        {/* {isSortDESC ? (
          <span onClick={handleSortDESC}>↓</span>
        ) : (
          <span onClick={handleSortDESC}>↑</span>
        )} */}
      </div>
      <div className={styles.sortBoardContainer}>
        {isDropDownClicked && (
          <DropDown
            DropDownMenu={DropDownMenu}
            handleSortBoardText={handleSortBoardText}
            selectedSort={sortBoardText}
          />
        )}
      </div>
      <div className={styles.postWrapper}>
        {Array.isArray(sortedPostList) && sortedPostList.length > 0 ? (
          sortedPostList.map((post, idx) => (
            <PostListItem key={idx} post={post} />
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </div>
      <img
        className={styles.floatButton}
        src="assets/images/icons/post-create-float.svg"
        alt=""
        onClick={navigateToPostCreation}
      />
    </div>
  );
};

export default PostList;
