import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000; /* 검정 배경 */
  color: #fff;
`;

export const Logo = styled.div`
  font-size: 3rem;
  cursor: pointer;
  font-weight: bold;
  color: #ccee3f; /* 로고 색상 */
  display: flex;
  align-items: center;
  margin-bottom: 6.5rem;
  background-image: url('/assets/images/icons/logo-1.0.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 38px;
`;

export const Form = styled.form`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: none;
  height: 50px;
  border-radius: 14px;
  background: var(--gray700);
  color: var(--gray200);
  font-size: 1rem;

  &::placeholder {
    color: var(--gray200);
  }
  &:focus {
    outline: 2px solid #ccee3f;
  }
`;

export const Button = styled.button`
  padding: 1.0625rem 4.375rem;
  background-color: #d7ff50;
  border: none;
  border-radius: 14px;
  color: #000;
  height: 56px;
  line-height: 100%;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #b2d935; /* 살짝 어두운 색 */
  }
`;

export const Link = styled.a`
  margin-top: 2rem;
  text-align: center;
  color: #ccee3f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialContainer = styled.div`
  margin-top: 3rem;
  text-align: center;

  & > div > i {
    background: var(--gray700);
    opacity: 0.8;
    width: 76.958px;
    height: 1px;
  }

  & > div > p {
    color: var(--gray-50, #e4e6e1);
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }

  & > div {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    padding: 10px;
  }
`;

export const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${(props: { color: any }) => props.color || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
