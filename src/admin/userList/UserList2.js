import UserItem2 from "./UserItem2";

const UserList2 = ({ list }) => {
  return (
    <div className="user-list-2">
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>닉네임</th>
            <th>아이디</th>
            <th>이메일</th>
            <th>권한</th>
            <th>활성</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr> */}
          {list.map((item, idx) => (
            <UserItem2 className="user-item-2" key={idx} item={item} />
          ))}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default UserList2;
