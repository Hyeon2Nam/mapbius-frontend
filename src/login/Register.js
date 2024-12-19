import React, { useState } from "react";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userEmail: "",
    userNickName: "",
  });

  const userInfoHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const tryRegister = () => {
    const { userId, userPw, userPwCheck, userEmail, userNickName } = userInfo;

    if (userPw !== userPwCheck) {
      console.log("wrong");
      return;
    }
    if (userId && userPw && userEmail && userNickName) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <span>ID : </span>
      <input
        name="userId"
        placeholder="ID"
        value={userInfo.userId}
        onChange={(e) => userInfoHandler(e)}
      />
      <br />
      <span>PW : </span>
      <input
        name="userPw"
        type="password"
        placeholder="PW"
        value={userInfo.userPw}
        onChange={(e) => userInfoHandler(e)}
      />
      <br />
      <span>PW Check : </span>
      <input
        name="userPwCheck"
        type="password"
        placeholder="PW check"
        value={userInfo.userPwCheck}
        onChange={(e) => userInfoHandler(e)}
      />
      <br />
      <span>EMAIL : </span>
      <input
        name="userEmail"
        type="email"
        placeholder="EMAIL"
        value={userInfo.userEmail}
        onChange={(e) => userInfoHandler(e)}
      />
      <br />
      <span>nickname : </span>
      <input
        name="userNickName"
        placeholder="nickname"
        value={userInfo.userNickName}
        onChange={(e) => userInfoHandler(e)}
      />
      <br />
      <button onClick={tryRegister}>Register</button>
    </div>
  );
}
