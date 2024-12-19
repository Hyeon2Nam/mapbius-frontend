import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Auth from "./login/Auth";
import SelectRegisterWay from "./login/SelectRegisterWay";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/select-register" element={<SelectRegisterWay />} />
        <Route path="/default-register" element={<Register />} />
        <Route path="/kakao-register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/select-register"}>register</Link>
    </div>
  );
}

export default App;
