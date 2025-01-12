import UserItem from "./UserItem";

const UserList = ({ list }) => {
  return (
    <div>
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
          <tbody>
            <tr>
              {list.map((item, idx) => (
                <UserItem key={idx} item={item} />
              ))}
            </tr>
          </tbody>
        </thead>
      </table>
    </div>
  );
};

export default UserList;
