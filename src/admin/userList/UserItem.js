import { useState } from "react";
import { sliceText } from "../../mypage/UtileFunc";

const UserItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="user-item">
      <div className="info-container">
        <div className="info-wrapper">
          <div className="id-wrapper">
            <img className="profile-img" src={item.img} alt="" />
            <div>
              {item.nickName}
              {" ("}
              {sliceText(item.id, 8, "ID")}
              {")"}
            </div>
          </div>
          <div className="modal-container">
            <button
              className="kebab-btn"
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/imgs/kebabIcon.png"}
                alt=""
              />
            </button>
            <div className={modalOpen ? "open-modal" : "none"}>
              <button>{item.isAdmin ? "관리자 해제" : "관리자 설정"}</button>
              <button>{item.isActive ? "비활성화" : "활성화"}</button>
            </div>
          </div>
        </div>
        <div>{item.email}</div>
        <div>
          후기 {item.review} {"(평균 "}
          {item.avg}
          {")"}
        </div>
        <div>마지막 접속일 {item.date}</div>
        <div className="auth-wrapper">
          <div>{item.isAdmin ? "관리자" : "일반유저"}</div>
          <div>{item.isActive ? "활성화" : "비활성화"}</div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
