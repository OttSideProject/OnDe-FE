import signup from '@/styles/user/signup';
import { UserInfo } from '../../app/users/signup/constants';

interface SignupStep5Props {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

const SignupStep5 = ({ userInfo, setUserInfo }: SignupStep5Props) => (
  <signup.Container>
    <signup.Title2>회원님만을 위한 컨텐츠 준비 완료!</signup.Title2>
    <ul>
      <li>
        <signup.Label>이메일</signup.Label>
        <signup.Input
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </li>
      <li>
        <signup.Label>비밀번호</signup.Label>
        <signup.Input
          type="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </li>
      <li>
        <signup.Label>비밀번호 확인</signup.Label>
        <signup.Input
          type="password"
          value={userInfo.confirmPassword}
          onChange={(e) =>
            setUserInfo({ ...userInfo, confirmPassword: e.target.value })
          }
        />
      </li>
    </ul>
  </signup.Container>
);

export default SignupStep5;
