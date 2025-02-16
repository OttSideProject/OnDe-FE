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
  console.log(formData);

  const handleLogin = () => {
    setError('');
    setLoading(true);

    Api.post('users/login', formData)
      .then((response) => {
        console.log('로그인 성공:', response.data);

        const accessToken = response.data.result.accessToken;
        console.log(accessToken);

        // access-token을 localStorage에 저장
        localStorage.setItem('Access-Token', accessToken);

        // API 요청 시 자동으로 Access-Toke 헤더 포함
        Api.defaults.headers.common['Access-Token'] = `${accessToken}`;

        alert('로그인에 성공했습니다!');
        setTimeout(() => {
          location.href = '/';
        }, 1000);
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
      ></Logo>
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
      <Link>회원가입 하기</Link>
      <SocialContainer>
        <div>
          <i></i>
          <p>다른 서비스 계정으로 로그인</p>
          <i></i>
        </div>
        <div>
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
