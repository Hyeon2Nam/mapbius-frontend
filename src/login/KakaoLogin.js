import React, { useEffect, useState } from "react";
import { tryKakaoLogin } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import base64 from "base-64";
import { accountKakaoLink } from "../api/myPageApi";

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

    localStorage.setItem("RegType", dec.login_type);
    localStorage.setItem("loginUser", dec.sub);

    if (dec.role === "ROLE_ADMIN")
      localStorage.setItem("people1", "partsOfGun");
  };

  const handleCallback = async () => {
    console.log(1);

    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    console.log("auth code : " + authorizationCode);

    if (authorizationCode && localStorage.getItem("RegType") !== "normal") {
      tryKakaoLogin(authorizationCode)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("jwtToken", res.data.objData);
            nav("/kakao-register/form");
          } else if (res.status === 226) {
            alert("로그인 성공");
            adminCheck(res.data.objData);
            localStorage.setItem("userToken", res.data.objData);
            nav("/");
          }
        })
        .catch((e) => {
          console.log(e);

          if (e.status >= 400) {
            alert("회원가입 실패");
            nav("/login");
          }
        });
    } else if (
      authorizationCode &&
      localStorage.getItem("RegType") === "normal"
    ) {
      accountKakaoLink(
        { code: authorizationCode },
        localStorage.getItem("userToken")
      )
        .then((res) => {
          if (res.status === 200) {
            alert("계정 통합에 성공하였습니다");
            nav("/mypage/edit-user-info");
            localStorage.setItem("RegType", "kakao");
          } else {
            alert("오류가 발생하였습니다");
            nav("/");
          }
        })
        .catch((e) => {
          if (e.status === 403) {
            alert("로그인 정보가 없습니다");
            nav("/login");
          } else {
            alert("오류가 발생하였습니다");
            nav("/");
          }
        });
    }
  };

  return <></>;
};

export default KakaoLogin;
