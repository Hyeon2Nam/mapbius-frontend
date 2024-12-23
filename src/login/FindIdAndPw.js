import React, { useState } from "react";
import { findId, findPw } from "../api/loginApi";

export default function FindIdAndPw() {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");

  const findIdHandler = () => {
    let obj = {
      email: userEmail,
    };
    console.log(obj);

    // findId(obj).then((res) => {
    //   if (res.status === 200) {
    // console.log(res);
    //   }
    // });
  };

  const findPwHandler = () => {
    let obj = {
      id: userId,
      email: userEmail,
    };

    console.log(obj);
    // findPw(obj).then((res) => {
    //   if (res.status === 200) {
    // console.log(res);
    //   }
    // });
  };

  return (
    <div>
      <h1>아이디 찾기</h1>
      <input
        placeholder="EMAIL"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={findIdHandler}>확인</button>
      <div>
        결과
        {result}
      </div>
      <hr />
      <h1>비밀번호 찾기</h1>
      <input
        placeholder="ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        placeholder="EMAIL"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={findPwHandler}>확인</button>
      <div>
        결과
        {result}
      </div>
    </div>
  );
}
