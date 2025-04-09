import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 기본 Axios 인스턴스 생성
const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
    timeout: 10000,
    ...config,
  });
};

// 기본 에러 처리
const handleError = (error: unknown) => {
  console.error('API Error:', error);
  return Promise.reject(error);
};

// API 메서드 생성
export const createApi = (config?: AxiosRequestConfig) => {
  const instance = createAxiosInstance(config);

  // 기본 에러 처리 설정
  instance.interceptors.response.use(
    response => response,
    handleError
  );

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) => 
      instance.get<T>(url, config),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
      instance.post<T>(url, data, config),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
      instance.put<T>(url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) => 
      instance.delete<T>(url, config),
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
      instance.patch<T>(url, data, config),
    instance, // 인스턴스 직접 접근이 필요한 경우를 위해 노출
  };
};
