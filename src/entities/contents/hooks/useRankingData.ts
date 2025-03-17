import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRankingByCategory } from '@/entities/contents/ranking';
import { RankingsResponse } from '@/_types/contents';

export const useRankingData = (category: string | null) => {
  return useInfiniteQuery<RankingsResponse, Error>({
    queryKey: ['rankings', category], // category를 쿼리 키에 추가
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const [_, category] = queryKey;
      console.log('category', category);
      return await fetchRankingByCategory({
        category: category as string, // category가 있을 경우 해당 값을 사용, 없을 경우 빈 문자열 사용
        nowPage: pageParam as number, // nowPage를 pageParam으로 설정
        pageCount: 51, // API 호출 시 51개 데이터 요청
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page.number < lastPage.page.totalPages // 페이지 정보 수정
        ? lastPage.page.number + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page.number > 0 // 페이지 정보 수정
        ? firstPage.page.number - 1
        : undefined;
    },
    initialPageParam: 0, // 첫번째 섹션의 ID
  });
};
