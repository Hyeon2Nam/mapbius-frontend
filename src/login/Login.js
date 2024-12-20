import React, { useState } from "react";
import "../style/Login.scss";
import { Link } from "react-router-dom";
import { tryLogin } from "../api/loginApi";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const loginHandler = () => {
    if (userId && userPw) {
      let obj = {
        id: userId,
        pw: userPw,
      };

      tryLogin(obj)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            console.log("Success~!~!!");
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            console.log("Wrong Id, Pw");
          }
        });
    } else {
      console.log("채워");
    }
  };

  return (
    <div className="login-container">
      <div className="img-wrapper"></div>
      <div className="login-info-wrapper">
        <div className="login-info">
          <span className="sub-title">아이디</span>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
          <span className="sub-title">비밀번호</span>
          <input
            type="password"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
          <div className="side-link-wrapper">
            <Link to={"/select-register"}>회원가입</Link>
            <div>
              <Link to={"/select-register"}>아이디 찾기</Link>
              <Link to={"/select-register"}>비밀번호 찾기</Link>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="default-btn" onClick={loginHandler}>
              로그인
            </button>
            <button className="kakao-btn">
              <img src={process.env.PUBLIC_URL + "/imgs/kakaoIcon.png"} />
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
      <img
        className="logo-img"
        src={process.env.PUBLIC_URL + "/imgs/logo.jpg"}
      />
    </div>
  );
}
