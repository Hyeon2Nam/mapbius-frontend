import { useEffect, useState } from "react";
import UserList from "./UserList";
import "../../style/UserBoard.scss";
import { Link } from "react-router-dom";
import { getAllUserList } from "../../api/adminApi";

const UserBoard = () => {
  const [search, setSearch] = useState("");
  const [curpage, setCurpage] = useState(1);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("people1") !== "partsOfGun") {
      window.location = "/";
    } else {
      getItemList();
    }
  }, []);

  const getItemList = async () => {
    getAllUserList(localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data.objData);
        }
      })
      .catch((e) => {
        alert("다시 로그인 해주세요");
        window.location = "/";
      });
  };

  const searchNoticeHandler = () => {
    setCurpage(1);
    getItemList();
  };

  return (
    <div className="user-board-list">
      <div className="side-bar">
        <div className="admin-wrapper">
          <img src={process.env.PUBLIC_URL + "/imgs/userIcon.png"} alt="" />
        </div>
        <span>관리자</span>
      </div>
      <div className="main-container">
        <div className="header-menu">
          <Link to={"/"}>홈페이지</Link>
          <Link to={"/login"}>로그아웃</Link>
        </div>
        <div className="big-section-title">
          <div className="upside">
            <span>사용자 관리</span>
            <div className="search">
              <input
                type="text"
                value={search}
                placeholder="아이디 입력"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchNoticeHandler();
                  }
                }}
              />
              <button onClick={searchNoticeHandler}>
                <img src={process.env.PUBLIC_URL + "/imgs/searchIcon.png"} />
              </button>
            </div>
          </div>
        </div>
        <UserList list={userList} />
      </div>
    </div>
  );
};

export default UserBoard;
