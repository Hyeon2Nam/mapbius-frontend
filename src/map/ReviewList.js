import ReviewItem from "./ReviewItem";

const ReviewList = ({ list }) => {
  return (
    <div className="review-list">
      {list ? (
        list.map((item, index) => <ReviewItem key={index} item={item} />)
      ) : (
        <div>후기가 없습니다</div>
      )}
    </div>
  );
};

export default ReviewList;
