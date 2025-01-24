import Api from './core/Api';
import { fetchers } from '@/__mocks__/helpers/fetchers';
import { RankingsResponse } from '@/_types/contents/contents';

export const fetchRankings = async (
	type: string,
  ott: string,
  id: number,
): Promise<RankingsResponse> => {
  try {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      // MSW를 사용하여 API mocking을 하는 경우, fetchSections 함수를 사용할 때 아래 코드가 실행됩니다.
      return await fetchers.fetchRankings(type, ott, id);
    } else {
      // 실제 API 호출
      const response = await Api.get<RankingsResponse>(
        `/contents/ranking/ott`,
        {
          baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
          params: { type, ott, id },
        },
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch rankings');
  }
};
