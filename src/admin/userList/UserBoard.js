import { useEffect, useState } from "react";
import UserList from "./UserList";
import "../../style/UserBoard.scss";
import { Link } from "react-router-dom";

const UserBoard = () => {
  const [search, setSearch] = useState("");
  const [curpage, setCurpage] = useState(1);

  // useEffect(() => {
  //   if (localStorage.getItem("people") !== "partsOfGun") {
  //     window.location = "/";
  //   }
  // }, []);

  const dump = [
    {
      id: "23ssssss1k3k545k7k8k",
      nickName: "1ddddd23",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      review: 1,
      avg: 3.0,
      date: "2024-01-01",
    },
    {
      id: "asdfasdf2",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      review: 3,
      avg: 2.0,
      date: "2024-01-11",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: false,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      review: 5,
      avg: 3.5,
      date: "2024-01-05",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: true,
      isActive: false,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      review: 56,
      avg: 2,
      date: "2024-12-23",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      review: 0,
      avg: 0.0,
      date: "2024-01-07",
    },
  ];

  const getItemList = async () => {
    // await getItemWithPage({
    //   curpage: curpage,
    //   keyword: search,
    //   type: searchType,
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setNoticeList(res.data.objData.items);
    //       setMaxpage(res.data.objData.maxpage);
    //     }
    //   })
    //   .catch((e) => {});
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
        <UserList list={dump} />
      </div>
    </div>
  );
};

export default UserBoard;
