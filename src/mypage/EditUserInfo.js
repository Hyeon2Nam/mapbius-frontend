import React, { useState } from "react";
import LoginCheckForm from "./LoginCheckForm";
import UserInfoEditForm from "./UserInfoEditForm";
import "../style/EditUserInfo.scss";

const EditUserInfo = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="edit-user-info">
      <div className="big-section-title">회원정보 변경</div>
      {isLogin ? (
        <UserInfoEditForm />
      ) : (
        <LoginCheckForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default EditUserInfo;
