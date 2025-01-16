import ReviewItem from "./ReviewItem";

const ReviewList = ({ list }) => {
  return (
    <div className="review-list">
      {list.map((item, index) => (
        <ReviewItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ReviewList;
