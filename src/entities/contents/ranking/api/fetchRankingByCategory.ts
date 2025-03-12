import { PublicApi } from '@/api/core/PublicApi';

export type FetchRankingByCategoryParams = {
  category: string;
  nowPage: number;
  pageCount: number;
};

export const fetchRankingByCategory = async ({
  category,
  nowPage,
  pageCount,
}: FetchRankingByCategoryParams) => {
  const response = await PublicApi.post(
    `/contents/ranking/category?category=${encodeURIComponent(
      category,
    )}&nowPage=${nowPage}&pageCount=${pageCount}`,
  );
  console.log('API 응답:', response.data);
  return response.data;
};
