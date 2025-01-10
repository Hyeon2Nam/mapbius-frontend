import React, { useEffect } from "react";
import { kakaoRegister } from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";

export default function SelectRegisterWay() {
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      localStorage.removeItem("people1");
      localStorage.removeItem("userToken");
      localStorage.removeItem("loginUser");
    }
  }, []);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const appkey = process.env.REACT_APP_JS_API_KEY + "";
      window.Kakao.init(appkey);
      //   console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
    }
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      const redirectUri = "http://192.168.20.124:3000/kakao-register";

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri,
      });
    }
  };

  return (
    <div>
      <h1>가입 방법 선택</h1>
      <Link to={"/default-register"}>일반 회원가입</Link>
      <br />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          onClick={handleKakaoLogin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#FEE500",
            color: "#000",
            border: "none",
            borderRadius: "4px",
          }}
        >
          카카오로그인!
        </button>
      </div>
    </div>
  );
}
