import FavoriteItem from "./FavoriteItem";

const FavoriteList = ({ list }) => {
  return (
    <div className="favorite-list">
      {list.map((item, index) => (
        <FavoriteItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FavoriteList;
