import React, { useEffect } from "react";
import { kakaoRegister, tryKakaoLogin } from "../api/loginApi";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const nav = useNavigate();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      tryKakaoLogin(authorizationCode)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.objData);
            alert("카카오 계정으로 회원가입을 진행합니다.");
            localStorage.setItem("jwtToken", res.data.objData);
            nav("/kakao-register/form");
          } else if (res.status === 404) {
            // console.log(res.data.objData);
            alert("카카오 계정으로 로그인 합니다.");
            localStorage.setItem("jwtToken", res.data.objData);
          }
        })
        .catch((e) => {
          alert("회원가입 실패");
        });
    }
  };

  return <></>;
};

export default KakaoLogin;
