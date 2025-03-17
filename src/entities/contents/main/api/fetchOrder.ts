// fetchOrder.ts
import { PublicApi, type AxiosResponse } from '@/api/core';
import { OrderContent, OrderResponse } from '@/_types/contents';

export type FetchOrderParams = {
  order: string;
  nowPage: number;
  pageCount: number;
};

const dummyData = (): OrderContent[] => [
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
  response: AxiosResponse<OrderResponse>,
): OrderResponse => {
  if (!response.data?.content || !Array.isArray(response.data.content)) {
    throw new Error('Invalid response format: content array expected');
  }

  return {
    ...response,
    content: response.data.content.map((item: OrderContent) => ({
      ...item,
    })),
    page: response.data.page,
  };
};

export const fetchOrder = async ({
  order,
  nowPage = 0,
  pageCount = 20,
}: FetchOrderParams): Promise<OrderResponse> => {
  try {
    const response = await PublicApi.post<OrderResponse>(
      `/contents/category?order=${encodeURIComponent(
        order,
      )}&nowPage=${nowPage}&pageCount=${pageCount}`,
    );
    console.log('Order response:', response.data);

    return getResponseData(response);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);

    return {
      content: dummyData(),
      page: {
        size: 20,
        number: 0,
        totalElements: dummyData().length,
        totalPages: 1,
      },
    };
  }
};
