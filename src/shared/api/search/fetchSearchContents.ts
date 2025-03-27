import {
  PublicApi,
  type AxiosResponse,
  type AxiosError,
  isAxiosError,
} from '@/api/core';
import { SearchContent, SearchContentResponse } from '@/shared/types/contents';

export type FetchSearchParams = {
  search: string;
  id: string;
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
  id,
}: FetchSearchParams): Promise<SearchContentResponse> => {
  try {
    // id가 제공된 경우 해당 ID로 검색 쿼리에 추가
    const queryParams = id 
      ? `search=${encodeURIComponent(search)}&contentId=${id}`
      : `search=${encodeURIComponent(search)}`;
      
    const response = await PublicApi.post<SearchContentResponse>(
      `/contents/search?${queryParams}`,
    );

    console.log('Search response:', response.data);

    return getResponseData(response);
  } catch (error: unknown) {
    console.error('API 호출 중 오류 발생:', error);

    // axios.isAxiosError를 사용한 타입 가드
    if (isAxiosError(error)) {
      // 서버에서 응답이 온 경우 (4xx, 5xx 에러)
      if (error.response) {
        console.error(
          '서버 응답 에러:',
          error.response.status,
          error.response.data,
        );
        throw new Error(
          `Server Error (${error.response.status}): ${JSON.stringify(
            error.response.data,
          )}`,
        );
      }
      // 요청은 보냈지만 응답이 없는 경우
      else if (error.request) {
        console.error('요청은 전송되었지만 응답이 없습니다:', error.request);
        throw new Error('No response received from server.');
      }
      // 요청 설정 중 에러가 발생한 경우
      else {
        console.error('요청 설정 중 오류 발생:', error.message);
        throw new Error(`Request Setup Error: ${error.message}`);
      }
    }
    // Axios 에러가 아닌 경우
    else if (error instanceof Error) {
      console.error('일반 에러:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
    // 알 수 없는 에러 타입
    else {
      console.error('알 수 없는 에러:', error);
      throw new Error('An unknown error occurred');
    }
  }
};
