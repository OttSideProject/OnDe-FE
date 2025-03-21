/**
 * 연도를 10년 단위로 변환하는 함수
 * @param year - 연도 문자열 (예: '2016')
 * @returns 10년 단위 문자열 (예: '2010년대')
 */
export const getDecade = (year: string): string => {
  const decade = Math.floor(parseInt(year) / 10) * 10;
  return `${decade}년대`;
};
