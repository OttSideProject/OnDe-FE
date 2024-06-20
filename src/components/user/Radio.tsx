'use client';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, ForwardedRef } from 'react'; // React 모듈에서 forwardRef와 ForwardedRef를 추가로 import

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const RadioLabel = styled.span`
  color: gray;
`;

interface RadioProps {
  label: string;
  value: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// React.forwardRef()를 사용하여 ref를 전달
export const Radio = forwardRef(
  (
    { label, value, name, onChange }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <RadioContainer>
        <RadioInput
          ref={ref}
          type="radio"
          value={value}
          name={name}
          onChange={onChange}
        />
        <RadioLabel>{label}</RadioLabel>
      </RadioContainer>
    );
  },
);
