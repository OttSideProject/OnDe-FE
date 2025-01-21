import { useMemo} from 'react';
import { Slide } from '@/_types/contents/contents';

const useCenterTopNumberList = (slides :Slide[]) => {
	const centerTopNumberList = useMemo(() => {
    // 입력 배열이 없거나 비어 있을 때 빈 배열 반환
    if (!Array.isArray(slides) || slides.length === 0) return [];

    // 가장 작은 id 값을 찾음
    const minNumber = Math.min(...slides.map((slide) => slide.id));

    // 가장 작은 슬라이드 찾기
    const minSlide = slides.find((slide) => slide.id === minNumber);
    if (!minSlide) return slides; // 최소값이 없으면 원래 배열 반환

    // 가장 작은 값을 제외한 배열 생성
    const withoutMin = slides.filter((slide) => slide.id !== minNumber);

    // 가운데 위치 계산
    const centerNumber = Math.trunc(slides.length / 2);

    // 배열 재구성
    return [
      ...withoutMin.slice(0, centerNumber), // 가운데 이전 값들
      minSlide, // 가장 작은 값
      ...withoutMin.slice(centerNumber), // 가운데 이후 값들
    ];
  }, [slides]);

	return centerTopNumberList; // 항상 Slide[] 타입을 반환
}

export default useCenterTopNumberList;