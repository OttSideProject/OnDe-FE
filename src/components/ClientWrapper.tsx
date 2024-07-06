'use client';

import { ReactNode } from 'react';

import { UseCustomQuery } from '@/hooks/useCustomQuery';
import { useCustomMutation } from '@/hooks/useCustomMutation';

import axios, { AxiosResponse } from 'axios';

type ExampleData = {
  example: string;
};

const fetchData = async (): Promise<AxiosResponse<ExampleData>> => {
  const response = await axios.get('/api/example'); // 실제 API 엔드포인트 사용
  return response;
};

const postData = async (
  variables: any,
): Promise<AxiosResponse<ExampleData>> => {
  const response = await axios.post('/api/example', variables); // 실제 API 엔드포인트 사용
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

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => mutation.mutate({ example: 'data' })}>
        데이터 전송
      </button>
      <div>{children}</div>
    </div>
  );
};

export default ClientWrapper;
