import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchContents } from '@/entities/contents/main';
import { ContentTypeResponse } from '@/_types/contents';

export const useTypeData = (type: string | null) => {
  return useInfiniteQuery<ContentTypeResponse, Error>({
    queryKey: ['types', type], // type을 쿼리 키에 추가
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const [_, type] = queryKey;
      console.log('type: ', type);
      return await fetchContents({
        type: type as string,
        nowPage: pageParam as number, // nowPage를 pageParam으로 설정
        pageSize: 20,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page.number < lastPage.page.totalPages
        ? lastPage.page.number + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page.number > 0 ? firstPage.page.number - 1 : undefined;
    },
    initialPageParam: 0, // 첫번째 섹션의 ID
  });
};
