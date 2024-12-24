import React, { useState } from "react";
import "../style/Register.scss";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { tryRegister } from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
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
  const customSx = {
    fontFamily: "malssami815",
    fontSize: "25px",
    backgroundColor: "#cd4d36",
    color: "#fff",
    "& .MuiAlert-icon": {
      fontSize: "30px",
    },
  };
  const [idDuplicated, setIdDuplicated] = useState({
    isChecked: false,
    isDuplicated: false,
  });

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

  const snackbarHandler = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const validateHandler = () => {
    let { userId, userPw, userPwCheck, userEmail, userNickName, date, gender } =
      userInfo;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const idRegex = /^[a-z0-9-_]{5,20}$/g;
    const pwRegx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const spaceRegx = /\s/g;
    const nicknameRegx = /^[가-힣a-zA-Z0-9]{2,8}$/;

    userId = userId.trim();
    userPw = userPw.trim();
    userEmail = userEmail.trim();
    userNickName = userNickName.trim();

    if (!(userId && userPw && userEmail && userNickName && date && gender)) {
      snackbarHandler("양식을 전부 기입해주세요");
      return true;
    }

    if (!idDuplicated.isChecked) {
      snackbarHandler("아이디 중복 체크를 해주세요");
      return true;
    } else if (idDuplicated.isDuplicated) {
      snackbarHandler("중복된 아이디는 사용하실 수 없습니다");
      return true;
    }

    if (userPw !== userPwCheck) {
      snackbarHandler("비밀번호가 일치하지 않습니다");
      return true;
    } else if (!idRegex.test(userId) || userId.match(spaceRegx)) {
      snackbarHandler("아이디를 제대로 작성해주세요");
      return true;
    } else if (!pwRegx.test(userPw) || userPw.match(spaceRegx)) {
      snackbarHandler("비밀번호를 제대로 작성해주세요");
      return true;
    } else if (!emailRegex.test(userEmail) || userEmail.match(spaceRegx)) {
      snackbarHandler("이메일을 제대로 작성해주세요");
      return true;
    } else if (
      !nicknameRegx.test(userNickName) ||
      userNickName.match(spaceRegx)
    ) {
      snackbarHandler("닉네임을 제대로 작성해주세요");
      return true;
    }

    if (!(gender === "male" || gender === "female")) return true;

    if (isValidDate(date)) {
      snackbarHandler("유효하지 않은 날짜입니다");
      return true;
    }

    return false;
  };

  const isValidDate = (userDate) => {
    const date = new Date(userDate);

    if (isNaN(date.getTime())) return true;

    const today = new Date();
    if (date.getTime() > today.getTime()) {
      return true;
    }

    return false;
  };

  const registerHandler = () => {
    const { userId, userPw, userEmail, userNickName, date, gender } = userInfo;

    if (validateHandler()) return;

    console.log("OK");

    const obj = {
      id: userId,
      pw: userPw,
      email: userEmail,
      nickname: userNickName,
      birth: date,
      gender: gender,
    };

    setOpen(false);
    // tryRegister(obj).then((res) => {
    //   if (res.status === 200) {
    //     console.log(res);
    //     console.log("success");
    //     nav("/");
    //   }
    // });
  };

  const duplicateCheck = () => {
    setIdDuplicated({ isChecked: true, idDuplicated: false });
  };

  return (
    <div className="register-container">
      <Link to={"/"}>
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + "/imgs/logo.jpg"}
        />
      </Link>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "transparent",
            },
          }}
          onClose={() => setOpen(false)}
        >
          <Alert severity="error" variant="filled" sx={customSx}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>
      <div className="register-info-wrapper">
        <h1>회원가입</h1>
        <div className="id-wrapper sub-title">
          <div>아이디</div>
          <input type="button" value={"중복확인"} onClick={duplicateCheck} />
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
        <button onClick={registerHandler}>완료</button>
      </div>
      <img
        className="back-img"
        src={process.env.PUBLIC_URL + "/imgs/registerBack.png"}
      />
      {/* <div className="under-back"></div> */}
    </div>
  );
}
