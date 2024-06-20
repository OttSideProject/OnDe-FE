import { Landing } from '@page/landing';
import { SingupPage } from '@page/users/SingupPage';
import { Routes, Route } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/singup" element={<SingupPage />} />
      <Route path="*" element={<Landing />}></Route>
    </Routes>
  );
};
