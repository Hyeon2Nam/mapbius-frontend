import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import MainPage from "./map/Temp";
import Notice from "./Notice/NoticeBoard";
import NoticeDetail from "./Notice/NoticeDetail";
import NoticeCreate from "./Notice/NoticeCreate";
import FindId from "./login/FindId";
import FindPw from "./login/FindPw";
import Header from "./common/Header";
import KakaoLogin from "./login/KakaoLogin";
import KakaoRegisterFrom from "./login/KakaoRegisterFrom";
import Mypage from "./mypage/Mypage";
import MypageMainCardList from "./mypage/MyPageMainCardList";
import EditUserInfo from "./mypage/EditUserInfo";
import FavoritePage from "./mypage/favorite/FavoritePage";
import ReviewPage from "./mypage/review/ReviewPage";
import TripListPage from "./mypage/trip/TripListPage";
import MapTest from "./MapAPI/Maptest";
import Sidebar from "./MapAPI/sidebar1";
import Distance from "./MapAPI/calculatePolylineDistance";
import UserBoard from "./admin/userList/UserBoard";
import TripBoard from "./Trip/TripBoard";
import Footer from "./common/Footer";
import TempMap from "./map/TempMap";
import ChatPage from "./map/ChatPage";

const Layout = () => {
  return (
    <div className="common-layout">
      <Header />
      <Outlet className="content-section" />
      <Footer />
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

          <Route path="/trip/:page" element={<TripBoard />} />
          <Route path="/temp/chat" element={<ChatPage />} />

          <Route element={<Mypage />}>
            <Route path="/mypage/main" element={<MypageMainCardList />} />
            <Route path="/mypage/edit-user-info" element={<EditUserInfo />} />
            <Route path="/mypage/reiew-list" element={<ReviewPage />} />
            <Route path="/mypage/trip-route-list" element={<TripListPage />} />
            <Route path="/mypage/favorite-list" element={<FavoritePage />} />
          </Route>
        </Route>

        <Route path="/" element={<MapTest />} />
        <Route path="/test" element={<MapTest />} />
        <Route path="/Distance" element={<Distance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/default-register" element={<Register />} />
        <Route path="/kakao-register" element={<KakaoLogin />} />
        <Route path="/kakao-register/form" element={<KakaoRegisterFrom />} />
        <Route path="/admin/user-list" element={<UserBoard />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/temp/test" element={<TempMap />} />
      </Routes>
    </div>
  );
}

export default App;
