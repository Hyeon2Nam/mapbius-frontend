import { useState } from "react";
import { sliceText } from "../../mypage/UtileFunc";
import { setUserActive, setUserRight } from "../../api/adminApi";

const UserItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [adminState, setAdminState] = useState(item.isAdmin);
  const [activeState, setactiveState] = useState(item.isActive);

  const adminHandler = () => {
    setAdminState(!adminState);

    let obj = {
      id: item.id,
    };

    setUserRight(obj, localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          alert("권한 설정 성공");
        } else {
          alert("권한 설정 실패");
        }
      })
      .catch((e) => {
        alert("권한이 없습니다");
      });
  };

  const activeHandler = () => {
    setactiveState(!activeState);

    let obj = {
      id: item.id,
    };

    setUserActive(obj, localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          alert("설정 성공");
        } else {
          alert("설정 실패");
        }
      })
      .catch((e) => {
        alert("권한이 없습니다");
      });
  };

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
              <button onClick={adminHandler}>
                {adminState ? "관리자 해제" : "관리자 설정"}
              </button>
              <button onClick={activeHandler}>
                {activeState ? "비활성화" : "활성화"}
              </button>
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
          <div>{adminState ? "관리자" : "일반유저"}</div>
          <div>{activeState ? "활성화" : "비활성화"}</div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
