import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import SelectRegisterWay from "./login/SelectRegisterWay";
import MainPage from "./map/Temp";
import Notice from "./Notice/NoticeBoard";
import NoticeDetail from "./Notice/NoticeDetail";
import NoticeCreate from "./Notice/NoticeCreate";
import UserInfoView from "./User/UserInfoView";
import UserInfoEdit from "./User/UserInfoEdit";
import FindId from "./login/FindId";
import FindPw from "./login/FindPw";
import Header from "./common/Header";
import KakaoLogin from "./login/KakaoLogin";
import KakaoRegisterFrom from "./login/KakaoRegisterFrom";
import Mypage from "./mypage/Mypage";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-pw" element={<FindPw />} />
          <Route path="/notice/:page" element={<Notice />} />
          <Route path="/notice/view/:id" element={<NoticeDetail />} />
          <Route path="/notice/:mode/:id" element={<NoticeCreate />} />
          <Route element={<Mypage />}>
            <Route path="/mypage/main" element={<UserInfoEdit />} />
            <Route path="/mypage/user-info" element={<UserInfoEdit />} />
          </Route>
        </Route>

        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-register" element={<SelectRegisterWay />} />
        <Route path="/default-register" element={<Register />} />
        <Route path="/kakao-register" element={<KakaoLogin />} />
        <Route path="/kakao-register/form" element={<KakaoRegisterFrom />} />
      </Routes>
    </div>
  );
}

export default App;
