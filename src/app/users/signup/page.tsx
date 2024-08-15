'use client';

import Image from 'next/image';

interface SvgGenre {
  file: string;
  genre: string;
}
// TODO: JSON으로 변경
const svgGenres: SvgGenre[] = [
  { file: '/assets/images/icons/join-Ellipse792.svg', genre: '공상과학' },
  { file: '/assets/images/icons/join-Frame.svg', genre: '드라마' },
  { file: '/assets/images/icons/join-Shield2.svg', genre: '로맨스' },
  { file: '/assets/images/icons/join-Rectangle5761.svg', genre: '애니메이션' },
  { file: '/assets/images/icons/join-Home3.svg', genre: '판타지' },
  { file: '/assets/images/icons/join-Shell.svg', genre: '코미디' },
  { file: '/assets/images/icons/join-House.svg', genre: '히어로' },
  { file: '/assets/images/icons/join-Shield1.svg', genre: '액션' },
  { file: '/assets/images/icons/join-Home2.svg', genre: '스릴러' },
  { file: '/assets/images/icons/join-Polygon.svg', genre: '예능' },
  { file: '/assets/images/icons/join-SkewedRectangle.svg', genre: '다큐' },
];

interface Genre {
  sentence: string;
  color: string;
}
// TODO: JSON으로 변경
const genres_setp2: Genre[] = [
  { sentence: '반전의 연속 충격적인 서스펜스', color: '#B433FB' },
  { sentence: '싸늘해 내가 다 추워지는공포', color: '#5E86F3' },
  { sentence: '함께보면 더 따뜻한 가족이야기', color: '#FBB920' },
  { sentence: '두근두근 설렘 가득 로맨스', color: '#FFC2C2' },
  { sentence: '주인공 버프 가득한 히어로물', color: '#FB52C2' },
  { sentence: '너도? 나도, 공감백배 관찰예능', color: '#BAFB16' },
  { sentence: '현실탈출 꿈같은 판타지 세계', color: '#16FBC5' },
  { sentence: '힐링이 필요해 잔잔한 힐링영화', color: '#16FBF5' },
];

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Api from '@/api/core/Api'; // Api import 추가
import signup from '@/styles/user/signup';
import { useEffect, useState } from 'react';

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

const SignupProcess = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [opacityMap, setOpacityMap] = useState<Record<string, number>>({});
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  const handleSelect = (index: number) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setOpacityMap((prev) => ({
      ...prev,
      [genre]: prev[genre] === 1 ? 0.3 : 1,
    }));
    setColorMap((prev) => ({
      ...prev,
      [genre]: prev[genre] === 'black' ? 'white' : 'black',
    }));
  };

  useEffect(() => {
    const initializeMap = <T,>(defaultValue: T) =>
      svgGenres.reduce((acc, item) => {
        acc[item.genre] = defaultValue;
        return acc;
      }, {} as Record<string, T>);

    setOpacityMap(initializeMap(0.3));
    setColorMap(initializeMap('white'));
  }, []);

  const handleNextClick = () => {
    if (step === 1) {
      if (selectedGenres.length < 3) {
        alert('장르를 3개 이상 선택해 주세요.');
      } else {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (selectedIndexes.length < 3) {
        alert('문장을 3개 이상 선택해 주세요.');
      } else {
        const selectedSentences = selectedIndexes.map(
          (index) => genres_setp2[index].sentence,
        );
        alert(
          `선택된 장르: ${selectedGenres.join(
            ', ',
          )}\n선택된 문장: ${selectedSentences.join(', ')}`,
        );
        setStep(step + 1);
      }
    }
  };

  return (
    <signup.Container2>
      <signup.Header>
        {step !== 1 && (
          <img
            src="/assets/images/icons/material-symbols_arrow-back-ios-rounded.svg"
            alt="뒤로가기"
            onClick={() => setStep(step - 1)}
            width={20}
            height={20}
          />
        )}
        <signup.HeaderInner>개인화 추천({step}/2)</signup.HeaderInner>
        <signup.Close>
          <img
            src="/assets/images/icons/iconamoon_close-light.svg"
            alt="메인으로"
            onClick={() => (location.href = '/')}
            width={20}
            height={20}
          />
        </signup.Close>
      </signup.Header>

      {step === 1 && (
        <signup.Container>
          <signup.Title2>
            안녕하세요! <br /> 어떤 장르를 선호하세요?
          </signup.Title2>
          {svgGenres.map((item, index) => (
            <signup.ImageContainer
              key={index}
              onClick={() => toggleGenre(item.genre)}
              style={{ opacity: opacityMap[item.genre] }}
            >
              <signup.ImagesIcon>
                <Image
                  src={item.file}
                  alt={item.genre}
                  width={100}
                  height={100}
                />
              </signup.ImagesIcon>
              <signup.GenreLabel style={{ color: colorMap[item.genre] }}>
                {item.genre}
              </signup.GenreLabel>
            </signup.ImageContainer>
          ))}
        </signup.Container>
      )}

      {step === 2 && (
        <>
          <signup.Title2>어떤 문장을 선호하세요?</signup.Title2>
          <signup.Step2Container>
            {genres_setp2.map((genre, index) => (
              <signup.GenreStep2
                key={index}
                style={{
                  background: selectedIndexes.includes(index)
                    ? genre.color
                    : 'transparent',
                  cursor: 'pointer',
                  color: selectedIndexes.includes(index) ? 'black' : 'white',
                }}
                onClick={() => handleSelect(index)}
              >
                {genre.sentence}
              </signup.GenreStep2>
            ))}
          </signup.Step2Container>
        </>
      )}

      <signup.Caption>
        관심 있는 {step === 1 ? '장르를' : '문장을'}{' '}
        <signup.ColorText> 3개 이상 선택</signup.ColorText>해 주세요.
      </signup.Caption>
      <signup.Button
        onClick={handleNextClick}
        disabled={
          (step === 1 && selectedGenres.length < 3) ||
          (step === 2 && selectedIndexes.length < 3)
        }
        style={{
          backgroundColor:
            (step === 1 && selectedGenres.length < 3) ||
            (step === 2 && selectedIndexes.length < 3)
              ? 'gray'
              : '#d7ff50',
        }}
      >
        다음
      </signup.Button>
      {step === 3 && <>step3</>}
    </signup.Container2>
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
    Api.post('users/join', data)
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
    <signup.PageWrapper>
      <signup.Container>
        <signup.Title>회원가입</signup.Title>
        <signup.Form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
          <signup.InputWrapper>
            <signup.Label>아이디</signup.Label>
            <signup.Input type="text" {...register('userId')} />
            {errors.userId?.message && (
              <signup.ErrorMessage>
                {errors.userId?.message}
              </signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>이메일</signup.Label>
            <signup.Input
              type="text"
              {...register('email')}
              autoComplete="false"
              placeholder="email@test.com"
              required
            />
            {errors.email?.message && (
              <signup.ErrorMessage>{errors.email?.message}</signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>닉네임</signup.Label>
            <signup.Input type="text" {...register('nickName')} />
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>비밀번호</signup.Label>
            <signup.Input
              type="password"
              {...register('password')}
              autoComplete="new-password"
            />

            {errors.password?.message && (
              <signup.ErrorMessage>
                {errors.password?.message}
              </signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>비밀번호확인</signup.Label>
            <signup.Input type="password" {...register('checkPassword')} />
            {errors.checkPassword?.message && (
              <signup.ErrorMessage>
                {errors.checkPassword?.message}
              </signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>성별</signup.Label>
            <signup.Input type="text" {...register('gender')} />
            {/* <RadioGroup {...register('gender')}>
              <Radio label="남성" value="male" name="gender" />
              <Radio label="여성" value="female" name="gender" />
            </RadioGroup> */}
            {errors.gender?.message && (
              <signup.ErrorMessage>
                {errors.gender?.message}
              </signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>국적</signup.Label>
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
              <signup.ErrorMessage>
                {errors.nationality?.message}
              </signup.ErrorMessage>
            )}
          </signup.InputWrapper>
          <signup.InputWrapper>
            <signup.Label>나이</signup.Label>
            <signup.Input
              type="number"
              // {...register('age')}
            />
            {/* {errors.age?.message && (
              <ErrorMessage>{errors.age?.message}</ErrorMessage>
            )} */}
          </signup.InputWrapper>
          <signup.Input type="submit" value="회원가입" />
        </signup.Form>
      </signup.Container>
    </signup.PageWrapper>
  );
};

export default SignupProcess;
