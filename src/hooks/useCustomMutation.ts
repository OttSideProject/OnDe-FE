import { AxiosResponse } from 'axios';
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query';

type ApiFunction<TData, TVariables> = MutationFunction<
  AxiosResponse<TData>,
  TVariables
>;

interface UseCustomMutationOptions<TData, TVariables, TError>
  extends UseMutationOptions<AxiosResponse<TData>, TError, TVariables> {}

export const useCustomMutation = <TData, TVariables, TError = Error>(
  apiFunc: ApiFunction<TData, TVariables>,
  options: UseCustomMutationOptions<TData, TVariables, TError>,
) => {
  return useMutation<AxiosResponse<TData>, TError, TVariables>(
    apiFunc,
    options,
  );
};
