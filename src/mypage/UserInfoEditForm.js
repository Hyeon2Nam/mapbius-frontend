import React, { useEffect, useState } from "react";
import { emailDuplicateCheck } from "../api/loginApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserInfoEditForm = ({ originData }) => {
  const [userInfo, setUserInfo] = useState({
    birthDate: "",
    email: "",
    gender: "",
    id: "",
    kakaoId: null,
    nickName: "",
    profileImage: null,
    pw: "",
  });
  const [kakaoReg, setKakaoReg] = useState(false);

  const [emailDuplicated, setEmailDuplicated] = useState({
    isChecked: false,
    isDuplicated: false,
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

  useEffect(() => {
    setUserInfo({ ...originData, userPwCheck: "" });

    if (localStorage.getItem("RegType") === "kakao") {
      setKakaoReg(true);
    }
  }, []);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const appkey = process.env.REACT_APP_JS_API_KEY + "";
      window.Kakao.init(appkey);
    }
  }, []);

  const kakaoLinkHandler = () => {
    if (window.Kakao && window.Kakao.Auth) {
      const redirectUri = "http://localhost:3000/kakao-register";
      window.Kakao.Auth.authorize({
        redirectUri: redirectUri,
      });
    }
  };

  const userInfoHandler = (e) => {
    const { name, value } = e.target;

    if (name === "email")
      setEmailDuplicated({ isChecked: false, isDuplicated: false });

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const userInfoChangeHandler = () => {
    let obj = {
      pw: kakaoReg ? "" : userInfo.pw,
      email: kakaoReg ? "" : userInfo.email,
      nickName: userInfo.nickName,
    };

    if (validateHandler()) return;

    setOpen(false);

    // tryRegister(obj)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       nav("/");
    //     } else {
    //       snackbarHandler("회원가입에 실페했습니다.");
    //     }
    //   })
    //   .catch((e) => {
    //     snackbarHandler("회원가입에 실페했습니다.");
    //   });
  };

  const emailDuplicateCheckHandler = () => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const spaceRegx = /\s/g;
    let email = userInfo.email.trim();

    if (!email) return;
    if (!emailRegex.test(email) || email.match(spaceRegx)) return;

    let obj = {
      email: userInfo.email,
    };

    emailDuplicateCheck(obj)
      .then((res) => {
        if (res.status === 200) {
          setsnackbarType("success");
          setSnackbarColor("#26913b");
          snackbarHandler("사용가능한 이메일 입니다.");
          setEmailDuplicated({ isChecked: true, idDuplicated: false });
        } else {
          setsnackbarType("error");
          setSnackbarColor("#cd4d36");
          snackbarHandler("중복된 이메일 입니다.");
          setEmailDuplicated({ isChecked: true, idDuplicated: true });
        }
      })
      .catch((e) => {
        setsnackbarType("error");
        setSnackbarColor("#cd4d36");
        snackbarHandler("중복된 이메일 입니다.");
        setEmailDuplicated({ isChecked: true, idDuplicated: true });
      });
  };

  const snackbarHandler = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const validateHandler = () => {
    let pw, email, nickName;
    const { userPwCheck } = userInfo;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const pwRegx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const spaceRegx = /\s/g;
    const nicknameRegx = /^[가-힣a-zA-Z0-9]{2,8}$/;

    setsnackbarType("error");
    setSnackbarColor("#cd4d36");

    if (!(userInfo.pw && userInfo.email && userInfo.nickName)) {
      snackbarHandler("양식을 전부 기입해주세요");
      return true;
    }

    pw = userInfo.pw.trim();
    email = userInfo.email.trim();
    nickName = userInfo.nickName.trim();

    if (!emailDuplicated.isChecked) {
      snackbarHandler("이메일 중복 체크를 해주세요");
      return true;
    } else if (emailDuplicated.isDuplicated) {
      snackbarHandler("중복된 이메일은 사용하실 수 없습니다");
      return true;
    }

    if (pw !== userPwCheck) {
      snackbarHandler("비밀번호가 일치하지 않습니다");
      return true;
    } else if (!pwRegx.test(pw) || pw.match(spaceRegx)) {
      snackbarHandler("비밀번호를 제대로 작성해주세요");
      return true;
    } else if (!emailRegex.test(email) || email.match(spaceRegx)) {
      snackbarHandler("이메일을 제대로 작성해주세요");
      return true;
    } else if (!nicknameRegx.test(nickName) || nickName.match(spaceRegx)) {
      snackbarHandler("닉네임을 제대로 작성해주세요");
      return true;
    }

    return false;
  };

  const userBirthFormat = () => {
    const date = new Date(userInfo.birthDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  const kakaoUnlinkHandler = () => {};

  const profileImgeChangeHandler = () => {};

  return (
    <div className="user-info-edit-from">
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
      <div className="user-info-section">
        <table>
          <tbody>
            <tr>
              <td color="2">
                <button onClick={profileImgeChangeHandler}>
                  프로필 사진 변경
                </button>
              </td>
            </tr>
            <tr>
              <td className="sub-title">닉네임</td>
              <td>
                <input
                  type="text"
                  name="nickName"
                  onChange={userInfoHandler}
                  value={userInfo.nickName || ""}
                />
              </td>
            </tr>

            {kakaoReg === false && (
              <>
                <tr>
                  <td className="sub-title ">ID</td>
                  <td>{userInfo.id}</td>
                </tr>
                <tr>
                  <td className="sub-title">비밀번호</td>
                  <td>
                    <input
                      name="pw"
                      type="password"
                      onChange={userInfoHandler}
                      value={userInfo.pw || ""}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="sub-title">비밀번호 확인</td>
                  <td>
                    <input
                      name="userPwCheck"
                      type="password"
                      onChange={userInfoHandler}
                      value={userInfo.userPwCheck || ""}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="sub-title">이메일</td>
                  <td>
                    <input
                      name="email"
                      type="text"
                      onChange={userInfoHandler}
                      value={userInfo.email || ""}
                    />
                  </td>

                  <td>
                    <input
                      type="button"
                      value={"중복 확인"}
                      onClick={emailDuplicateCheckHandler}
                    />
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td className="sub-title">성별</td>
              <td>{userInfo.gender === "male" ? "남성" : "여성"}</td>
            </tr>
            <tr>
              <td className="sub-title">생년월일</td>
              <td>{userBirthFormat()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="big-section-title">계정 연결하기</div>
      <div className="account-link-section">
        <div className="kakao-link">
          <div>
            <img src={process.env.PUBLIC_URL + "/imgs/kakaoLogoIcon.png"} />
            <div>카카오톡</div>
          </div>
          <button
            onClick={
              userInfo.isKakaoLink ? kakaoUnlinkHandler : kakaoLinkHandler
            }
          >
            {userInfo.kakaoId !== null ? "연결해제" : "계졍연결"}
          </button>
        </div>
      </div>
      <div className="btn-wrapper">
        <button
          className="reset-btn"
          onClick={() => {
            setUserInfo({ ...originData, userPwCheck: "" });
          }}
        >
          취소
        </button>
        <button className="edit-btn" onClick={userInfoChangeHandler}>
          수정
        </button>
      </div>
    </div>
  );
};

export default UserInfoEditForm;
