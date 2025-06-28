import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then((response) => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/logout`, {
        withCredentials: true, // 쿠키 포함 요청!
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          navigate("/login");
        } else {
          alert("로그아웃 하는데 실패 했습니다.");
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
