import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT, // 환경 변수에서 API 엔드포인트를 가져옵니다.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});

// 요청 인터셉터 (accessToken, refreshToken 추가)
Api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken'); // accessToken
  const refreshToken = localStorage.getItem('refreshToken'); // refreshToken 추가
  console.log(
    '📢 요청 보냄 - accessToken:',
    accessToken,
    'refreshToken:',
    refreshToken,
  ); // 토큰 확인

  if (accessToken) {
    config.headers['accessToken'] = accessToken;
  }

  if (refreshToken) {
    config.headers['refreshToken'] = refreshToken;
  }

  return config;
});

// 응답 인터셉터 (accessToken 만료 시 갱신)
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('🔄 accessToken 만료 refresh 시도 중...');

      try {
        const refreshResponse = await Api.post('/users/refresh');

        // 새 accessToken 저장
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken; // refreshToken도 받아오기
        localStorage.setItem('accessToken', newAccessToken); // accessToken 저장
        localStorage.setItem('refreshToken', newRefreshToken); // refreshToken 저장
        Api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`; // `Bearer`를 포함

        // 원래 요청 다시 보내기
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`; // `Bearer`를 포함
        error.config.headers['refreshToken'] = newRefreshToken; // refreshToken 추가
        return Api(error.config);
      } catch (refreshError) {
        console.error('🔴 refresh-token도 만료 로그아웃 필요');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken'); // refreshToken도 삭제
        location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default Api;
