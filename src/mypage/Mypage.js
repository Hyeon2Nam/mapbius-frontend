import { Outlet } from "react-router-dom";
import MypageUserHeader from "./MypageUserHeader";
import MypageSideMenu from "./MypageSideMenu";
import "../style/mypageCommon.scss";
import { useRef } from "react";

const Mypage = () => {
  return (
    <div className="mypage-container">
      <MypageUserHeader />
      <div className="bottom-contents">
        <MypageSideMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default Mypage;
