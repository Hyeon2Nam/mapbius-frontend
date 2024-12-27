import React, { useState } from "react";
import { findId, findPw } from "../api/loginApi";
import { Link } from "react-router-dom";
import "../style/FindIdPw.scss";

export default function FindPw() {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");

  const findPwHandler = () => {
    let obj = {
      id: userId,
      email: userEmail,
    };

    console.log(obj);
    // findPw(obj).then((res) => {
    //   if (res.status === 200) {
    // console.log(res);
    //   }
    // });
  };

  return (
    <div className="find-idpwForm">
      <div className="find-form-wrapper">
        <h1>비밀번호 찾기</h1>
        <div className="input-wrapper">
          <input
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            placeholder="EMAIL"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <button className="find-btn" onClick={findPwHandler}>
          확인
        </button>
        <div className="move-link">
          <Link to={"/select-register"}>회원가입</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
        <div>
          결과
          {result}
        </div>
      </div>
    </div>
  );
}
