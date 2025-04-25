'use client';

import Api from '@/api/core/Api';
import styles from './page.module.css';
import React, { useState } from 'react';
import signup from '@/styles/user/signup';
import { useRouter } from 'next/navigation';

// import './PostCreate.module.css';

const PostCreate = () => {
  const router = useRouter();
  const [boardId, setboradId] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await Api.post(
        `https://api.ondemandia.com/board/create`,
        {
          boardId,
          title,
          contents,
        },
      );
      console.log(response);

      if (response.status === 200) {
        alert('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    }
  };

  return (
    <div className={styles.container}>
      <signup.Header>
        <signup.Close>
          {' '}
          <img
            src="/assets/images/icons/material-symbols_arrow-back-ios-rounded.svg"
            alt="뒤로가기"
            onClick={() => {
              router.back();
            }}
            width={20}
            height={20}
          />
        </signup.Close>
        <signup.HeaderInner>글쓰기</signup.HeaderInner>
        <signup.Close onClick={handleSubmit}>완료</signup.Close>
      </signup.Header>
      <div className={styles.categorySection}>
        <p className={styles.category}>카테고리</p>
        <div className={styles.dropdownWrapper}>
          <select
            className={styles.dropdown}
            value={boardId}
            onChange={(e) => setboradId(e.target.value)}
          >
            <option value="" disabled>
              카테고리를 선택해주세요
            </option>
            <option value="1">ON생각</option>
            <option value="2">ON톡</option>
            {/* <option value="3">QnA</option> */}
          </select>
          <div className={styles.arrowIcon} />
        </div>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <div className={styles.imageContainer}>
          <img
            src="/example-image.jpg"
            alt="Preview"
            className={styles.image}
          />
        </div> */}
        <textarea
          className={styles.textArea}
          placeholder="본문을 작성해 주세요"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
        <div className={styles.flex}>
          <img
            src="/assets/images/icons/camera.svg"
            alt="사진첨부"
            // onClick={handlePrevClick}
            width={20}
            height={20}
          />
          <img
            src="/assets/images/icons/search.svg"
            alt="검색"
            // onClick={handlePrevClick}
            width={20}
            height={20}
          />{' '}
          <img
            src="/assets/images/icons/paperclip.svg"
            alt="검색"
            // onClick={handlePrevClick}
            width={20}
            height={20}
          />
        </div>
        {/* <button className={styles.submitButton} onClick={handleSubmit}>
          제출
        </button> */}
      </div>
    </div>
  );
};

export default PostCreate;
