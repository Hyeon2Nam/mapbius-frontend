import { useState } from "react";

export default function UserInfoEdit() {
  const [userInfo, setUserInfo] = useState({
    userId: "mapbius",
    userPw: "123",
    userEmail: "mapbius@gmail.com",
    nickname: "mapbius",
    date: "2000-01-01",
  });

  const userInfoHandlerr = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    // console.log(articleInfo);
  };

  const userInfoChangeHandler = () => {
    let obj = {
      pw: userInfo.userPw,
      email: userInfo.userEmail,
      nickname: userInfo.nickname,
    };
  };

  return (
    <div>
      <h1>사용자 정보 수정</h1>
      <h4>ID</h4>
      <input disabled value={userInfo.userId} />
      <h4>비밀번호</h4>
      <input
        name="userPw"
        onChange={userInfoHandlerr}
        value={userInfo.userPw}
      />
      <h4>이메일</h4>
      <input
        name="userEmail"
        onChange={userInfoHandlerr}
        value={userInfo.userEmail}
      />
      <h4>닉네임</h4>
      <input
        name="nickname"
        onChange={userInfoHandlerr}
        value={userInfo.nickname}
      />
      <h4>성별별</h4>
      <input type="radio" value={"남"} disabled />남
      <input type="radio" value={"여"} checked disabled />여<h4>생년월일</h4>
      <input type="date" disabled value={userInfo.date} />
      <button onClick={userInfoChangeHandler}>수정하기</button>
    </div>
  );
}
