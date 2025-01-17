import React, { useState } from "react";
import "../style/Register.scss";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  emailDuplicateCheck,
  idDuplicateCheck,
  tryRegister,
} from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import { getTodayDateText } from "../mypage/UtileFunc";

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
  const [idDuplicated, setIdDuplicated] = useState({
    isChecked: false,
    isDuplicated: false,
  });
  const [emailDuplicated, setEmailDuplicated] = useState({
    isChecked: false,
    isDuplicated: false,
  });

  // const maxDate = () => {
  //   const today = new Date();

  //   const year = today.getFullYear();
  //   const month = (today.getMonth() + 1).toString().padStart(2, "0");
  //   const day = today.getDate().toString().padStart(2, "0");

  //   const dateString = year + "-" + month + "-" + day;

  //   return dateString;
  // };

  const userInfoHandler = (e) => {
    const { name, value } = e.target;

    if (name === "userId")
      setIdDuplicated({ isChecked: false, isDuplicated: false });
    else if (name === "userEmail")
      setEmailDuplicated({ isChecked: false, isDuplicated: false });

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
    let userId, userPw, userEmail, userNickName;
    const { userPwCheck, date, gender } = userInfo;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const idRegex = /^[a-z0-9-_]{5,20}$/g;
    const pwRegx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const spaceRegx = /\s/g;
    const nicknameRegx = /^[가-힣a-zA-Z0-9]{2,8}$/;

    if (
      !(
        userInfo.userId &&
        userInfo.userPw &&
        userInfo.userEmail &&
        userInfo.userNickName &&
        date &&
        gender
      )
    ) {
      snackbarHandler("양식을 전부 기입해주세요");
      return true;
    }

    userId = userInfo.userId.trim();
    userPw = userInfo.userPw.trim();
    userEmail = userInfo.userEmail.trim();
    userNickName = userInfo.userNickName.trim();

    if (!idDuplicated.isChecked) {
      snackbarHandler("아이디 중복 체크를 해주세요");
      return true;
    } else if (idDuplicated.isDuplicated) {
      snackbarHandler("중복된 아이디는 사용하실 수 없습니다");
      return true;
    }

    if (!emailDuplicated.isChecked) {
      snackbarHandler("이메일 중복 체크를 해주세요");
      return true;
    } else if (emailDuplicated.isDuplicated) {
      snackbarHandler("중복된 이메일은 사용하실 수 없습니다");
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

    const obj = {
      id: userId,
      pw: userPw,
      email: userEmail,
      nickName: userNickName,
      birthDate: date,
      gender: gender,
    };

    setOpen(false);

    tryRegister(obj)
      .then((res) => {
        if (res.status === 200) {
          nav("/");
        } else {
          snackbarHandler("회원가입에 실페했습니다.");
        }
      })
      .catch((e) => {
        snackbarHandler("회원가입에 실페했습니다.");
      });
  };

  const idDuplicateCheckHandler = () => {
    if (!userInfo.userId || !userInfo.userId.trim()) return;

    let obj = {
      id: userInfo.userId,
    };

    idDuplicateCheck(obj)
      .then((res) => {
        if (res.status === 200) {
          setsnackbarType("success");
          setSnackbarColor("#26913b");
          snackbarHandler("사용가능한 아이디 입니다.");
          setIdDuplicated({ isChecked: true, idDuplicated: false });
        } else {
          snackbarHandler("중복된 아이디 입니다.");
          setIdDuplicated({ isChecked: true, idDuplicated: true });
        }
      })
      .catch((e) => {
        snackbarHandler("중복된 아이디 입니다.");
        setIdDuplicated({ isChecked: true, idDuplicated: true });
      });

    setsnackbarType("error");
    setSnackbarColor("#cd4d36");
  };

  const emailDuplicateCheckHandler = () => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const spaceRegx = /\s/g;
    let userEmail = userInfo.userEmail.trim();

    if (!userEmail) return;
    if (!emailRegex.test(userEmail) || userEmail.match(spaceRegx)) return;

    let obj = {
      email: userInfo.userEmail,
    };

    emailDuplicateCheck(obj)
      .then((res) => {
        if (res.status === 200) {
          setsnackbarType("success");
          setSnackbarColor("#26913b");
          snackbarHandler("사용가능한 이메일 입니다.");
          setEmailDuplicated({ isChecked: true, idDuplicated: false });
        } else {
          snackbarHandler("중복된 이메일 입니다.");
          setEmailDuplicated({ isChecked: true, idDuplicated: true });
        }
      })
      .catch((e) => {
        snackbarHandler("중복된 이메일 입니다.");
        setEmailDuplicated({ isChecked: true, idDuplicated: true });
      });

    setsnackbarType("error");
    setSnackbarColor("#cd4d36");
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
      <div className="register-info-wrapper">
        <h1>회원가입</h1>
        <div className="id-wrapper sub-title">
          <div>
            아이디{" "}
            <span>
              (5글자 이상 20글자이하 영어 소문자, 숫자, _, -로만 조합)
            </span>
          </div>
          <input
            type="button"
            value={"중복확인"}
            onClick={idDuplicateCheckHandler}
          />
        </div>
        <input
          className="info-input"
          name="userId"
          value={userInfo.userId}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">
          비밀번호{" "}
          <span>
            (8글자 이상 20글자이하 영어 대소문자, 숫자, 특수문자로 조합. 각 1개
            이상 필수 포함)
          </span>
        </div>
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
        <div className="id-wrapper sub-title">
          <div>이메일</div>
          <input
            type="button"
            value={"중복확인"}
            onClick={emailDuplicateCheckHandler}
          />
        </div>
        <input
          className="info-input"
          name="userEmail"
          type="email"
          value={userInfo.userEmail}
          onChange={(e) => userInfoHandler(e)}
        />
        <br />
        <div className="sub-title">
          닉네임{" "}
          <span>
            (2글자 이상 8글자이하 한글, 영어 대소문자, 숫자로만 조합.)
          </span>
        </div>
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
            max={getTodayDateText()}
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
