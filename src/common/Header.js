import { useNavigate } from "react-router-dom";
import "../style/Header.scss";
import LogoutIcon from "@mui/icons-material/Logout";

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
      <LogoutIcon
        fontSize="large"
        onClick={() => {
          window.location = "/login";
        }}
      />
    </div>
  );
}
