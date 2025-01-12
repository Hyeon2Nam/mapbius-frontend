import UserItem from "./UserItem";

const UserList = ({ list }) => {
  return (
    <div>
      {list.map((item, idx) => (
        <UserItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default UserList;
