import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Auth from "./login/Auth";
import SelectRegisterWay from "./login/SelectRegisterWay";
import MainPage from "./map/Temp";
import Notice from "./Notice/NoticeBoard";
import NoticeDetail from "./Notice/NoticeDetail";
import NoticeCreate from "./Notice/NoticeCreate";
import UserInfoView from "./User/UserInfoView";
import UserInfoEdit from "./User/UserInfoEdit";
import FindId from "./login/FindId";
import FindPw from "./login/FindPw";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-register" element={<SelectRegisterWay />} />
        <Route path="/default-register" element={<Register />} />
        <Route path="/kakao-register" element={<Register />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-pw" element={<FindPw />} />
        <Route path="/notice/:page" element={<Notice />} />
        <Route path="/notice/view/:id" element={<NoticeDetail />} />
        <Route path="/notice/:mode/:id" element={<NoticeCreate />} />
        <Route path="/user-info/view" element={<UserInfoView />} />
        <Route path="/user-info/edit" element={<UserInfoEdit />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
