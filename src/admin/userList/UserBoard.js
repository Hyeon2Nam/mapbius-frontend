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
      id: "123",
      nickName: "123",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: true,
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
  ];

  return (
    <div>
      <UserList list={dump} />
    </div>
  );
};

export default UserBoard;
