import React, { useEffect } from "react";
import { kakaoRegister } from "../api/loginApi";
import axios from "axios";
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
      kakaoRegister(authorizationCode)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.objData);
            alert("카카오 계정으로 회원가입을 진행합니다.");
            localStorage.setItem("jwtToken", res.data.objData);
            nav("/");
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
