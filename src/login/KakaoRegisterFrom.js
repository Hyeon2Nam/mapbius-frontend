import React, { useState } from "react";
import "../style/Register.scss";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { idDuplicateCheck, tryKakaoRegister } from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";

const KakaoRegisterFrom = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userNickName: "",
    date: "",
    gender: "",
  });
  const [snackbarType, setsnackbarType] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("#cd4d36");
  const customSx = {
    fontFamily: "malssami815",
    fontSize: "25px",
    backgroundColor: snackbarColor,
    color: "#fff",
    "& .MuiAlert-icon": {
      fontSize: "30px",
    },
  };

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
    let userNickName = userInfo.userNickName.trim();
    const { date, gender } = userInfo;
    const spaceRegx = /\s/g;
    const nicknameRegx = /^[가-힣a-zA-Z0-9]{2,8}$/;

    if (!(userNickName && date && gender)) {
      snackbarHandler("양식을 전부 기입해주세요");
      return true;
    }

    if (!nicknameRegx.test(userNickName) || userNickName.match(spaceRegx)) {
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
    const { userNickName, date, gender } = userInfo;

    if (validateHandler()) return;

    const obj = {
      nickName: userNickName,
      birthDate: date,
      gender: gender,
    };

    setOpen(false);

    tryKakaoRegister(obj, localStorage.getItem("jwtToken"))
      .then((res) => {
        if (res.status === 200) {
          alert("회원가입에 성공하셨습니다");
          nav("/");
        } else {
          snackbarHandler("회원가입에 실페했습니다.");
        }
      })
      .catch((e) => {
        snackbarHandler("회원가입에 실페했습니다.");
      });
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
          <Alert severity={snackbarType} variant="filled" sx={customSx}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>
      <div className="register-info-wrapper kakao-register">
        <h1>회원가입</h1>
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
    </div>
  );
};

export default KakaoRegisterFrom;
