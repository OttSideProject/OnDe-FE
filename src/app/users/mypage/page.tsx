'use client';

import React, { useEffect, useState } from 'react';
import styles from './mypage.module.css';

const Setting = '/assets/images/icons/setting_icon.svg';
const Edit = '/assets/images/icons/edit_icon.png';
const Alert = '/assets/images/icons/alert_icon.svg';

interface Genre {
  genreId: number;
  genreName: string;
  thumbnail: string; // 영화 썸네일 이미지 추가
}

interface Post {
  id: number;
  user: string;
  userPhoto: string;
  category: string;
  title: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
}

// interface UserProfile {
//   name: string;
//   avatar: string;
//   followers: number;
//   following: number;
// }

const userId = localStorage.getItem('userId');

// const avatarOptions = [
//   "profile-angry.png",
//   "profile-dizzy.png",
//   "profile-girl.png",
//   "profile-glasses.png",
// ];

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};


const getAvatarFromCookie = () => {
  let avatar = getCookie("userAvatar");
  // if (!avatar) {
  //   // 쿠키에 없으면 랜덤으로 선택 후 쿠키에 저장
  //   avatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
  //   setCookie("userAvatar", avatar);
  // }
  // 제대로 경로를 반환하도록 수정
  return `/assets/images/${avatar}`;
};



const mockGenres: Genre[] = [
  {
    genreId: 1,
    genreName: '더 인플루언서',
    thumbnail: 'https://picsum.photos/240/360?random=2',
  },
  {
    genreId: 2,
    genreName: '귀공자',
    thumbnail: 'https://picsum.photos/240/360?random=3',
  },
  {
    genreId: 3,
    genreName: '에일리언',
    thumbnail: 'https://picsum.photos/240/360?random=4',
  },
  {
    genreId: 4,
    genreName: '더 인플루언서',
    thumbnail: 'https://picsum.photos/240/360?random=5',
  },
  {
    genreId: 5,
    genreName: '귀공자',
    thumbnail: 'https://picsum.photos/240/360?random=6',
  },
  {
    genreId: 6,
    genreName: '에일리언',
    thumbnail: 'https://picsum.photos/240/360?random=7',
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    user: '테스터1',
    userPhoto: 'https://picsum.photos/240/360?random=7',
    category: '배우',
    title: '베놈 들을 하다 미친고임???',
    content: '넌 정말 잘생겼고 그래, 인생의 진리...',
    time: '방금전',
    likes: 27,
    comments: 110,
  },
  {
    id: 2,
    user: '테스터1',
    userPhoto: 'https://picsum.photos/240/360?random=7',
    category: '영화',
    title: '이번 마블 그냥 그런 거 같던데',
    content: '그냥 내 생각 그냥 내 생각 그냥 내 생각...',
    time: '1시간전',
    likes: 27,
    comments: 110,
  },
  {
    id: 3,
    user: '테스터1',
    userPhoto: 'https://picsum.photos/240/360?random=7',
    category: '영화',
    title: '다크나이트는 언제봐도 명작임.',
    content: '선의 기준이 무엇인가...',
    time: '답글전',
    likes: 27,
    comments: 110,
  },
];

const MyPage: React.FC = () => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar(getAvatarFromCookie());
  }, []);

  const mockUser = {
    name: userId,
    avatar: avatar,
    followers: 0,
    following: 0,
  };

  
  const [activeTab, setActiveTab] = useState<'collection' | 'board'>(
    'collection',
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerName}>{userId}</span>
        <div className={styles.icons}>
          <span>
            <img src={Alert} />
          </span>
          <span>
            {' '}
            <img src={Setting} />
          </span>
        </div>
      </header>

      <div className={styles.profileSection}>
        <div className={styles.profileSectionSmall}>
          <img src={mockUser.avatar} alt="프로필" className={styles.avatar} />
          <img src={Edit} className={styles.editIcon}></img>
          <div className={styles.stats}>
            <div>
              <span className={styles.statNumber}>{mockUser.followers}</span>
              <span>팔로워</span>
            </div>
            <div>
              <span className={styles.statNumber}>{mockUser.following}</span>
              <span>팔로잉</span>
            </div>
          </div>
        </div>
        <h2 className={styles.userName}>{mockUser.name}</h2>
      </div>
      <div className={styles.tabMenu}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'collection' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('collection')}
        >
          모아보기
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'board' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('board')}
        >
          ON생각
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'collection' && (
          <div className={styles.collectionTab}>
            <div className={styles.movieList}>
              {mockGenres.map((genre) => (
                <div key={genre.genreId} className={styles.movieCard}>
                  <img
                    src={genre.thumbnail}
                    alt={genre.genreName}
                    className={styles.movieThumbnail}
                  />
                  <div className={styles.movieInfo}>
                    <span className={styles.movieTitle}>{genre.genreName}</span>
                    <span className={styles.movieCategory}>
                      서바이벌 · 시리즈
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'board' && (
          <div className={styles.boardTab}>
            {mockPosts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <span className={styles.category}>{post.category}</span>
                  <h3 className={styles.title}>{post.title}</h3>
                </div>
                <p className={styles.content}>{post.content}</p>
                <div className={styles.postFooter}>
                  <span className={styles.time}>
                    <img
                      src={post.userPhoto}
                      alt="프로필"
                      className={styles.userPhoto}
                    />
                    <p>{post.user}</p>
                    <p>{post.time}</p>
                  </span>
                  <div className={styles.reactions}>
                    <span>♥ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
