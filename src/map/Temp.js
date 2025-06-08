import React from "react";
import "../style/Login.scss";
import { Link } from "react-router-dom";

// 임시!!!!!!!!!!
export default function MainPage() {
  return (
    <div>
      <h1>임시 메인 페이지 / 추후 지도 페이지로 수정!</h1>
      <Link to={"/test"}>MAP</Link>
      <br />
      <Link to={"/Distance"}>선의 거리재기</Link>
      <br/>
      <Link to={"/Sidebar"}>sidebar</Link>
      <br/>
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/notice/1"}>공지사항</Link>
      <br />
      <Link to={"/mypage/main"}>마이페이지</Link>
      <br />
      <Link to={"/trip/1"}>여행 루트 검색</Link>
      <br />
      <Link to={"/admin/user-list"}>관리자 : 유저 관리</Link>
      <br />
      <Link to={"/temp/test"}>장소 정보 컴포넌트 테스트</Link>
    </div>
  );
}
