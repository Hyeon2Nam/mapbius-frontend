import React, { useEffect, useState } from "react";
import LoginCheckForm from "./LoginCheckForm";
import UserInfoEditForm from "./UserInfoEditForm";
import "../style/EditUserInfo.scss";
import { getUserInfo } from "../api/myPageApi";
import { useNavigate } from "react-router-dom";

const EditUserInfo = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfoHandler = async (pw) => {
    let obj = {
      pw: pw,
    };

    await getUserInfo(obj, localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data.objData);
          setIsLogin(true);
          console.log(res);
        }
      })
      .catch((e) => {
        if (e.status === 403) {
          alert("다시 로그인 해주세요");
          nav("/login");
        } else if (e.status === 404) {
          alert("비밀번호가 틀렸습니다");
        }
      });
  };

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("RegType") === "kakao") {
        await getUserInfoHandler("");
        setIsLogin(true);
      }
    };

    loadData();
  }, []);

  return (
    <div className="edit-user-info">
      <div className="big-section-title">회원정보 변경</div>
      {isLogin ? (
        <UserInfoEditForm originData={userInfo} />
      ) : (
        <LoginCheckForm getUserInfoHandler={getUserInfoHandler} />
      )}
    </div>
  );
};

export default EditUserInfo;
