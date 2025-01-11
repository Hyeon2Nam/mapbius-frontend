import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { leaveAccount } from "../api/myPageApi";

const MypageSideMenu = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [curPage, setCurPage] = useState("/");
  const [openModal, setopenModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setCurPage("/" + location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setopenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const sideMenuList = [
    { name: "즐겨찾기 목록", link: "/favorite-list" },
    { name: "후기 목록", link: "/reiew-list" },
    { name: "여행루트 리스트", link: "/trip-route-list" },
    { name: "개인정보 수정", link: "/edit-user-info" },
  ];
  const sideSmallMenuList = [
    { name: "회원정보 변경", link: "/edit-user-info" },
  ];

  const leaveAccountHanlder = () => {
    leaveAccount(localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          alert("성공적으로 탈퇴되었습니다");
          setopenModal(false);
          nav("/");
        } else {
          alert("탈퇴 실패. 나중에 다시 시도해주세요");
        }
      })
      .catch((e) => {
        alert("탈퇴 실패. 나중에 다시 시도해주세요");
      });
  };

  return (
    <div className="mypage-side-menu">
      <div className="main-menu">
        {sideMenuList.map((e, i) => (
          <div key={e.name} className={curPage === e.link ? "curpage" : ""}>
            <Link to={"/mypage" + e.link}>{e.name}</Link>
          </div>
        ))}
      </div>
      <div className="sub-menu">
        {sideSmallMenuList.map((e, i) => (
          <div key={e.name} className={curPage === e.link ? "curpage" : ""}>
            <Link to={"/mypage" + e.link}>{e.name}</Link>
          </div>
        ))}
        <div
          onClick={() => {
            setopenModal(true);
          }}
        >
          회원탈퇴
        </div>
      </div>
      <div className={openModal ? "result-form" : "none"}>
        <div className="form-wrapper" ref={modalRef}>
          <div className="info-container">
            <h1>탈퇴하시겠습니까?</h1>
            <div className="result-btn">
              <button
                className="short-btn"
                onClick={() => {
                  setopenModal(false);
                }}
              >
                취소
              </button>
              <button className="long-btn" onClick={leaveAccountHanlder}>
                탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageSideMenu;
