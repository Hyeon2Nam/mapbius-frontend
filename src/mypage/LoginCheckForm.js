import { useState } from "react";

const LoginCheckForm = ({ getUserInfoHandler }) => {
  const [pw, setPw] = useState("");

  return (
    <div className="login-form">
      <div className="gray-text">
        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해
        주세요.
      </div>
      <div className="pw-check-form">
        <div className="id-section">
          <span>아이디</span>
          <span className="id-text">{"ID"}</span>
        </div>
        <div className="divide-section"></div>
        <div className="pw-section">
          <span>비밀번호</span>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getUserInfoHandler(pw);
              }
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          getUserInfoHandler(pw);
        }}
      >
        확인
      </button>
    </div>
  );
};

export default LoginCheckForm;
