import axios from 'axios';

// 공개 API 인스턴스 생성
export const PublicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
