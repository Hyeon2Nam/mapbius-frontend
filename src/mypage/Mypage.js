import { Outlet } from "react-router-dom";
import MypageUserHeader from "./MypageUserHeader";
import MypageSideMenu from "./MypageSideMenu";

const Mypage = () => {
  return (
    <div className="mypage-container">
      <MypageUserHeader />
      <div>
        <MypageSideMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default Mypage;
