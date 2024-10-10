import signup from '@/styles/user/signup';
import { UserInfo } from '../../app/users/signup/constants';
interface SignupStep6Props {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
}
const SignupStep6 = ({ userInfo, setUserInfo }: SignupStep6Props) => (
  <signup.Container>
    <signup.Title2>
      마지막 단계에요.
      <br /> 뭐라고 불러드릴까요?
    </signup.Title2>
    <signup.Input
      type="text"
      value={userInfo.name}
      onChange={(e) => setUserInfo({ name: e.target.value })}
      placeholder="닉네임"
    />
  </signup.Container>
);

export default SignupStep6;
