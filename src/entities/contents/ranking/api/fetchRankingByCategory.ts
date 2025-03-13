import { PublicApi, type AxiosResponse } from '@/api/core';
import { Ranking, RankingsResponse } from '@/_types/contents';

export type FetchRankingByCategoryParams = {
  category: string;
  nowPage?: number;
  pageCount?: number;
};

export const fetchRankingByCategory = async ({
  category,
  nowPage = 0,
  pageCount = 20,
}: FetchRankingByCategoryParams): Promise<RankingsResponse> => {
  console.log(
    'Fetching rankings for category:',
    category,
    'nowPage:',
    nowPage,
    'pageCount:',
    pageCount,
  );
  const response: AxiosResponse<RankingsResponse> = await PublicApi.post(
    `/contents/ranking/category?category=${encodeURIComponent(
      category,
    )}&nowPage=${nowPage}&pageCount=${pageCount}`,
  );
  return response.data;
};
