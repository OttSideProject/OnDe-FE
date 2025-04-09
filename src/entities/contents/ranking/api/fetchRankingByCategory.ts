import {
  PublicApi,
  type AxiosResponse,
  type AxiosError,
  isAxiosError,
} from '@/api/core';
import { Ranking, RankingsResponse } from '@/shared/types/contents';

export type FetchRankingByCategoryParams = {
  category: string;
  nowPage?: number;
  pageCount?: number;
};

const dummyData = (): Ranking[] => [
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
    age: '청불',
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
  {
    contentId: '4',
    title: '더미 항목 4',
    rank: 4,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=4',
  },
  {
    contentId: '5',
    title: '더미 항목 5',
    rank: 5,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=5',
  },
  {
    contentId: '6',
    title: '더미 항목 6',
    rank: 6,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=6',
  },
  {
    contentId: '7',
    title: '더미 항목 7',
    rank: 7,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=7',
  },
  {
    contentId: '8',
    title: '더미 항목 8',
    rank: 8,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=8',
  },
  {
    contentId: '9',
    title: '더미 항목 9',
    rank: 9,
    age: '18+',
    ageImage: null,
    category: 'shared',
    genres: ['action', 'comedy'],
    contentImg: 'https://picsum.photos/240/360?random=9',
  },
];

const getResponseData = (
  response: AxiosResponse<RankingsResponse>,
): RankingsResponse => {
  if (!response.data?.content || !Array.isArray(response.data.content)) {
    throw new Error('Invalid response format: content array expected');
  }

  return {
    ...response,
    content: response.data.content.map((item: Ranking) => ({
      ...item,
    })),
    page: response.data.page,
  };
};

// API 호출 횟수를 추적하기 위한 카운터
let apiCallCounter = 0;

/**
 * 카테고리별 랭킹 데이터를 가져오는 함수
 * @param params 요청 파라미터 (카테고리, 페이지 번호, 페이지 크기)
 * @returns 랭킹 데이터 응답
 */
export const fetchRankingByCategory = async ({
  category,
  nowPage = 0,
  pageCount = 48,
}: {
  category: string;
  nowPage?: number;
  pageCount?: number;
}): Promise<RankingsResponse> => {
  // 함수 호출 즉시 로그 출력 (try 블록 전에 배치)
  apiCallCounter++;
  console.log('='.repeat(50));
  console.log(
    `🔥🔥🔥 [API 호출 카운터] 총 호출 횟수: ${apiCallCounter} 🔥🔥🔥`,
  );
  console.log(`📌 [API 호출 정보] 카테고리: ${category}, 페이지: ${nowPage}`);
  console.log('='.repeat(50));

  try {
    const response = await PublicApi.post<RankingsResponse>(
      `/contents/ranking/category?category=${encodeURIComponent(
        category,
      )}&nowPage=${nowPage}&pageCount=${pageCount}`,
      {},
      { timeout: 3000 },
    );
    console.log(
      '✅ Ranking API 응답 성공:',
      response.data.content.length,
      '개의 항목',
    );

    return getResponseData(response);
  } catch (error) {
    console.error('❌ API 호출 중 오류 발생:', error);

    // 서버 에러 발생 시 더미 데이터 반환
    console.log('⚠️ 서버 에러 발생: 더미 데이터를 사용합니다.');
    const dummyContent = dummyData();

    // 더미 데이터 로깅
    console.log('='.repeat(50));
    console.log('📊 더미 데이터 사용 정보:');
    console.log(`🔍 카테고리: ${category}`);
    console.log(`🔢 더미 항목 수: ${dummyContent.length}`);
    console.log('📋 더미 데이터 내용:', dummyContent);
    console.log('='.repeat(50));

    // RankingsResponse 형식에 맞게 더미 데이터 구성
    const dummyResponse: RankingsResponse = {
      content: dummyContent,
      page: {
        totalPages: 1,
        totalElements: dummyContent.length,
        size: dummyContent.length,
        number: 0,
      },
    };

    return dummyResponse;
  }
};
