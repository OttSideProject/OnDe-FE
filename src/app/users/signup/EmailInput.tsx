import React, { ChangeEvent, useState } from 'react';
import signup from '@/styles/user/signup';
interface EmailInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onChange }) => {
  const [emailValue, setEmailValue] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);

  const frequencyEmails = [
    '@naver.com',
    '@gmail.com',
    '@daum.net',
    '@hanmail.net',
    '@yahoo.com',
    '@outlook.com',
    '@nate.com',
    '@kakao.com',
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    const userEmails = frequencyEmails.map((email) =>
      e.target.value.includes('@')
        ? e.target.value.split('@')[0] + email
        : e.target.value + email,
    );
    setEmailList(userEmails);
    onChange(e);
  };

  return (
    <>
      <signup.Input
        list="email"
        value={emailValue}
        placeholder="이메일을 입력하세요"
        onChange={handleChange}
      />
      <datalist id="email">
        {emailList &&
          emailList.map((email, idx) => <option value={email} key={idx} />)}
      </datalist>
    </>
  );
};

export default EmailInput;
