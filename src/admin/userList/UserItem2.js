const UserItem2 = ({ item }) => {
  return (
    <tr>
      <td>
        <img className="profile-img" src={item.img} alt="" />
      </td>
      <td>{item.nickName}</td>
      <td>{item.id}</td>
      <td>{item.email}</td>
      <td>{item.isAdmin ? "관리자" : "일반유저"}</td>
      <td>{item.isActive ? "활성화" : "비활성화"}</td>
    </tr>
  );
};

export default UserItem2;
