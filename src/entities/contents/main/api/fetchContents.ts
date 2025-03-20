// src/entities/contents/main/api/fetchContents.ts

import { PublicApi, type AxiosResponse } from '@/api/core';
import { ContentType, ContentTypeResponse } from '@/_types/contents';

export type FetchContentTypeCategoryParams = {
  type: string;
  nowPage?: number;
  pageSize?: number;
};

const dummyData = (): ContentType[] => [
  {
    contentId: '1',
    title: '더미 항목 1',
    rank: 1,
    age: '7+',
    ageImage: null,
    category: 'shared',
    type: 'movie',
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
    type: 'drama',
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
    type: 'enter',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=3',
  },
];

const getResponseData = (
  response: AxiosResponse<ContentTypeResponse>,
): ContentTypeResponse => {
  if (!response.data?.content || !Array.isArray(response.data.content)) {
    throw new Error('Invalid response format: content array expected');
  }

  return {
    ...response,
    content: response.data.content.map((item: ContentType) => ({
      ...item,
    })),
    page: response.data.page,
  };
};

export const fetchContents = async ({
  type,
  nowPage = 0,
  pageSize = 50,
}: FetchContentTypeCategoryParams): Promise<ContentTypeResponse> => {
  try {
    const response = await PublicApi.post<ContentTypeResponse>(
      `/contents/type?type=${encodeURIComponent(
        type,
      )}&nowPage=${nowPage}&pageSize=${pageSize}`,
    );
    console.log('Content response:', response.data);

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
