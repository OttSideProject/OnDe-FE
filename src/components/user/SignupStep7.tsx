import signup from '@/styles/user/signup';
import React, { useEffect, useState } from 'react';

interface SignupStep7Props {
  setUserInfo: (info: { termsAgree: boolean }) => void;
  userInfo: { termsAgree: boolean };
}

const SignupStep7: React.FC<SignupStep7Props> = ({ setUserInfo, userInfo }) => {
  const [termsAgree, setTermsAgree] = useState(userInfo.termsAgree || false);

  const [showModal, setShowModal] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const handleTermsAgree = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setTermsAgree(true);
    setUserInfo({ termsAgree: true });
    setShowModal(false); 
  };

  useEffect(() => {
    fetch('/privacy-policy.txt')
      .then((response) => response.text())
      .then((data) => {
        setPrivacyPolicy(data);
      })
      .catch((error) => console.error('Error fetching privacy policy:', error));
  }, []);

  return (
    <signup.Container>
      <signup.Title2>
        서비스 이용에 꼭 필요한 <br />
        약관 동의를 해주세요.
      </signup.Title2>

      <signup.ImageContainer7
        isSelected={termsAgree}
        onClick={handleTermsAgree}
      >
        <div>
          <img
           src={
            termsAgree
              ? "/assets/images/icons/check-box-icon.svg"
              : "/assets/images/icons/check-box-icon-before.svg" 
            }
            alt="check"
            width={16}
            height={16}
          />
          <signup.GenderLabel isSelected={termsAgree}>
            [필수]개인정보수집 및 이용 동의  
          </signup.GenderLabel>
        </div>
        <img
          src="/assets/images/icons/next.svg"
          alt="check"
          width={24}
          height={24}
        />
      </signup.ImageContainer7>

      {/* 모달 */}
      {showModal && (
        <signup.Overlay>
          <signup.Modal>
            <h2>개인정보수집 및 이용 동의</h2>
            <pre>{privacyPolicy}
              <signup.Button onClick={handleCloseModal}     style={{backgroundColor:'#D7FF50'}}>
                확인했어요
              </signup.Button>
            </pre>
          </signup.Modal>
        </signup.Overlay>
      )}
    </signup.Container>
  );
};

export default SignupStep7;
