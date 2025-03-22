'use server';

import { fetchSearchContents } from '@/shared/api';

export async function getSearchSuggestions(searchTerm: string) {
  const response = await fetchSearchContents({ search: searchTerm });
  if (!response || !response.content) {
    return [];
  }
  return response.content
    .map((item) => item.title)
    .filter((title, index, self) => self.indexOf(title) === index)
    .slice(0, 10); // 최대 10개까지만 표시
}
