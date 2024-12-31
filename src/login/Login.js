import React, { useEffect, useState } from "react";
import "../style/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { tryLogin } from "../api/loginApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
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

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      nav("/");
    }
  }, []);

  const loginHandler = () => {
    if (userId && userPw) {
      let obj = {
        id: userId,
        pw: userPw,
      };

      tryLogin(obj)
        .then((res) => {
          if (res.status === 200) {
            setOpen(false);
            localStorage.setItem("userToken", res.data.token);
            // nav("/");
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setErrMsg("아이디와 비밀번호가 다릅니다");
            setOpen(true);
          }
        });
    } else {
      setErrMsg("아이디와 비밀번호를 입력해주세요");
      setOpen(true);
    }
  };

  return (
    <div className="login-container">
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
      <div className="img-wrapper"></div>
      <div className="login-info-wrapper">
        <div className="login-info">
          <span className="sub-title">아이디</span>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
          <span className="sub-title">비밀번호</span>
          <input
            type="password"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
          <div className="side-link-wrapper">
            <Link to={"/select-register"}>회원가입</Link>
            <div>
              <Link to={"/find-id"}>아이디 찾기</Link>
              <Link to={"/find-pw"}>비밀번호 찾기</Link>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="default-btn" onClick={loginHandler}>
              로그인
            </button>
            <button className="kakao-btn">
              <img src={process.env.PUBLIC_URL + "/imgs/kakaoIcon.png"} />
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
      <Link to={"/"}>
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + "/imgs/logo.jpg"}
        />
      </Link>
    </div>
  );
}
