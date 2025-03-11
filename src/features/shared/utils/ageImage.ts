export const ageImage = (
  age: string,
  category: 'detail' | 'shared',
): string => {
  const ageMap: Record<string, Record<string, string>> = {
    detail: {
      all: '/assets/images/ott_ages/detail-all.svg',
      '7+': '/assets/images/ott_ages/detail-pg-7.svg',
      '12+': '/assets/images/ott_ages/detail-pg-12.svg',
      '15+': '/assets/images/ott_ages/detail-pg-15.svg',
      청불: '/assets/images/ott_ages/detail-adults.svg',
    },
    shared: {
      all: '/assets/images/ott_ages/all.svg',
      '7+': '/assets/images/ott_ages/pg-7.svg',
      '12+': '/assets/images/ott_ages/pg-12.svg',
      '15+': '/assets/images/ott_ages/pg-15.svg',
      청불: '/assets/images/ott_ages/adults.svg',
    },
  };

  return ageMap[category][age] || ageMap.shared.all; // 기본 이미지 설정
};
