// src/entities/contents/main/api/searchContents.ts

import { PublicApi, type AxiosResponse } from '@/api/core';
import { SearchContent, SearchContentResponse } from '@/_types/contents';

export type FetchSearchParams = {
  search: string;
};

const dummyData = (): SearchContent[] => [
  {
    contentId: '1',
    title: '더미 항목 1',
    rank: 1,
    age: '7+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy2'],
    contentImg: 'https://picsum.photos/240/360?random=1',
  },
  {
    contentId: '2',
    title: '더미 항목 2',
    rank: 2,
    age: '19+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=2',
  },
  {
    contentId: '3',
    title: '더미 항목 3',
    rank: 3,
    age: '12+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=3',
  },
];

const getResponseData = (
  response: AxiosResponse<SearchContentResponse>,
): SearchContentResponse => {
  console.log('Response Data:', response.data); // 응답 데이터 로깅

  if (!response.data || !Array.isArray(response.data.content)) {
    throw new Error('Invalid response format: content array expected');
  }

  return {
    ...response,
    content: response.data.content.map((item: SearchContent) => ({
      ...item,
    })),
    page: response.data.page,
  };
};

// 콘텐츠 검색 함수
export const fetchSearchContents = async ({
  search,
}: FetchSearchParams): Promise<SearchContentResponse> => {
  try {
    const response = await PublicApi.post<SearchContentResponse>(
      `/contents/search?search=${encodeURIComponent(search)}`,
    );

    console.log('Search response:', response.data);

    return getResponseData(response);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);

    return {
      content: dummyData(),
      page: {
        size: 50,
        number: 0,
        totalElements: dummyData().length,
        totalPages: 1,
      },
    };
  }
};
