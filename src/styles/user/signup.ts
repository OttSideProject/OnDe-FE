'use client';

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const Container = styled.div`
  padding: 0 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-height: 55rem;
  padding-bottom: 15rem;
  overflow-y: scroll;
  overflow-x: hidden;

  ul {
    width: 100%;
  }

  li {
    margin-bottom: 3rem; /* 30px -> 3rem */
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
  padding: 2rem 0; /* 20px -> 2rem */
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
  min-width: 3rem; /* 30px -> 3rem */
  display: flex;
`;

const Title2 = styled.h1`
  padding: 2.5rem 0; /* 25px -> 2.5rem */
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 3rem; /* 30px -> 3rem */
  width: 100%;
  padding-bottom: 4rem;
  font-family: var(--title-font);
`;

const Caption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.6rem; /* 16px -> 1.6rem */
  font-weight: 400;
  text-align: center;
  white-space: pre-wrap; 
  word-wrap: break-word; 
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
  font-size: 1.6rem; /* 16px -> 1.6rem */
`;

// Step 2 styles
const Step2Container = styled.div`
  /* padding: 0 2rem; */
  text-align: center;
  display: grid;
`;

const GenreStep2 = styled.p`
  display: flex;
  padding: 1rem 2rem;
  border-radius: 5rem;
  color: black;
  font-size: 2.4rem;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  // font-family: var(--title-font);
`;

// Step 3 styles
const Step3Container = styled.div`
  padding: 1.2rem 2rem; /* 12px -> 1.2rem, 20px -> 2rem */
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
  margin: 1rem; /* 10px -> 1rem */
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`;

const GenderLabel = styled.div<{ isSelected: boolean }>`
  margin-top: 0.8rem; /* 8px -> 0.8rem */
  font-size: 1.6rem; /* 16px -> 1.6rem */
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
    font-size: 1.6rem; /* 16px -> 1.6rem */
    font-style: normal;
    font-weight: 400;
    line-height: 2.08rem; /* 20.8px -> 2.08rem */
    padding-bottom: 1rem; /* 10px -> 1rem */
  }
`;

const Select = styled.select`
  width: 100%;
  font-size: 1.8rem; /* 18px -> 1.8rem */
  color: var(--gray-400, #6c6e68);
  background-color: var(--primary-black);
  border: none;
  border-bottom: 0.2rem solid var(--primary);
  appearance: none;
  height: 4rem; /* 40px -> 4rem */
  align-self: stretch;

  &:focus {
    outline: none;
  }
`;

const DropdownArrow = styled.div`
  position: absolute;
  top: 70%;
  bottom: 1rem; /* 10px -> 1rem */
  right: 0px;
  transform: translateY(-50%);
  pointer-events: none;
  width: 2rem; /* 20px -> 2rem */
  height: 2rem; /* 20px -> 2rem */

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
background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  padding: 1.6rem 1rem;
  width: 100%;
  position: fixed;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const Button = styled.button`
  font-family: var(---primary-font)
  color: var(--primary-black);
  border: none;
  font-weight: 600;
  padding: 1.7rem 7rem; /* 17px -> 1.7rem, 70px -> 7rem */
  margin-top: 2rem; /* 20px -> 2rem */
  font-size: 1.4rem; /* 14px -> 1.4rem */
  cursor: pointer;
  border-radius: 1.4rem; /* 14px -> 1.4rem */
  width: 100%;

  &:hover {
    background-color: #c1ff12;
  }
`;

const Genre = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#FFD700' : '#666')};
  padding: 1rem 2rem;
  border-radius: 1rem; /* 10px -> 1rem */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 10px -> 1rem */
`;

const Label = styled.label`
  color: var(--primary);
  margin-bottom: 0.5rem; /* 5px -> 0.5rem */
`;

const Input = styled.input`
  width: 100%;
  margin-top: 1.5rem; /* 15px -> 1.5rem */
  padding: 0.8rem; /* 8px -> 0.8rem */
  margin-bottom: 0.1rem; /* 1px -> 0.1rem */
  font-size: 1.6rem; /* 16px -> 1.6rem */
  color: #f2f2f2;
  background-color: var(--primary-black);
  border: none;
  border-bottom: 0.2rem solid var(--primary);
`;

const EmailInput = styled.input`
  width: 100%;
  margin-top: 1.5rem; /* 15px -> 1.5rem */
  padding: 0.8rem; /* 8px -> 0.8rem */
  margin-bottom: 0.1rem; /* 1px -> 0.1rem */
  font-size: 1.6rem; /* 16px -> 1.6rem */
  color: #f2f2f2;
  background-color: var(--primary-black);
  border: none;
  border-bottom: 0.2rem solid var(--primary);
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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 0px;
    letter-spacing: 0.12px;
  }
`;

// Step 7 styleconst 
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
   
`;
const Modal = styled.div`
  border-radius: 14px 14px 0px 0px;
  background: #191A18;
  padding: 2rem;
  max-width: 60rem;
  text-align: center;
  max-height: 85vh;
  z-index: 1000;
  bottom: 0px;
  position: fixed;

  h2 {
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    padding: 0 0 1.8rem 0;
  }

  pre {
    overflow-y: auto; /* 세로 스크롤 추가 */
    font-family: var(--primary-font);
    text-align: left;
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 100px;
    width: 100%;
    max-height: 60vh;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;


const ModalButton = styled.div`
    background-color: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    margin-top: 2rem;
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
  Overlay,
  Modal,
  ModalButton

};

export default signup;
