import { Landing } from "@page/landing";
import { SingupPage } from '@page/user/SingupPage';
import { Routes, Route } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user/singup" element={<SingupPage />} />
      <Route path="*" element={<Landing />}></Route>
    </Routes>
  );
};
