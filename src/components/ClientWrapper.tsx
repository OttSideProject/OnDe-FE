'use client';

import { ReactNode } from 'react';
import { UseCustomQuery } from '@/hooks/useCustomQuery';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import Loading from '@/components/shared/loading/Loading';
import Api from '@/api/core/Api'; // Api 모듈 import
import { AxiosResponse } from 'axios';

type ExampleData = {
  example: string;
};

const fetchData = async (): Promise<AxiosResponse<ExampleData>> => {
  // 엔드포인트 경로를 Api.get, Api.post에 사용
  const response = await Api.get('/');
  return response;
};

const postData = async (
  variables: any,
): Promise<AxiosResponse<ExampleData>> => {
  const response = await Api.post('/', variables); // 실제 API 엔드포인트 경로 사용
  return response;
};

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  // 예시로 빈 쿼리를 호출하는 경우, 실제로 필요한 쿼리 설정을 여기에 추가합니다.
  const { data, error, isLoading } = UseCustomQuery<ExampleData, Error>(
    ['exampleQuery'],
    fetchData,
  );

  const mutation = useCustomMutation<ExampleData, any>(postData, {
    onSuccess: (data) => {
      console.log('Mutation 성공:', data);
    },
    onError: (error) => {
      console.error('Mutation 실패:', error);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* <button onClick={() => mutation.mutate({ example: 'data' })}>
        데이터 전송
      </button> */}
      <div>{children}</div>
    </div>
  );
};

export default ClientWrapper;
