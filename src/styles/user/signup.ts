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
  color: #f2f2f2;
  justify-content: space-between;
  height: 100vh;
`;

const Caption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 45px;
  padding: 40px 45px;
  font-weight: 300;
  text-align: center;
  white-space: pre-wrap;
`;

const ColorText = styled.div`
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

const Button = styled.button`
  color: var(--primary-black);
  border: none;
  font-weight: 600;
  padding: 17px 70px;
  margin-top: 20px;
  font-size: 14px;
  margin-bottom: 50px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;

  &:hover {
    background-color: #c1ff12;
  }
`;

// STEP 2 Components
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

// STEP 3 Components
const Step3Container = styled.div`
  padding: 160px 20px;
  text-align: center;
  display: flex;
`;

const ImageContainer2 = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`;

// STEP 4 Components
const GenderLabel = styled.div<{ isSelected: boolean }>`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? 'white' : 'white')};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`;

const SelectContainer = styled.div`
  position: relative;
  padding: 190px 25px;
  width: 100%;

  & > p {
    color: var(--primary);
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  color: #f2f2f2;
  background-color: var(--primary-black);
  border: none;
  border-bottom: 2px solid var(--primary);
  appearance: none;
  height: 40px;
  align-self: stretch;

  &:focus {
    outline: none;
  }
`;

const DropdownArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  pointer-events: none;
  width: 24px;
  height: 24px;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'%3E%3Cpath d='M12.3196 14.5016L18.521 8.30018C18.732 8.08925 18.9781 7.98716 19.2593 7.99391C19.5405 8.00066 19.7866 8.10978 19.9976 8.32128C20.2085 8.53277 20.314 8.77886 20.314 9.05954C20.314 9.34022 20.2085 9.58631 19.9976 9.79781L13.5219 16.2945C13.3532 16.4633 13.1633 16.5898 12.9524 16.6742C12.7415 16.7586 12.5305 16.8008 12.3196 16.8008C12.1087 16.8008 11.8977 16.7586 11.6868 16.6742C11.4759 16.5898 11.286 16.4633 11.1173 16.2945L4.62055 9.79781C4.40962 9.58687 4.30753 9.33713 4.31428 9.04857C4.32103 8.76002 4.43015 8.51055 4.64165 8.30018C4.85314 8.08981 5.09923 7.98435 5.37991 7.98378C5.66059 7.98322 5.90668 8.08869 6.11818 8.30018L12.3196 14.5016Z' fill='%23BFFF00'/%3E%3C/svg%3E");
    background-size: cover;
    background-repeat: no-repeat;
    color: var(--primary);
  }
`;

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
  ImageContainer2,
  Step3Container,
  GenderLabel,
  Select,
  SelectContainer,
  DropdownArrow,
};

export default signup;
