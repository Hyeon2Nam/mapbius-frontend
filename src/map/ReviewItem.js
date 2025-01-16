const ReviewItem = ({ item }) => {
  return (
    <div className="review-item">
      <div className="head-section">
        <div className="profile-section">
          <img src={item.profileImg} alt="" />
          <div>
            <div>{item.nickName}</div>
            <div>{item.date}</div>
          </div>
        </div>
        <div className="like-btn">
          <button>
            <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          </button>
          <span>{item.like}</span>
        </div>
      </div>
      <div className="content-section">
        <div className="rate-section">
          <img
            className="rating-img"
            src={process.env.PUBLIC_URL + "/imgs/starRate" + item.rate + ".png"}
            alt=""
          />
          <span>{item.rate}</span>
          <span>평균별점</span>
          <span>{item.avgRate}</span>
        </div>
        <div>{item.content}</div>
      </div>
    </div>
  );
};
export default ReviewItem;
