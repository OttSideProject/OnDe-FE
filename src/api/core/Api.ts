import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT, // 환경 변수에서 API 엔드포인트를 가져옵니다.
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
    withCredentials: true,
  },
});

// 요청 인터셉터 (Access-Token 추가)
Api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('Access-Token'); // 토큰의 키 이름도 일치시켜야 합니다.
  console.log('📢 요청 보냄 - 토큰:', accessToken); // 토큰 확인

  if (accessToken) {
    config.headers['Access-Token'] = accessToken;
  }
  return config;
});

// 응답 인터셉터 (Access-Token 만료 시 갱신)
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('🔄 Access-Token 만료 refresh 시도 중...');

      try {
        const refreshResponse = await Api.post('/users/refresh');

        // 새 Access-Token 저장
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('Access-Token', newAccessToken); // 키 이름도 일치시켜야 합니다.
        Api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`; // `Bearer`를 포함

        // 원래 요청 다시 보내기
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`; // `Bearer`를 포함
        return Api(error.config);
      } catch (refreshError) {
        console.error('🔴 refresh-token도 만료 로그아웃 필요');
        localStorage.removeItem('Access-Token');
        location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default Api;
