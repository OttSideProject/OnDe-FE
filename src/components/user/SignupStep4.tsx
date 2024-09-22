import signup from '@/styles/user/signup';
import { UserInfo } from '../../app/users/signup/constants';
import AgeSelectOptions from '../../app/users/signup/AgeSelect';

interface SignupStep4Props {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
}

const SignupStep4 = ({ userInfo, setUserInfo }: SignupStep4Props) => (
  <signup.Container>
    <signup.Title2>출생 연도를 선택해 주세요.</signup.Title2>
    <signup.SelectContainer>
      <p>출생년도</p>
      <signup.Select
        name="age"
        value={userInfo.age}
        onChange={(e) => setUserInfo({ age: Number(e.target.value) })}
      >
        <AgeSelectOptions />
      </signup.Select>
      <signup.DropdownArrow />
    </signup.SelectContainer>
  </signup.Container>
);

export default SignupStep4;
