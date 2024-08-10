'use client';

import styled from '@emotion/styled';

export const body = styled.body`
  font-family: 'Pretendard';
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  background-color: #000;
`;

export const Container = styled.div`
  background-color: #0c0a09;
`;

export const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  text-align: left;
  font-size: 22px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: white;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export const SubmitButton = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: gray;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #94a3b8;
    color: white;
  }
`;

export const Container2 = styled.div`
  display: flex;
  width: 375px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  color: #fff;
  height: 100vh;
  padding: 20px;
`;
export const Header = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #e7e7e7;
`;

export const Title2 = styled.h1`
  margin-bottom: 20px;
  font-size: 22px;
  font-family: 'Pretendard';
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

interface GenreProps {
  selected: boolean;
}
export const Genre = styled.div<GenreProps>`
  background-color: ${(props) => (props.selected ? '#FFD700' : '#666')};
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

export const Button = styled.button`
  background-color: #adff2f;
  color: #000;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #7fff00;
  }
`;
