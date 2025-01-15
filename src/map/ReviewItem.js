const ReviewItem = ({ item }) => {
  return (
    <div>
      {item.nickName}
      {item.rate}
    </div>
  );
};
export default ReviewItem;
