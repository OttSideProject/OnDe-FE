import signup from '@/styles/user/signup';
import { UserInfo } from '../../app/users/signup/constants';

interface SignupStep3Props {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
}

const SignupStep3 = ({ userInfo, setUserInfo }: SignupStep3Props) => (
  <signup.Container>
    <signup.Title2>성별을 선택해 주세요.</signup.Title2>
    <signup.Step3Container>
      <signup.ImageContainer2
        isSelected={userInfo.gender === 'female'}
        onClick={() => setUserInfo({ gender: 'female' })}
      >
        <img
          src="/assets/images/icons/join-2-woman.svg"
          alt="female"
          width={100}
          height={100}
        />
        <signup.GenderLabel isSelected={userInfo.gender === 'female'}>
          여성
        </signup.GenderLabel>
      </signup.ImageContainer2>
      <signup.ImageContainer2
        isSelected={userInfo.gender === 'male'}
        onClick={() => setUserInfo({ gender: 'male' })}
      >
        <img
          src="/assets/images/icons/join-2-man.svg"
          alt="male"
          width={100}
          height={100}
        />
        <signup.GenderLabel isSelected={userInfo.gender === 'male'}>
          남성
        </signup.GenderLabel>
      </signup.ImageContainer2>
    </signup.Step3Container>
  </signup.Container>
);

export default SignupStep3;
