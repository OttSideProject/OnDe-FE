'use client';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode, forwardRef, ForwardedRef } from 'react'; // React 모듈에서 forwardRef와 ForwardedRef를 추가로 import

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const RadioGroupLabel = styled.div`
  margin-bottom: 5px;
  color: gray;
`;

interface RadioGroupProps {
  label?: string;
  children: ReactNode;
}

// React.forwardRef()를 사용하여 ref를 전달
export const RadioGroup = forwardRef(
  ({ label, children }: RadioGroupProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <RadioGroupContainer ref={ref}>
        {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
        {children}
      </RadioGroupContainer>
    );
  },
);
