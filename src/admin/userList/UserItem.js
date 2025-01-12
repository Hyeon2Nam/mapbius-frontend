const UserItem = ({ item }) => {
  return (
    <div>
      <div>{item.id}</div>
      <div>{item.nickName}</div>
      <div>{item.email}</div>
      <div>{item.isAdmin ? "관리자" : ""}</div>
      <div>{item.isActive ? "활성화" : "비활성화"}</div>
      <div>
        <img src={item.img} alt="" />
      </div>
    </div>
  );
};

export default UserItem;
