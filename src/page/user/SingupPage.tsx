/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 핸드폰번호 유효성검사
const phoneRegex = new RegExp(/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/);

const LoginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '메일을 입력해주세요.' })
      .email({ message: '올바른 이메일을 입력해주세요.' }),
    name: z.string().min(2).max(10),
    password: z.string().min(8),
    checkPassword: z.string().min(8),
    phone: z.string().regex(phoneRegex, '올바른 번호를 입력해주세요.'),
  })
  .superRefine(({ checkPassword, password }, ctx) => {
    if (checkPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['password'],
      });
    }
  });

type LoginType = z.infer<typeof LoginSchema>;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: gray;
  margin-bottom: 20px;
  text-align: center;
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
  color: gray;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: gray;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const SingupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <PageWrapper>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit((data) => console.log(data))}>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              type="text"
              {...register('email', {
                onChange: (e) => console.log(e.target.value),
              })}
              autoComplete="off"
            placeholder="email@test.com"
            required />
            {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Label>이름</Label>
            <Input type="text" {...register('name')} />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input type="password" {...register('password')} />
            {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호확인</Label>
            <Input type="password" {...register('checkPassword')} />
            {errors.checkPassword?.message && (
              <ErrorMessage>{errors.checkPassword?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>폰번호</Label>
            <Input type="text" {...register('phone')} />
          </InputWrapper>
          <SubmitButton type="submit" value="회원가입" />
        </Form>
      </Container>
    </PageWrapper>
  );
};
