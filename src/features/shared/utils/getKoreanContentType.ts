/**
 * 콘텐츠 타입을 영문에서 한글로 변환하는 매핑
 */
const contentTypeMap: Record<string, string> = {
  movie: '영화',
  drama: '드라마',
  documentary: '다큐멘터리',
  series: '시리즈',
  entertainment: '예능',
  animation: '애니메이션',
};

/**
 * 콘텐츠 타입 문자열을 영문에서 한글로 변환
 * @param type - 영문 콘텐츠 타입 (쉼표로 구분된 문자열 가능)
 * @returns 한글로 변환된 콘텐츠 타입
 * @example
 * getKoreanContentType('movie') // '영화'
 * getKoreanContentType('documentary, series') // '다큐멘터리, 시리즈'
 */
export const getKoreanContentType = (type: string): string => {
  return type
    .split(',')
    .map((t) => contentTypeMap[t.trim().toLowerCase()] || t.trim())
    .join(', ');
};
