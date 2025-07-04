import React, { useEffect, useState } from "react";
import "../style/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { tryLogin } from "../api/loginApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import base64 from "base-64";

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
      localStorage.removeItem("people1");
      localStorage.removeItem("userToken");
      localStorage.removeItem("loginUser");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("RegType");
    }
  }, []);

  const adminCheck = (token) => {
    let payload = token.substring(
      token.indexOf(".") + 1,
      token.lastIndexOf(".")
    );
    let dec = JSON.parse(base64.decode(payload));

    localStorage.setItem("RegType", dec.login_type);

    if (dec.role === "ROLE_ADMIN")
      localStorage.setItem("people1", "partsOfGun");
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("887dc7c589bdf89694a8b8969b1ca714");
      //const appkey = process.env.REACT_APP_JS_API_KEY + "";
      //window.Kakao.init(appkey);
    }
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      const redirectUri = "http://localhost:3000/kakao-register";
      window.Kakao.Auth.authorize({
        redirectUri: redirectUri,
      });
    }
  };

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
            adminCheck(res.data.token);
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("loginUser", res.data.objData);
            nav("/");
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setErrMsg("아이디와 비밀번호가 다릅니다");
            setOpen(true);
          } else if (e.status === 423) {
            setErrMsg("비활성화된 계정입니다.");
            setOpen(true);
          } else if (e.status === 500) {
            setErrMsg("존재하지 않는 아이디입니다.");
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginHandler();
              }
            }}
          />
          <div className="side-link-wrapper">
            <Link to={"/default-register"}>회원가입</Link>
            <div>
              <Link to={"/find-id"}>아이디 찾기</Link>
              <Link to={"/find-pw"}>비밀번호 찾기</Link>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="default-btn" onClick={loginHandler}>
              로그인
            </button>
            <button className="kakao-btn" onClick={handleKakaoLogin}>
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
