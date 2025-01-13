const UserItem = ({ item }) => {
  return (
    <div className="user-item">
      <div className="info-container">
        <div className="info-wrapper">
          <img className="profile-img" src={item.img} alt="" />
          <div className="id-wrapper">
            <div>{item.nickName}</div>
            <div>{item.id}</div>
            <div>{item.email}</div>
          </div>
        </div>
        <div className="auth-wrapper">
          <div>{item.isAdmin ? "관리자" : "일반유저"}</div>
          <div>{item.isActive ? "활성화" : "비활성화"}</div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
