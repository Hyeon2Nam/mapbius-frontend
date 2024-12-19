import { Link } from "react-router-dom";

export default function SelectRegisterWay() {
  // rest api 방식
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/auth";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoRegisterHandler = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <h1>가입 방법 선택</h1>
      <Link to={"/default-register"}>일반 회원가입</Link>
      <br />
      <button onClick={kakaoRegisterHandler}>Join KAKAO</button>
      <br />
    </div>
  );
}
