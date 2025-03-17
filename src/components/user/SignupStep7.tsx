import signup from '@/styles/user/signup';
import React, { useEffect, useState } from 'react';

const SignupStep7 = () => {
  const [termsAgree, setTermsAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const handleTermsAgree = () => {
    setShowModal(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setTermsAgree(true); // 체크박스를 선택 상태로 설정
    setShowModal(false); // 모달 닫기
  };

  // PrivacyPolicy 컴포넌트 대신 useEffect 내에서 파일을 읽어옴
  useEffect(() => {
    // public 폴더 내의 privacy-policy.txt 파일을 가져옵니다
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

      <signup.ImageContainer2
        isSelected={termsAgree}
        onClick={handleTermsAgree}
      >
        <img
          src="/assets/images/icons/check.svg"
          alt="check"
          width={100}
          height={100}
        />
        <signup.GenderLabel isSelected={termsAgree}>
          개인정보수집 및 이용 동의
        </signup.GenderLabel>
      </signup.ImageContainer2>

      {/* 모달 */}
      {showModal && (
        <signup.Overlay>
          <signup.Modal>
            <h2>개인정보수집 및 이용 동의</h2>
            <pre>{privacyPolicy}</pre> {/* 약관 내용 표시 */}
            <signup.ModalButton onClick={handleCloseModal}>
              동의하고 닫기
            </signup.ModalButton>
          </signup.Modal>
        </signup.Overlay>
      )}
    </signup.Container>
  );
};

export default SignupStep7;
