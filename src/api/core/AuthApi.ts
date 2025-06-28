import { AxiosResponse } from '@/api/core';
import { createApi } from './BaseApi';

// 인증 API 인스턴스 생성
const api = createApi();

// 인증 토큰을 요청에 추가하는 인터셉터
api.instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 인증 관련 응답 처리 인터셉터
api.instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

// 인증 API 메서드들 내보내기
export const AuthApi = api;
