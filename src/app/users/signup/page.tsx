'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Api from '@/api/core/Api'; // Api import 추가
import {
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
  Button,
  Header,
} from '@/styles/user/signup';
import { useState } from 'react';

const LoginSchema = z
  .object({
    userId: z.string().min(1, { message: '아이디를 입력해주세요.' }),
    email: z
      .string()
      .min(1, { message: '메일을 입력해주세요.' })
      .email({ message: '올바른 이메일을 입력해주세요.' }),
    nickName: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
    password: z
      .string()
      .min(8)
      .max(16, { message: '비밀번호를 8자 이상 16자 이하로 입력해 주세요.' }),
    checkPassword: z.string().min(8).max(16),
    gender: z.string().optional(),
    // age: z.preprocess(
    //   (value) => parseInt(z.string().parse(value), 10),
    //   z.number().min(1, { message: '나이를 입력해주세요.' }),
    // ),
    nationality: z
      .string()
      .min(1, { message: '국적을 입력해주세요.' })
      .optional(),
    provider: z.string().optional(),
  })
  .superRefine(({ checkPassword, password }, ctx) => {
    if (checkPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword'],
      });
    }
  });
type LoginType = z.infer<typeof LoginSchema>;

const SingStep1 = () => {
  const genresList = [
    '공상과학',
    '드라마',
    '로맨스',
    '애니메이션',
    '판타지',
    '액션',
    '코미디',
    '히어로',
    '스릴러',
    '예능',
    '다큐',
  ];
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };
  return (
    <Container2>
      <Header>개인화 추천(1/2)</Header>
      <Title2>
        안녕하세요! <br />
        어떤 장르를 선호하세요?
      </Title2>
      <GenreContainer>
        {genresList.map((genre) => (
          <Genre
            key={genre}
            selected={selectedGenres.includes(genre)}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </Genre>
        ))}
      </GenreContainer>
      <p>관심있는 장르를 3개 이상 선택해 주세요.</p>
      <Button
        onClick={() => alert(`선택된 장르: ${selectedGenres.join(', ')}`)}
        disabled={selectedGenres.length < 3}
      >
        다음
      </Button>
    </Container2>
  );
};

const SingStep2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      provider: '',
    },
  });

  const onSubmit = async (data: LoginType) => {
    console.log(data);
    Api.post('users/join', data) // Api를 사용하여 POST 요청
      .then((result) => {
        console.log('요청성공');
        console.log(result);
      })
      .catch((error) => {
        console.log('요청실패');
        console.log(error);
      });
  };

  return (
    <PageWrapper>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
          <InputWrapper>
            <Label>아이디</Label>
            <Input type="text" {...register('userId')} />
            {errors.userId?.message && (
              <ErrorMessage>{errors.userId?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              type="text"
              {...register('email')}
              autoComplete="false"
              placeholder="email@test.com"
              required
            />
            {errors.email?.message && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>닉네임</Label>
            <Input type="text" {...register('nickName')} />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              {...register('password')}
              autoComplete="new-password"
            />

            {errors.password?.message && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호확인</Label>
            <Input type="password" {...register('checkPassword')} />
            {errors.checkPassword?.message && (
              <ErrorMessage>{errors.checkPassword?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>성별</Label>
            <Input type="text" {...register('gender')} />
            {/* <RadioGroup {...register('gender')}>
              <Radio label="남성" value="male" name="gender" />
              <Radio label="여성" value="female" name="gender" />
            </RadioGroup> */}
            {errors.gender?.message && (
              <ErrorMessage>{errors.gender?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>국적</Label>
            <select {...register('nationality')} defaultValue="">
              <option value="" disabled hidden>
                국적을 선택하세요
              </option>
              <option value="KR">대한민국</option>
              <option value="US">미국</option>
              <option value="CN">중국</option>
              <option value="JP">일본</option>
              <option value="GB">영국</option>
            </select>
            {errors.nationality?.message && (
              <ErrorMessage>{errors.nationality?.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>나이</Label>
            <Input
              type="number"
              // {...register('age')}
            />
            {/* {errors.age?.message && (
              <ErrorMessage>{errors.age?.message}</ErrorMessage>
            )} */}
          </InputWrapper>
          <input type="submit" value="회원가입" />
        </Form>
      </Container>
    </PageWrapper>
  );
};

const SingupPage = () => {
  return (
    <Container>
      <SingStep1 />
    </Container>
  );
};

export default SingupPage;
