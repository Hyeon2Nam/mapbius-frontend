import React, { useState } from "react";
import { findPw } from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import "../style/FindIdPw.scss";

export default function FindPw() {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");
  const [openModal, setopenModal] = useState(false);

  const findPwHandler = () => {
    let obj = {
      id: userId,
      email: userEmail,
    };

    findPw(obj)
      .then((res) => {
        if (res.status === 200) {
          setopenModal(true);
          setResult("가입하신 이메일을 확인해주세요");
        } else {
          setopenModal(true);
          setResult("가입정보를 다시 한 번 확인해 주세요");
        }
      })
      .catch((e) => {
        setopenModal(true);
        setResult("가입정보를 다시 한 번 확인해 주세요");
      });
  };

  const modalCloseHandler = () => {
    setopenModal(false);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findPwHandler();
              }
            }}
          />
        </div>
        <button className="find-btn" onClick={findPwHandler}>
          확인
        </button>
        <div className="move-link">
          <Link to={"/select-register"}>회원가입</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
      </div>
      <div className={openModal ? "result-form" : "none"}>
        <div className="form-wrapper">
          <button className="close-btn" onClick={modalCloseHandler}>
            X
          </button>
          <div className="info-container">
            <span className="result-text">{result}</span>
            <div className="result-btn">
              <button className="short-btn" onClick={() => nav("/login")}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
