import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000; /* 검정 배경 */
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

export const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ccee3f; /* 로고 색상 */
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  &::before {
    content: '👀';
    font-size: 2.5rem;
    margin-right: 0.5rem;
  }
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
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #ccee3f; /* 포커스 시 강조 */
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  background-color: #ccee3f;
  border: none;
  border-radius: 5px;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #b2d935; /* 살짝 어두운 색 */
  }
`;

export const Link = styled.a`
  margin-top: 1rem;
  text-align: center;
  color: #ccee3f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialContainer = styled.div`
  margin-top: 2rem;
  text-align: center;

  & > p {
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

export const SocialButton = styled.button`
  width: 50px;
  height: 50px;
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

  & > img {
    width: 70%;
    height: 70%;
  }
`;
