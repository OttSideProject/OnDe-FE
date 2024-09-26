import React, { ChangeEvent, useState } from 'react';
import signup from '@/styles/user/signup';

interface EmailInputProps {
  onChange: (email: string) => void; // 이메일 문자열을 전달
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
    const value = e.target.value;
    setEmailValue(value);
    const userEmails = frequencyEmails.map((email) =>
      value.includes('@') ? value.split('@')[0] + email : value + email,
    );
    setEmailList(userEmails);
    onChange(value); // 이메일 값만 전달
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
        {emailList.map((email, idx) => (
          <option value={email} key={idx} />
        ))}
      </datalist>
    </>
  );
};

export default EmailInput;
