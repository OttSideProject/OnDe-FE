'use server';

import { fetchSearchContents } from '@/shared/api';
import { SearchContent } from '@/shared/types/contents';

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

  const response = await fetchSearchContents({
    search: normalizedSearchTerm,
    id: '',
  });
  if (!response || !response.content) {
    return [];
  }

  // 중복 제거를 위한 Map 사용
  const uniqueItems = new Map<string, SearchSuggestion>();

  response.content.forEach((item: SearchContent) => {
    if (!uniqueItems.has(item.title)) {
      uniqueItems.set(item.title, {
        id: item.contentId,
        title: item.title,
      });
    }
  });

  // Map의 값들을 배열로 변환하고 최대 10개까지만 반환
  return Array.from(uniqueItems.values()).slice(0, 10);
}
