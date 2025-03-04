import styled from '@emotion/styled';

export const BtnInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Btn = styled.button<{
  variant: 'primary' | 'secondary' | 'default';
  size: 'small' | 'default';
  active: boolean;
}>`
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${({ size }) => (size === 'small' ? '103px' : '100%')};
  min-width: 103px;
  max-width: 433px;
  height: ${({ size }) => (size === 'small' ? '29px' : '56px')};
  border-radius: ${({ size }) => (size === 'small' ? '8px' : '14px')};
  background-color: ${({ variant }) =>
    variant === 'primary'
      ? 'var(--primary80)'
      : variant === 'secondary'
      ? 'var(--secondary10)'
      : 'var(--gray700)'};
  color: ${({ variant }) =>
    variant === 'default' ? 'var(--primary-white)' : 'var(--primary-black)'};
  font-size: ${({ size }) => (size === 'small' ? '1rem' : '1.6rem')};
  font-weight: ${({ size }) => (size === 'small' ? '500' : '600')};
  cursor: pointer;

  span {
    margin-left: 8px;
    line-height: 13px;
    color: ${({ variant }) =>
      variant === 'primary' ? 'var(--primary-black)' : 'inherit'}

  &:disabled {
    background-color: var(--gray200);
    cursor: not-allowed;
  }

  ${({ active, variant }) =>
    active &&
    `
		background-color: ${
      variant === 'primary'
        ? 'var(--primary)'
        : variant === 'secondary'
        ? 'var(--secondary)'
        : 'var(--gray750)'
    };
	`}
`;

export const Icon = styled.img`
  width: 13px;
  height: 13px;
`;

/* 상세페이지 버튼 레이아웃 */
export const BtnDetailInnerChildStyle = styled.div`
  width: 48%;

  & img {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
`;

export const BtnDetailInnerFirstChildStyle = styled.div`
  flex-basis: 135px;

  & img {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
`;

export const BtnDetailInnerLastChildStyle = styled.div`
  flex: 1 1 0%;
`;
