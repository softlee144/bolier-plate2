import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

// 인증이 적용된 컴포넌트 래핑
const ProtectedLanding = Auth(LandingPage, null);
const ProtectedLogin = Auth(LoginPage, false);
const ProtectedRegister = Auth(RegisterPage, false);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedLanding />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
