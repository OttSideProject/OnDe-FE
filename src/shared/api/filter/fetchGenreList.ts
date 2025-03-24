import {
  PublicApi,
  type AxiosResponse,
  type AxiosError,
  isAxiosError,
} from '@/api/core';

import { GenreListResponse } from '@/shared/types/contents';

export const fetchGenreList = async (): Promise<GenreListResponse> => {
  try {
    const response: AxiosResponse<GenreListResponse> =
      await PublicApi.post<GenreListResponse>('/contents/genreList');
    console.log('장르 목록:', response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.message;
      console.error('Axios 에러 발생:', errorMessage);

      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
      } else if (error.request) {
        console.error('요청이 전송되었으나 응답이 없습니다.');
      } else {
        console.error('요청 설정 중 에러 발생:', error.message);
      }
      throw new Error(`장르 목록을 가져오는 데 실패했습니다: ${errorMessage}`);
    } else {
      console.error('알 수 없는 에러:', error);
      throw new Error('An unknown error occurred');
    }
  }
};
