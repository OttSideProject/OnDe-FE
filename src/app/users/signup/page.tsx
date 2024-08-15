'use client';

import Image from 'next/image';

// import Close from '/assets/images/icons/iconamoon_close-light.svg';
interface SvgGenre {
  file: string;
  genre: string;
}
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
  const [step, setStep] = useState(1); //회원가입 단계
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [opacityMap, setOpacityMap] = useState<Record<string, number>>({});
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  // 장르를 클릭할 때 호출되는 함수
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
    const initialOpacityMap = svgGenres.reduce((acc, item) => {
      acc[item.genre] = 0.3;
      return acc;
    }, {} as Record<string, number>);

    const initialColorMap = svgGenres.reduce((acc, item) => {
      acc[item.genre] = 'white';
      return acc;
    }, {} as Record<string, string>);

    setOpacityMap(initialOpacityMap);
    setColorMap(initialColorMap);
  }, []);

  const handleNextClick = () => {
    if (selectedGenres.length < 3) {
      alert('장르를 3개 이상 선택해 주세요.');
    } else {
      alert(`선택된 장르: ${selectedGenres.join(', ')}`);
      setStep(step + 1);
    }
  };

  return (
    <signup.Container2>
      <signup.Header>
        <signup.HeaderInner>개인화 추천({step}/4)</signup.HeaderInner>
        <signup.Close>
          <img
            src="/assets/images/icons/iconamoon_close-light.svg"
            alt="닫기"
            width={20}
            height={20}
          />
        </signup.Close>
      </signup.Header>
      {step === 1 && (
        <>
          <signup.Container>
            <signup.Title2>
              안녕하세요! <br />
              어떤 장르를 선호하세요?
            </signup.Title2>
            {svgGenres.map((item, index) => (
              <signup.ImageContainer
                key={index}
                onClick={() => toggleGenre(item.genre)}
                style={{ opacity: opacityMap[item.genre] ?? 0.3 }}
              >
                <signup.ImagesIcon>
                  <Image
                    src={item.file}
                    alt={`장르 ${index + 1}`}
                    width={100}
                    height={100}
                  />
                </signup.ImagesIcon>
                <signup.GenreLabel
                  style={{ color: colorMap[item.genre] ?? 'white' }}
                >
                  {item.genre}
                </signup.GenreLabel>
              </signup.ImageContainer>
            ))}
          </signup.Container>
          <signup.Caption>
            관심 있는 장르를 <signup.ColorText> 3개 이상 선택</signup.ColorText>
            해 주세요.
          </signup.Caption>
          <signup.Button
            onClick={handleNextClick}
            disabled={selectedGenres.length < 3}
          >
            다음
          </signup.Button>
        </>
      )}
      {step === 2 && <>step2</>}
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

// // 회원가입 메인 컴포넌트
// const SingupPage = () => {
//   return (
//     <signup.Container>
// <SignupProcess />
//     </signup.Container>
//   );
// };

export default SignupProcess;
