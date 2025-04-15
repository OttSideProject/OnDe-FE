import {
  PublicApi,
  type AxiosResponse,
  type AxiosError,
  isAxiosError,
} from '@/api/core';
import { SearchContent } from '@/shared/types/contents/contents';

export type FetchSearchParams = {
  search: string;
  id?: string; // id를 optional로 정의
};

const getResponseData = (
  response: AxiosResponse<SearchContent[]>,
): SearchContent[] => {
  console.log('Response Data:', response.data); // 응답 데이터 로깅

  if (!response.data || !Array.isArray(response.data)) {
    throw new Error('Invalid response format: expected array of SearchContent');
  }

  return response.data;
};

// 콘텐츠 검색 함수
export const fetchSearchContents = async ({
  search,
  id,
}: FetchSearchParams): Promise<SearchContent[]> => {
  try {
    // id가 제공된 경우 해당 ID로 검색 쿼리에 추가
    const queryParams = id
      ? `search=${encodeURIComponent(search)}&contentId=${id}`
      : `search=${encodeURIComponent(search)}`;

    const response = await PublicApi.post<SearchContent[]>(
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
      throw new Error('No response received from server');
    }
    // axios 오류가 아닌 다른 오류
    throw error;
  }
};
