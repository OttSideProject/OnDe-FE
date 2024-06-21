
import { AxiosResponse } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

// ApiFunction을 MutationFunction 타입을 사용하여 정의
type ApiFunction<TData, TVariables> = (
  variables: TVariables,
) => Promise<AxiosResponse<TData>>;

interface UseCustomMutationOptions<TData, TVariables, TError>
  extends UseMutationOptions<AxiosResponse<TData>, TError, TVariables> {}

export const useCustomMutation = <TData, TVariables, TError = unknown>(
  apiFunc: ApiFunction<TData, TVariables>,
  options?: UseCustomMutationOptions<TData, TVariables, TError>,
): UseMutationResult<AxiosResponse<TData>, TError, TVariables> => {
  return useMutation<AxiosResponse<TData>, TError, TVariables>(
    apiFunc,
    options,
  );
};
