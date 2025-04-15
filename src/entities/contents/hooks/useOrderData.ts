import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchOrder } from '@/entities/contents/main';
import { OrderResponse } from '@/shared/types/contents';

export const useOrderData = (order: string) => {
  return useInfiniteQuery<OrderResponse, Error>({
    queryKey: ['order', order],
    queryFn: async ({ pageParam = 0 }) => {
      return await fetchOrder({
        order: order as string,
        nowPage: pageParam as number,
        pageCount: 20,
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
  });
};
