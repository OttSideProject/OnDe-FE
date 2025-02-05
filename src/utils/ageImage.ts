export const ageImage = (age: string): string => {
  const ageMap: Record<string, string> = {
    all: '/assets/images/ott_ages/all.svg',
    // '12+': '/assets/images/ott_ages/pg-12.svg',
    '15+': '/assets/images/ott_ages/pg-15.svg',
    '18+': '/assets/images/ott_ages/adults.svg',
  };

  return ageMap[age] || '/images/ott_ages/all.svg'; // 기본 이미지 설정
};
