'use server';

import { fetchSearchContents } from '@/shared/api';

// 검색 제안 결과 타입 정의
export type SearchSuggestion = {
  id: string;
  title: string;
};

export async function getSearchSuggestions(
  searchTerm: string,
): Promise<SearchSuggestion[]> {
  // 검색어 전처리: 앞뒤 공백 제거 및 연속된 공백을 하나로 통일
  const normalizedSearchTerm = searchTerm.trim().replace(/\s+/g, ' ');

  try {
    const response = await fetchSearchContents({
      search: normalizedSearchTerm,
      id: '',
    });
    
    if (!response || !Array.isArray(response)) {
      console.error('검색 제안 응답이 유효하지 않습니다:', response);
      return [];
    }

    // 중복 제거를 위한 Map 사용
    const uniqueItems = new Map<string, SearchSuggestion>();

    response.forEach((item) => {
      if (!uniqueItems.has(item.title)) {
        uniqueItems.set(item.title, {
          id: item.contentId,
          title: item.title,
        });
      }
    });

    // Map의 값들을 배열로 변환하고 최대 10개까지만 반환
    return Array.from(uniqueItems.values()).slice(0, 10);
  } catch (error) {
    console.error('검색 제안을 가져오는 중 오류 발생:', error);
    return [];
  }
}
