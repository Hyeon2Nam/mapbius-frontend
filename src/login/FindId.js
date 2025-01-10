import React, { useState } from "react";
import { findId } from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import "../style/FindIdPw.scss";

export default function FindId() {
  const nav = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");
  const [openModal, setopenModal] = useState(false);

  const findIdHandler = () => {
    let obj = {
      email: userEmail,
    };

    findId(obj)
      .then((res) => {
        if (res.status === 200) {
          setResult(res.data.id);
          setopenModal(true);
        } else {
          setResult("조회된 결과가 없습니다");
        }
      })
      .catch((e) => {
        setResult("조회된 결과가 없습니다");
        setopenModal(true);
      });
  };

  const modalCloseHandler = () => {
    setopenModal(false);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              findIdHandler();
            }
          }}
        />
        <button className="find-btn" onClick={findIdHandler}>
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
            <h1>회원님의 아이디를 확인해주세요</h1>
            <span className="result-text">{result}</span>
            <div className="result-btn">
              <button className="short-btn" onClick={() => nav("/login")}>
                로그인
              </button>
              <button className="long-btn" onClick={() => nav("/find-pw")}>
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
