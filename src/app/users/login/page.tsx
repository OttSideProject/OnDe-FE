'use client';
import Api from '@/api/core/Api';
import {
  LoginContainer,
  Logo,
  Form,
  Input,
  Button,
  Link,
  SocialContainer,
  SocialButton,
} from './LoginStyles';
import { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    setError('');
    setLoading(true);

    Api.post('users/login', formData)
      .then((response) => {
        console.log('로그인 성공:', response.data);

        const { accessToken, refreshToken } = response.data.result;
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        // ✅ accessToken과 refreshToken을 localStorage에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // ✅ API 요청 시 자동으로 accessToken과 refreshToken 포함
        Api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        Api.defaults.headers.common['refreshToken'] = refreshToken;

        // 로그인한 사용자 ID 저장
        localStorage.setItem('userId', formData.userId);

        // ✅ 쿠키에 아바타 정보 저장
        const avatarOptions = [
          'profile-angry.png',
          'profile-dizzy.png',
          'profile-girl.png',
          'profile-glasses.png',
        ];

        const setCookie = (name: string, value: string, days = 30) => {
          const expires = new Date();
          expires.setDate(expires.getDate() + days);
          document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
        };

        const getCookie = (name: string) => {
          const cookies = document.cookie.split('; ');
          const cookie = cookies.find((row) => row.startsWith(`${name}=`));
          return cookie ? cookie.split('=')[1] : null;
        };

        // 쿠키에서 아바타 가져오기 (없으면 랜덤 선택 후 저장)
        const getAvatarFromCookie = () => {
          let avatar = getCookie('userAvatar');
          if (!avatar) {
            avatar =
              avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
            setCookie('userAvatar', avatar);
          }
          return `/assets/images/${avatar}`;
        };

        const avatar = getAvatarFromCookie();

        // ✅ 로그인 성공 후 리디렉션 (예제)
        // setTimeout(() => {
        //   location.href = '/';
        // }, 1000);
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoginContainer>
      <Logo
        onClick={() => {
          location.href = '/';
        }}
      />
      <Form>
        <Input
          type="text"
          name="userId"
          placeholder="아이디"
          value={formData.userId}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </Form>
      <Link
        onClick={() => {
          location.href = '/users/signup';
        }}
      >
        회원가입 하기
      </Link>
      <SocialContainer>
        <div>
          <i></i>
          <p>다른 서비스 계정으로 로그인</p>
          <i></i>
        </div>
        <div onClick={() => alert('준비 중입니다.')}>
          <SocialButton color="#fff">
            <img src="/assets/images/icons/google_logo.svg" alt="Google" />
          </SocialButton>
          <SocialButton color="#FEE500">
            <img src="/assets/images/icons/kakao_logo.svg" alt="Kakao" />
          </SocialButton>
          <SocialButton color="#03C75A">
            <img src="/assets/images/icons/naver_logo.svg" alt="Naver" />
          </SocialButton>
        </div>
      </SocialContainer>
    </LoginContainer>
  );
}
