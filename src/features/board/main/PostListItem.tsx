import { PostDetailType } from '@/_types/board/board';
import React from 'react';
import styles from './PostListItem.module.css';
import { useTimeStamp } from '@/hooks/useTimeStamp';

interface PostListItemProps {
  post: PostDetailType;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <div className={styles.postWrapper}>
      {/*  FIXME : 임시 이미지 */}
      <div className={styles.imgContainer}>
        <img
          src="https://21gram.blog/wp-content/uploads/2024/02/%EA%B0%95%EC%95%84%EC%A7%80%EC%98%88%EB%B0%A9%EC%A0%91%EC%A2%85%EC%95%88%ED%95%98%EB%A9%B41.jpg"
          alt=""
        />
      </div>

      <div className={styles.postContainer}>
        {/* FIXME : 유저 정보 필요 */}
        <div className={styles.userInfo}>
          <span className={styles.userName}>유저</span>
          <span className={styles.postCreateAt}>
            {useTimeStamp(post.createdAt)}
          </span>
        </div>
        <div className={styles.postContentContainer}>
          <div className={styles.postTitle}>{post.title}</div>
          {/* <div>{post.contents}</div> */}
          <div className={styles.postContents}>{post.contents}</div>
          <div className={styles.postInfo}>
            <img src="assets/images/icons/heart-gray.svg" alt="" />
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                marginRight: '0.6rem',
              }}
            >
              {post.like_count ? post.like_count : 0}
            </div>
            <img src="assets/images/icons/message-circle.svg" alt="" />
            {/* FIXME : 댓글 수 추기 */}
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                marginRight: '0.6rem',
              }}
            >
              {post.like_count ? post.like_count : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
