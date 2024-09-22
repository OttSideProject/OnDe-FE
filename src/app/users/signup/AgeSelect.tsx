import React from 'react';

const AgeSelectOptions: React.FC = () => {
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  // 1920년부터 현재까지의 연도를 옵션으로 만들어주는 함수
  const generateAgeRangeOptions = (): JSX.Element[] => {
    const currentYear = getCurrentYear();
    const startYear = 1920;
    const options: JSX.Element[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      options.push(
        <option key={year} value={year}>
          {year}년
        </option>,
      );
    }

    options.push(
      <option key="기타" value="기타">
        기타
      </option>,
    );

    return options;
  };

  return <>{generateAgeRangeOptions()}</>;
};

export default AgeSelectOptions;
