import Api from './core/Api';
import { fetchers } from '@/__mocks__/helpers/fetchers';
import { RankingsResponse } from '@/_types/contents/contents';

export const fetchRankings = async (
  type: string,
  ott: string,
  id: number,
): Promise<RankingsResponse> => {
  try {
    console.log('Fetching Rankings:', { type, ott, id }); // 요청 매개변수 출력
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
			console.log('Using MSW Mocking...');
      // MSW를 사용하여 API mocking을 하는 경우, fetchSections 함수를 사용할 때 아래 코드가 실행됩니다.
      const response= await fetchers.fetchRankings(type, ott, id);
			console.log('Mock Response:', response);
			return response;
    } else {
			console.log('Using Real API...');
      // 실제 API 호출
      const response = await Api.get<RankingsResponse>(
        `/contents/ranking/ott`,
        {
          baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
          params: { type, ott, id },
        },
				
      );

      console.log('API Response:', response.data); // 응답 확인
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch rankings');
  }
};
