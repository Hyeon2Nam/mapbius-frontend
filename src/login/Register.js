import React, { useState } from "react";
import "../style/Register.scss";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userEmail: "",
    userNickName: "",
    date: "",
    gender: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");

  const maxDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const dateString = year + "-" + month + "-" + day;

    return dateString;
  };

  const userInfoHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const tryRegister = () => {
    const {
      userId,
      userPw,
      userPwCheck,
      userEmail,
      userNickName,
      date,
      gender,
    } = userInfo;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!(userId && userPw && userEmail && userNickName && date && gender)) {
      setErrMsg("양식을 전부 기입해주세요");
      setOpen(true);
      return;
    }

    if (userPw !== userPwCheck) {
      setErrMsg("비밀번호가 일치하지 않습니다");
      setOpen(true);
      return;
    } else if (!emailRegex.test(userEmail)) {
      setErrMsg("이메일을 제대로 작성해주세요");
      setOpen(true);
      return;
    }

    setOpen(false);
  };

  return (
    <div className="register-container">
      <img
        className="logo-img"
        src={process.env.PUBLIC_URL + "/imgs/logo.jpg"}
      />
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>
      <div className="register-info-wrapper">
        <h1>회원가입</h1>
        <div className="id-wrapper sub-title">
          <div>아이디</div>
          <input type="button" value={"중복확인"} />
        </div>
        <input
          className="info-input"
          name="userId"
          value={userInfo.userId}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">비밀번호</div>
        <input
          className="info-input"
          name="userPw"
          type="password"
          value={userInfo.userPw}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">비밀번호 확인</div>
        <input
          className="info-input"
          name="userPwCheck"
          type="password"
          value={userInfo.userPwCheck}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">이메일</div>
        <input
          className="info-input"
          name="userEmail"
          type="email"
          value={userInfo.userEmail}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">닉네임</div>
        <input
          className="info-input"
          name="userNickName"
          value={userInfo.userNickName}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">생년월일 / 성별</div>
        <div className="list-wrapper">
          <input
            type="date"
            name="date"
            value={userInfo.date}
            onChange={(e) => userInfoHandler(e)}
            max={maxDate()}
          />
          <select
            name="gender"
            onChange={(e) => userInfoHandler(e)}
            defaultValue={"성별"}
          >
            <option disabled>성별</option>
            <option value={"male"}>남</option>
            <option value={"female"}>여</option>
          </select>
        </div>
        <button onClick={tryRegister}>Register</button>
      </div>
      <img
        className="back-img"
        src={process.env.PUBLIC_URL + "/imgs/registerBack.png"}
      />
      {/* <div className="under-back"></div> */}
    </div>
  );
}
