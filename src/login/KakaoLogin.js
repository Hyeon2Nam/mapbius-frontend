import React, { useEffect, useState } from "react";
import { tryKakaoLogin } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import base64 from "base-64";

const KakaoLogin = () => {
  const nav = useNavigate();

  useEffect(() => {
    handleCallback();
  }, []);

  const adminCheck = (token) => {
    let payload = token.substring(
      token.indexOf(".") + 1,
      token.lastIndexOf(".")
    );
    let dec = JSON.parse(base64.decode(payload));

    if (dec.role === "ROLE_ADMIN")
      localStorage.setItem("people1", "partsOfGun");
  };

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      tryKakaoLogin(authorizationCode)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("jwtToken", res.data.objData);
            nav("/kakao-register/form");
          } else if (res.status === 226) {
            // console.log(res.data.objData);
            alert("로그인 성공");
            adminCheck(res.data.token);
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("loginUser", res.data.objData.id);
            localStorage.setItem("jwtToken", res.data.objData);
            nav("/");
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
