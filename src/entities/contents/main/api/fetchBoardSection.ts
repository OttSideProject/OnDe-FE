import {
  PublicApi,
  type AxiosResponse,
  type AxiosError,
  isAxiosError,
  AxiosHeaders,
} from '@/api/core';
import { BoardSectionSlide } from '@/shared/types/contents';

// API 응답 구조에 맞게 타입 정의 수정
type BoardSectionResponse = {
  content: BoardSectionSlide[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export const fetchBoardSection = async (
  boardId: number = 1,
): Promise<AxiosResponse<BoardSectionSlide[]>> => {
  try {
    const response = await PublicApi.get<BoardSectionResponse>(
      `/board/top?parentId=${boardId}`,
    );

    // 응답 구조 확인
    if (!response.data || !response.data.content || !Array.isArray(response.data.content)) {
      console.error('예상치 못한 응답 구조:', response.data);
      throw new Error('Invalid response format: content array expected');
    }

    // content 배열 추출
    const boardData = response.data.content;

    return {
      ...response,
      data: boardData,
    };
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
