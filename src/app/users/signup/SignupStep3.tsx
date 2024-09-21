import signup from '@/styles/user/signup';
import { UserInfo } from './constants';

interface SignupStep3Props {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
}

const SignupStep3 = ({ userInfo, setUserInfo }: SignupStep3Props) => (
  <signup.Container>
    <signup.Title2>성별을 선택해 주세요.</signup.Title2>
    <signup.Step3Container>
      <signup.ImageContainer2
        isSelected={userInfo.gender === '여성'}
        onClick={() => setUserInfo({ gender: '여성' })}
      >
        <img
          src="/assets/images/icons/join-2-woman.svg"
          alt="여성"
          width={100}
          height={100}
        />
        <signup.GenderLabel isSelected={userInfo.gender === '여성'}>
          여성
        </signup.GenderLabel>
      </signup.ImageContainer2>
      <signup.ImageContainer2
        isSelected={userInfo.gender === '남성'}
        onClick={() => setUserInfo({ gender: '남성' })}
      >
        <img
          src="/assets/images/icons/join-2-man.svg"
          alt="남성"
          width={100}
          height={100}
        />
        <signup.GenderLabel isSelected={userInfo.gender === '남성'}>
          남성
        </signup.GenderLabel>
      </signup.ImageContainer2>
    </signup.Step3Container>
  </signup.Container>
);

export default SignupStep3;
