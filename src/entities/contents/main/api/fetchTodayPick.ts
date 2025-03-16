import { PublicApi, type AxiosResponse, AxiosHeaders } from '@/api/core';
import { TodayPickContent } from '@/_types/contents';

type TodayPickResponse = {
  content: TodayPickContent[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

const getDummyData = (): TodayPickContent[] => [
  {
    contentId: 'C_1450489',
    title: '힙합 에볼루션',
    age: '청불',
    contentImg: 'https://picsum.photos/240/360?random=1',
    genres: ['음악', '사회', '다큐멘터리'],
    rank: 0,
  },
  {
    contentId: 'C_7929532',
    title: '힙합 애프터 파티',
    age: '청불',
    contentImg: 'https://picsum.photos/240/360?random=2',
    genres: ['음악', '코미디'],
    rank: 1,
  },
];

const getResponseData = (
  response: AxiosResponse<TodayPickResponse>,
): AxiosResponse<TodayPickContent[]> => {
  if (!response.data?.content || !Array.isArray(response.data.content)) {
    throw new Error('Invalid response format: content array expected');
  }

  return {
    ...response,
    data: response.data.content.map((item: TodayPickContent) => ({
      ...item,
      // isLoginRequired: item.isLoginRequired ?? false,
      // isVisible: !item.isLoginRequired || !!accessToken,
    })),
  };
};

export const fetchTodayPick = async (): Promise<
  AxiosResponse<TodayPickContent[]>
> => {
  try {
    const response = await PublicApi.post<TodayPickResponse>(
      '/contents/todayPick',
    );
    return getResponseData(response);
  } catch (error) {
    console.error('Error fetching today picks:', error);
    return {
      data: getDummyData(),
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      } as any,
    };
  }
};
