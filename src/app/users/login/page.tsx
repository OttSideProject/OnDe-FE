'use client';
import React from 'react';
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

export default function LoginForm() {
  return (
    <LoginContainer>
      <Logo>onD</Logo>
      <Form>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <Button>로그인</Button>
      </Form>
      <Link>회원가입 하기</Link>
      <SocialContainer>
        <p>다른 서비스 계정으로 로그인</p>
        <div>
          <SocialButton color="#fff">
            <img src="/google-icon.png" alt="Google" />
          </SocialButton>
          <SocialButton color="#FEE500">
            <img src="/kakao-icon.png" alt="Kakao" />
          </SocialButton>
          <SocialButton color="#03C75A">
            <img src="/naver-icon.png" alt="Naver" />
          </SocialButton>
        </div>
      </SocialContainer>
    </LoginContainer>
  );
}
