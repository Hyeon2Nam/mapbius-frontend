import React from "react";
import "../style/Login.scss";
import { Link } from "react-router-dom";

// 임시!!!!!!!!!!
export default function MainPage() {
  return (
    <div>
      <h1>임시 메인 페이지 / 추후 지도 페이지로 수정!</h1>
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/select-register"}>register</Link>
      <br />
      <Link to={"/notice/1"}>공지사항</Link>
      <br />
      <Link to={"/mypage/main"}>마이페이지</Link>
    </div>
  );
}
