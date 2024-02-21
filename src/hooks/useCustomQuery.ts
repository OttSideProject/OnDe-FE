import { AxiosResponse } from 'axios';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';

export const useCustomQuery = <
  TData = unknown,
  TError = Error,
  TParams = object,
>(
  queryKey: QueryKey,
  queryCallBack: (...args: any[]) => Promise<AxiosResponse<TData>>,
  options?: UseQueryOptions<TData, TError>,
  callbackParams?: TParams,
) => {
  const queryFn = async () => {
    const response = await queryCallBack({ ...callbackParams });
    return response.data;
  };
  return useQuery<TData, TError>(queryKey, queryFn, options);
};
