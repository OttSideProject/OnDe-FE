export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const years = now.getFullYear() - date.getFullYear();
  const months = now.getMonth() - date.getMonth() + years * 12; // 년도 차이를 고려한 월 수 계산

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 30) return `${days}일 전`;
  if (months < 12) return `${months}달 전`;
  return `${years}년 전`;
};
