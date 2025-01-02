import { useNavigate } from "react-router-dom";
import "../style/Header.scss";

export default function Header() {
  const nav = useNavigate();

  return (
    <div className="header-container">
      <img
        className="logo-img"
        src={process.env.PUBLIC_URL + "/imgs/logoFit.jpg"}
        onClick={() => {
          nav("/");
        }}
      />
    </div>
  );
}
