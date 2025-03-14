'use client';

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const Container = styled.div`
  padding: 0 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  ul {
    width: 100%;
  }

  li {
    margin-bottom: 30px;
  }
`;

const Container2 = styled.div`
  padding: 1rem !important;
  font-size: 1.6rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  color: #f2f2f2;
  justify-content: space-between;
`;

const Header = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderInner = styled.div`
  font-size: 1.6rem;
  color: #e7e7e7;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Close = styled.div`
  font-size: 1.4rem;
  color: #e7e7e7;
  min-width: 30px;
  display: flex;
`;

const Title2 = styled.h1`
  padding: 2.5rem 0px;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 3rem;
  width: 100%;
  padding-bottom: 4rem;
`;

const Caption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  font-weight: 300;
  text-align: center;
  white-space: pre-wrap;
`;

// Step 1 styles
const ImageContainer = styled.div`
  position: absolute;
  cursor: pointer;
`;

const ImagesIcon = styled.div`
  /* opacity: 30%; */
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

// Step 2 styles
const Step2Container = styled.div`
  /* padding: 0 20px; */
  text-align: center;
  display: grid;
`;

const GenreStep2 = styled.p`
  display: flex;
  padding: 1rem 2rem;
  border-radius: 5rem;
  color: black;
  font-size: 2.4rem;
  font-weight: 300;
  text-align: center;
  display: inline-block;
`;

// Step 3 styles
const Step3Container = styled.div`
  padding: 12px 20px;
  text-align: center;
  display: flex;
  left: 50%;
  height: 50vh;
  transform: translateX(-50%);
  position: relative;
  width: 100%;
  justify-content: center;
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

const GenderLabel = styled.div<{ isSelected: boolean }>`
  margin-top: 8px;
  font-size: 16px;
  color: white;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`;

// Step 4 styles
const SelectContainer = styled.div`
  position: relative;
  width: 100%;

  & > p {
    color: var(--primary);
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20.8px;
    padding-bottom: 10px;
  }
`;

const Select = styled.select`
  width: 100%;
  font-size: 1.8rem;
  color: var(--gray-400, #6c6e68);
  background-color: var(--primary-black);
  border: none;
  border-bottom: 0.2rem solid var(--primary);
  appearance: none;
  height: 4rem;
  align-self: stretch;

  &:focus {
    outline: none;
  }
`;

const DropdownArrow = styled.div`
  position: absolute;
  top: 70%;
  bottom: 10px;
  right: 0px;
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: 20px;

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
const BottomPoint = styled.div`
  max-width: 60rem;
  padding: 0 1rem;
  width: 100%;
  position: fixed;
  bottom: 2.4rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  color: var(--primary-black);
  border: none;
  font-weight: 600;
  padding: 1.7rem 7rem;
  margin-top: 2rem;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 1.4rem;
  width: 100%;

  &:hover {
    background-color: #c1ff12;
  }
`;

const Genre = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#FFD700' : '#666')};
  padding: 1rem 2rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: var(--primary);
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 15px;
  padding: 8px;
  margin-bottom: 1px;
  font-size: 16px;
  color: #f2f2f2;
  background-color: var(--primary-black);
  border: none;
  border-bottom: 2px solid var(--primary);
`;

const EmailInput = styled.input`
  width: 100%;
  margin-top: 15px;
  padding: 8px;
  margin-bottom: 1px;
  font-size: 16px;
  color: #f2f2f2;
  background-color: var(--primary-black);
  border: none;
  border-bottom: 2px solid var(--primary);
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  p {
    color: var(--Cod-Gray-50, #f6f6f6);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 0px;
    letter-spacing: 0.12px;
  }
`;

// Exporting all styles
const signup = {
  Container,
  Container2,
  Header,
  HeaderInner,
  Close,
  Title2,
  Caption,
  ImageContainer,
  ImagesIcon,
  GenreLabel,
  Step2Container,
  GenreStep2,
  Step3Container,
  ImageContainer2,
  GenderLabel,
  SelectContainer,
  Select,
  DropdownArrow,
  Button,
  Genre,
  Form,
  Label,
  Input,
  EmailInput,
  ErrorMessage,
  BottomPoint,
  LoadingContainer,
};

export default signup;
