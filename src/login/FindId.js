import React, { useState } from "react";
import { findId, findPw } from "../api/loginApi";
import { Link } from "react-router-dom";
import "../style/FindIdPw.scss";

export default function FindId() {
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");

  const findIdHandler = () => {
    let obj = {
      email: userEmail,
    };
    console.log(obj);

    // findId(obj).then((res) => {
    //   if (res.status === 200) {
    // console.log(res);
    //   }
    // });
  };

  return (
    <div className="find-idpwForm">
      <div className="find-form-wrapper">
        <h1>아이디 찾기</h1>
        <input
          className="find-input"
          placeholder="이메일"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button className="find-btn" onClick={findIdHandler}>
          확인
        </button>
        <div className="move-link">
          <Link to={"/select-register"}>회원가입</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
      </div>
      <div>결과</div>
    </div>
  );
}
