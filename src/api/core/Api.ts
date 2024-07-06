import axios from 'axios'; 

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT, // 환경 변수에서 API 엔드포인트를 가져옵니다.
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
  withCredentials: true, // 인증 정보(쿠키 등)를 함께 전송합니다.
});

export default Api;
