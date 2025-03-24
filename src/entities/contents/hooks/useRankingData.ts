import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRankingByCategory } from '@/entities/contents/ranking';
import { RankingsResponse } from '@/shared/types/contents';

export const useRankingData = (category: string | null) => {
  return useInfiniteQuery<RankingsResponse, Error>({
    queryKey: ['rankings', category], // category를 쿼리 키에 추가
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const [_, categoryParam] = queryKey;
      console.log('Fetching rankings with category:', categoryParam);

      // 디버깅을 위한 추가 로그
      console.log('Query function called with params:', {
        pageParam,
        categoryParam,
      });

      return await fetchRankingByCategory({
        category: (categoryParam as string) || '', // category가 있을 경우 해당 값을 사용, 없을 경우 빈 문자열 사용
        nowPage: pageParam as number, // nowPage를 pageParam으로 설정
        pageCount: 48, // API 호출 시 48개 데이터 요청
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page.number < lastPage.page.totalPages - 1
        ? lastPage.page.number + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page.number > 0 ? firstPage.page.number - 1 : undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    staleTime: 0, // 캐시 시간을 0으로 설정하여 항상 최신 데이터를 가져오도록 함
    gcTime: 5 * 60 * 1000, // 5분 동안 가비지 컬렉션 전까지 캐시 유지
  });
};
