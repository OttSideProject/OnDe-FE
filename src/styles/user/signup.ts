'use client';

import styled from '@emotion/styled';

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
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export const SubmitButton = styled.input`
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
  font-size: 16px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  color: #fff;
  height: 100vh;
`;

export const Caption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ColorText = styled.div`
  color: #adff2f;
`;

export const Header = styled.div`
  font-size: 16px;
  color: #e7e7e7;
`;

export const Title2 = styled.h1`
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  width: 100%;
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  height: 70%;
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
  font-weight: bold;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 14px;

  cursor: pointer;
  border-radius: 5px;
  width: 100%;

  &:hover {
    background-color: #7fff00;
  }
`;
