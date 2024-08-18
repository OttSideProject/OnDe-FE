'use client';

import styled from '@emotion/styled';

const ImageContainer = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  cursor: pointer;
`;

const ImagesIcon = styled.div`
  opacity: 30%;
`;

const GenreLabel = styled.span`
  position: absolute;
  background-color: transparent;
  color: white;
  bottom: 50%;
  left: 0;
  right: 0;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  color: white;
`;

const Container = styled.div`
  /* padding: 24px 0; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  text-align: left;
  font-size: 22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.input`
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

const Container2 = styled.div`
  font-size: 16px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const Caption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  font-weight: 300;
`;

const ColorText = styled.div`
  color: #d7ff50;
  margin: 0 5px;
`;

const Header = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderInner = styled.div`
  font-size: 16px;
  color: #e7e7e7;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Close = styled.div``;

const Title2 = styled.h1`
  padding: 0 25px 40px 25px;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  width: 100%;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  height: 70%;
`;

interface GenreProps {
  selected: boolean;
}
const Genre = styled.div<GenreProps>`
  background-color: ${(props) => (props.selected ? '#FFD700' : '#666')};
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

// const Button = (isDisabled: boolean) => styled.button`
// background-color: ${isDisabled ? 'lightgray' : '#d7ff50'};
const Button = styled.button`
  background-color: #d7ff50;
  color: #000;
  border: none;
  font-weight: 600;
  padding: 17px 70px;
  margin-top: 20px;
  font-size: 14px;
  margin-bottom: 15px;

  cursor: pointer;
  border-radius: 5px;
  width: 100%;

  &:hover {
    background-color: #c1ff12;
  }
`;

// STEP2
const GenreStep2 = styled.p`
  padding: 15px 20px;
  border-radius: 50px;
  color: black;
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  display: inline-block;
`;

const Step2Container = styled.div`
  padding: 0 20px;
  text-align: center;
`;
// //STEP2

const signup = {
  PageWrapper,
  Container,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  ErrorMessage,
  Container2,
  GenreContainer,
  Title2,
  Genre,
  ColorText,
  Caption,
  Button,
  Header,
  ImageContainer,
  GenreLabel,
  ImagesIcon,
  Close,
  HeaderInner,
  GenreStep2,
  Step2Container,
};

export default signup;
