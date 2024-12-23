import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Auth from "./login/Auth";
import SelectRegisterWay from "./login/SelectRegisterWay";
import MainPage from "./map/Temp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-register" element={<SelectRegisterWay />} />
        <Route path="/default-register" element={<Register />} />
        <Route path="/kakao-register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
