import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MypageSideMenu = () => {
  const location = useLocation();
  const [curPage, setCurPage] = useState("");

  useEffect(() => {
    setCurPage("/" + location.pathname.split("/")[2]);
  }, [location]);

  const sideMenuList = [
    { name: "즐겨찾기 목록", link: "/favorite-list" },
    { name: "후기 목록", link: "/reiew-list" },
    { name: "여행루트 리스트", link: "/trip-route-list" },
    { name: "개인정보 수정", link: "/edit-user-info" },
  ];
  const sideSmallMenuList = [
    { name: "회원정보 변경", link: "/edit-user-info" },
    { name: "회원탈퇴", link: "/user-leave" },
  ];

  return (
    <div className="mypage-side-menu">
      <div className="main-menu">
        {sideMenuList.map((e, i) => {
          return (
            <div key={e.name} className={curPage === e.link ? "curpage" : ""}>
              <Link to={"/mypage" + e.link}>{e.name}</Link>
            </div>
          );
        })}
      </div>
      <div className="sub-menu">
        {sideSmallMenuList.map((e, i) => {
          return (
            <div key={e.name} className={curPage === e.link ? "curpage" : ""}>
              <Link to={"/mypage" + e.link}>{e.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MypageSideMenu;
