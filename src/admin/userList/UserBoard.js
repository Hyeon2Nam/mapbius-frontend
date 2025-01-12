import { useEffect } from "react";
import UserList from "./UserList";
import "../../style/UserBoard.scss";

const UserBoard = () => {
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
    },
    {
      id: "12s3",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
  ];

  return (
    <div className="user-board-list">
      <div className="side-bar">
        <div className="admin-wrapper">
          <img src={process.env.PUBLIC_URL + "/imgs/userIcon.png"} alt="" />
        </div>
        <span>관리자</span>
      </div>
      <div className="main-container">
        <div className="big-section-title">사용자 관리</div>
        <UserList list={dump} />
      </div>
    </div>
  );
};

export default UserBoard;
