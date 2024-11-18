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
          <div className={styles.postContents}>
            오늘 이곳은 정말 많은 사람들이 있는데요. 귀성객뿐만 아니라 긴
            연휴기간을 맞아 부산 여행을 하러 온 여행객들도 많고요. 외국인
            관광객도 쉽게 볼 수 있습니다. 오랜만에 찾은 고향, 오랜만에 마주하는
            가족들의 모습에 얼굴에는 미소가 가득합니다. 가족단위 귀성객들이 많이
            보이고, 혼자 오거나 오히려 수도권으로 역귀성을 떠나시는 분들도
            있었습니다.
          </div>
          <div className={styles.postInfo}>
            <img src="assets/images/icons/heart-gray.svg" alt="" />
            <div>{post.like_count}</div>
            <img src="assets/images/icons/message-circle.svg" alt="" />
            {/* FIXME : 댓글 수 추기 */}
            <div>{post.like_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
