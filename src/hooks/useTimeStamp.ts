import { useState, useEffect } from 'react';

// 글 작성시간을 인자로 받아오기
export const useTimeStamp = (timestamp: string) => {
  const [timeAgo, setTimeAgo] = useState('');

  const updateTimeStamp = () => {
    const date = new Date(timestamp);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      setTimeAgo('유효하지 않은 날짜');
      return;
    }

    // 경과한 시간 계산 (1초 = 1000)
    const timeElapsed = Math.floor(
      (new Date().getTime() - date.getTime()) / 1000,
    );

    if (timeElapsed < 60) {
      setTimeAgo(`방금 전`);
    } else if (timeElapsed < 60 * 60) {
      const minutes = Math.floor(timeElapsed / 60);
      setTimeAgo(`${minutes}분 전`);
    } else if (timeElapsed < 60 * 60 * 24) {
      const hours = Math.floor(timeElapsed / (60 * 60));
      setTimeAgo(`${hours}시간 전`);
    } else if (timeElapsed < 60 * 60 * 24 * 7) {
      const days = Math.floor(timeElapsed / (60 * 60 * 24));
      setTimeAgo(`${days}일 전`);
    } else {
      // 일주일 이상 지난 아이템에 대해서는 YYYY-MM-DD로 표기
      const dateString = date.toISOString().slice(0, 10);
      setTimeAgo(dateString);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeAgo;
};
