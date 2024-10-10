'use client';
import LoadingIndicator from '../../../components/user/LoadingIndicator';
import Api from '@/api/core/Api';
import { useReducer } from 'react';
import SignupStep1 from '../../../components/user/SignupStep1';
import SignupStep2 from '../../../components/user/SignupStep2';
import SignupStep3 from '../../../components/user/SignupStep3';
import SignupStep4 from '../../../components/user/SignupStep4';
import SignupStep5 from '../../../components/user/SignupStep5';
import SignupStep6 from '../../../components/user/SignupStep6';
import signup from '@/styles/user/signup';
import { initialGenres, genres_setp2 } from './constants';
import Image from 'next/image';

interface UserInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  genres: string[];
  sentence: string;
}

interface State {
  step: number;
  selectedGenres: { genreId: number; genreName: string }[];
  selectedIndexes: number[];
  userInfo: UserInfo;
  loading: boolean;
}

const initialState: State = {
  step: 1,
  selectedGenres: [],
  selectedIndexes: [],
  userInfo: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: 2000,
    genres: [],
    sentence: '',
  },
  loading: false,
};

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'TOGGLE_GENRE': {
      const { genreId, genreName } = action.payload;
      const genreExists = state.selectedGenres.some(
        (genre) => genre.genreId === genreId,
      );
      return {
        ...state,
        selectedGenres: genreExists
          ? state.selectedGenres.filter((g) => g.genreId !== genreId)
          : [...state.selectedGenres, { genreId, genreName }],
      };
    }
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'TOGGLE_INDEX':
      return {
        ...state,
        selectedIndexes: state.selectedIndexes.includes(action.payload)
          ? state.selectedIndexes.filter((i) => i !== action.payload)
          : [...state.selectedIndexes, action.payload],
      };
    default:
      return state;
  }
}

const SignupProcess = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, selectedGenres, selectedIndexes, userInfo, loading } = state;

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setUserInfo = (info: Partial<UserInfo>) => {
    dispatch({ type: 'UPDATE_USER_INFO', payload: info });
  };

  const handleNextClick = () => {
    if (step === 1) {
      if (selectedGenres.length < 3) {
        alert('장르를 3개 이상 선택해 주세요.');
      } else {
        dispatch({ type: 'SET_STEP', payload: step + 1 });
      }
    } else if (step === 2) {
      if (selectedIndexes.length < 3) {
        alert('문장을 3개 이상 선택해 주세요.');
      } else {
        dispatch({ type: 'SET_STEP', payload: step + 1 });
      }
    } else if (step === 3) {
      if (!userInfo.gender) {
        alert('성별을 선택해 주세요.');
      } else {
        dispatch({ type: 'SET_STEP', payload: step + 1 });
      }
    } else if (step === 4) {
      if (userInfo.age === 2000) {
        alert('출생 연도를 선택해 주세요.');
      } else {
        dispatch({ type: 'SET_STEP', payload: step + 1 });
      }
    } else if (step === 5) {
      if (
        !userInfo.email ||
        !userInfo.password ||
        userInfo.password !== userInfo.confirmPassword
      ) {
        alert('유효한 이메일과 비밀번호를 입력해 주세요.');
      } else {
        dispatch({ type: 'SET_STEP', payload: step + 1 });
      }
    } else if (step === 6) {
      if (!userInfo.name) {
        alert('닉네임을 입력해주세요.');
      } else {
        const preferGenreList = selectedGenres.map((genre) => genre.genreId);

        const requestData = {
          userId: userInfo.email,
          password: userInfo.password,
          age: userInfo.age,
          gender: userInfo.gender,
          nickname: userInfo.name,
          nationality: '대한민국',
          email: userInfo.email,
          preferGenreList: preferGenreList,
        };

        setLoading(true);

        Api.post('users/join', requestData)
          .then((response) => {
            console.log('회원가입 완료:', response.data);
            alert('가입이 완료되었습니다!');
            setTimeout(() => {
              location.href = '/';
            }, 1000);
          })
          .catch((error) => {
            console.error('회원가입 중 에러 발생:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const handlePrevClick = () => {
    if (step > 1) {
      dispatch({ type: 'SET_STEP', payload: step - 1 });
    }
  };

  const handleSelect = (index: number) => {
    dispatch({ type: 'TOGGLE_INDEX', payload: index });
  };

  return (
    <signup.Container2>
      {loading ? (
        <signup.LoadingContainer>
          <LoadingIndicator />
          <p>
            {' '}
            회원가입이 완료 됐어요!
            <br />{' '}
            <Image
              src={'/assets/images/icons/logo-onde.svg'}
              alt="OndeLogo"
              width={100}
              height={100}
              style={{
                display: 'inline',
                verticalAlign: 'middle',
              }}
            />{' '}
            로 바로 이동할게요.
          </p>
        </signup.LoadingContainer>
      ) : (
        <>
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
            <signup.HeaderInner>회원가입({step}/6)</signup.HeaderInner>
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
            <SignupStep1
              genres={initialGenres}
              selectedGenres={selectedGenres}
              toggleGenre={(genreId, genreName) =>
                dispatch({
                  type: 'TOGGLE_GENRE',
                  payload: { genreId, genreName },
                })
              }
            />
          )}

          {step === 2 && (
            <SignupStep2
              genres={genres_setp2}
              selectedIndexes={selectedIndexes}
              handleSelect={handleSelect}
            />
          )}
          {step === 3 && (
            <SignupStep3 userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
          {step === 4 && (
            <SignupStep4 userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
          {step === 5 && (
            <SignupStep5 userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
          {step === 6 && (
            <SignupStep6 userInfo={userInfo} setUserInfo={setUserInfo} />
          )}

          {!loading && (
            <signup.BottomPoint>
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
                }
                style={{
                  backgroundColor:
                    (step === 1 && selectedGenres.length < 3) ||
                    (step === 2 && selectedIndexes.length < 3)
                      ? 'gray'
                      : '#d7ff50',
                }}
              >
                {step === 6 ? '완료!' : '다음'}
              </signup.Button>
            </signup.BottomPoint>
          )}
        </>
      )}
    </signup.Container2>
  );
};

export default SignupProcess;
