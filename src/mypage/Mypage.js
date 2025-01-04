import { Outlet } from "react-router-dom";
import MypageUserHeader from "./MypageUserHeader";

const Mypage = () => {
  return (
    <div>
      <MypageUserHeader />
      <Outlet />
    </div>
  );
};

export default Mypage;
