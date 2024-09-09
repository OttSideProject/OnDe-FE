'use client';

import Image from 'next/image';
import AgeSelectOptions from './AgeSelect';
import EmailInput from './EmailInput';

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

import Api from '@/api/core/Api'; // Api import 추가
import signup from '@/styles/user/signup';
import { ChangeEvent, useEffect, useState } from 'react';

const SignupProcess = () => {
  const [step, setStep] = useState(1); //개인화추천단계
  const [joinStep, setJoinStep] = useState(1); //회원가입단계
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [opacityMap, setOpacityMap] = useState<Record<string, number>>({});
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    age: number;
    genres: string[];
    sentence: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: 2000,
    genres: selectedGenres,
    sentence: '',
  });

  useEffect(() => {
    const selectedSentences = selectedIndexes
      .map((index) => genres_setp2[index]?.sentence)
      .filter(Boolean) as string[];

    setUserInfo((prev) => ({
      ...prev,
      sentence: selectedSentences.join(', '),
    }));
  }, [selectedIndexes]);

  const handleSelect = (index: number) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    setUserInfo((prev) => ({ ...prev, genres: selectedGenres }));
  }, [selectedGenres]);

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
        setStep(step + 1); // 다음 단계로 넘어감
      }
    } else if (step === 2) {
      if (selectedIndexes.length < 3) {
        alert('문장을 3개 이상 선택해 주세요.');
      } else {
        setStep(step + 1); // 다음 단계로 넘어감
      }
    } else if (step === 3) {
      if (!userInfo.gender) {
        alert('성별을 선택해 주세요.');
      } else {
        setStep(step + 1); // 다음 단계로 넘어감
      }
    } else if (step === 4) {
      if (!userInfo.age) {
        alert('연령대를 선택해 주세요.');
      } else {
        setStep(step + 1); // 다음 단계로 넘어감 (이메일, 비밀번호 단계)
      }
    } else if (step === 5) {
      // 이메일 검증
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!userInfo.email || !emailRegex.test(userInfo.email)) {
        alert('유효한 이메일을 입력해 주세요.');
        return;
      }
      // 비밀번호 및 비밀번호 확인 검증
      if (!userInfo.password || !userInfo.confirmPassword) {
        alert('모든 필드를 입력해 주세요.');
        return;
      } else if (userInfo.password !== userInfo.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      } else {
        setStep(step + 1); // 다음 단계로 넘어감
      }
    } else if (step === 6) {
      if (!userInfo.name) {
        alert('닉네임을 입력해주세요.');
      } else {
        // JSON 형태로 userInfo 객체를 문자열로 변환
        const userInfoJson = JSON.stringify(userInfo, null, 2);
        alert('가입이 완료되었습니다!\n' + userInfoJson);
        // 콘솔에 JSON 객체를 출력
        console.log('가입이 완료되었습니다!', userInfo);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePrevClick = () => {
    setStep(step - 1);
  };

  const isSelected = (gender: string) => userInfo.gender === gender;
  return (
    <signup.Container2>
      <signup.Header>
        {step !== 1 && (
          <img
            src="/assets/images/icons/material-symbols_arrow-back-ios-rounded.svg"
            alt="뒤로가기"
            onClick={handlePrevClick}
            width={20}
            height={20}
          />
        )}
        {/* {step != 3 && step < 3 ? (
          <signup.HeaderInner>개인화 추천({step}/2)</signup.HeaderInner>
        ) : ( */}

        <signup.HeaderInner>회원가입({step}/4)</signup.HeaderInner>
        {/* )} */}

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
            <signup.ImageContainer key={index}>
              <signup.ImagesIcon
                onClick={() => toggleGenre(item.genre)}
                style={{ opacity: opacityMap[item.genre] }}
              >
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

      {step === 3 && (
        <>
          <signup.Title2>성별을 선택해 주세요.</signup.Title2>
          <signup.Step3Container>
            <signup.ImageContainer2
              isSelected={isSelected('여성')}
              onClick={() => setUserInfo({ ...userInfo, gender: '여성' })}
            >
              <Image
                src="/assets/images/icons/join-2-woman.svg"
                alt="여성"
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
              <signup.GenderLabel isSelected={isSelected('여성')}>
                여성
              </signup.GenderLabel>
            </signup.ImageContainer2>
            <signup.ImageContainer2
              isSelected={isSelected('남성')}
              onClick={() => setUserInfo({ ...userInfo, gender: '남성' })}
            >
              <Image
                src="/assets/images/icons/join-2-man.svg"
                alt="남성"
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
              <signup.GenderLabel isSelected={isSelected('남성')}>
                남성
              </signup.GenderLabel>
            </signup.ImageContainer2>
          </signup.Step3Container>
        </>
      )}

      {step === 4 && (
        <>
          <signup.Title2>연령대를 선택해 주세요.</signup.Title2>
          <signup.SelectContainer>
            <p>선택하세요.</p>
            <signup.Select
              name="age"
              value={userInfo.age}
              onChange={(e) =>
                setUserInfo((prevUserInfo) => ({
                  ...prevUserInfo,
                  age: Number(e.target.value), // 나이를 숫자로 변환
                }))
              }
            >
              <AgeSelectOptions />
            </signup.Select>
            <signup.DropdownArrow />
          </signup.SelectContainer>
        </>
      )}

      {step === 5 && (
        <>
          <signup.Title2>회원님만을 위한 컨텐츠 준비 완료!</signup.Title2>
          <signup.Container>
            <ul>
              <li>
                <signup.Label>이메일</signup.Label>
                <EmailInput
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => ({
                      ...prevUserInfo,
                      email: e.target.value,
                    }))
                  }
                />
              </li>
              <li>
                <signup.Label>비밀번호</signup.Label>
                <signup.Input
                  type="password"
                  name="password"
                  autoComplete="false"
                  placeholder="비밀번호를 입력해 주세요"
                  value={userInfo.password}
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => ({
                      ...prevUserInfo,
                      password: e.target.value,
                    }))
                  }
                />
              </li>
              <li>
                <signup.Label>비밀번호 확인</signup.Label>
                <signup.Input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  value={userInfo.confirmPassword}
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => ({
                      ...prevUserInfo,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </li>
            </ul>
          </signup.Container>
        </>
      )}

      {step === 6 && (
        <>
          <signup.Title2>
            마지막 단계에요.
            <br /> 뭐라고 불러드릴까요?
          </signup.Title2>
          <signup.SelectContainer>
            <ul>
              <li>
                <signup.Label>닉네임</signup.Label>
                <signup.Input
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => ({
                      ...prevUserInfo,
                      name: e.target.value,
                    }))
                  }
                />
              </li>
            </ul>
          </signup.SelectContainer>
        </>
      )}

      <signup.Caption>
        {step === 4 &&
          '걱정 마세요, 개인정보는 콘텐츠를 추천하기 위해서만 사용할게요.'}
        {step === 3 && '회원님께 딱맞는 콘텐츠를 추천해 드릴게요.'}
        {step === 2 && '관심 있는 문장을 3개 이상 선택해 주세요.'}
        {step === 1 && `관심 있는 장르를 3개 이상 선택해 주세요.`}
      </signup.Caption>
      <signup.Button
        onClick={handleNextClick}
        disabled={
          (step === 1 && selectedGenres.length < 3) ||
          (step === 2 && selectedIndexes.length < 3)
          // || (step === 3 && !userInfo.gender)
        }
        style={{
          backgroundColor:
            (step === 1 && selectedGenres.length < 3) ||
            (step === 2 && selectedIndexes.length < 3)
              ? //|| (step === 3 && !userInfo.gender) ||
                // (step === 4 && !userInfo.age)
                'gray'
              : '#d7ff50',
        }}
      >
        {step === 2 ? '완료!' : '다음'}
      </signup.Button>
    </signup.Container2>
  );
};
export default SignupProcess;
