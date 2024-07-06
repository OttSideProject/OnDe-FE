
import { AxiosResponse } from 'axios';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

const UseCustomQuery = <
  TData = unknown,
  TError = Error,
  TParams extends object = {}
>(
  queryKey: QueryKey,
  queryCallBack: (params: TParams) => Promise<AxiosResponse<TData>>,
  options?: UseQueryOptions<TData, TError, TData>,
  callbackParams: TParams = {} as TParams,	// 기본값을 빈 객체로 설정합니다.
) => {
  const queryFn = async () => {
    const response = await queryCallBack({...callbackParams});
    return response.data;
  };
  return useQuery<TData, TError>({
	// TanStack Query v5부터 useQuery 및 다른 쿼리 관련 함수들이 객체 형태의 인수를 받도록 변경되었기 때문에 queryKey와 queryFn을 객체로 감싸서 전달해야 합니다.
	queryKey,
	queryFn,
	...options,
  });
};

export { UseCustomQuery };
