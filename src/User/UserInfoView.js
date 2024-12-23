import { Link } from "react-router-dom";

export default function UserInfoView() {
  return (
    <div>
      <h1>회원 정보</h1>
      <table border={1}>
        <tr>
          <td>ID</td>
          <td>asdfsadf</td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td>변경하기</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>dkjshfakjsdhf@gmail.com</td>
        </tr>
        <tr>
          <td>닉네임</td>
          <td>가나다라</td>
        </tr>
        <tr>
          <td>생년월일</td>
          <td>2000-01-01</td>
        </tr>
        <tr>
          <td>성별</td>
          <td>남 | 여</td>
        </tr>
        <tr>
          <td>카카오 연동</td>
          <td>연동 완료 | 연동 하기</td>
        </tr>
      </table>

      <Link to={"/user-info/edit"}>
        <button>수정하기</button>
      </Link>
    </div>
  );
}
