import { getTodayDateText } from "../mypage/UtileFunc";

const ReviewItem = ({ item }) => {
  return (
    <div className="review-item">
      <div className="head-section">
        <div className="profile-section">
          <img src={item.profileImage} alt="" />
          <div>
            <div>{item.userNm}</div>
            <div>
              {!item.date || item.date === "" ? getTodayDateText() : item.date}
            </div>
          </div>
        </div>
        <div className="like-btn">
          <button>
            <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          </button>
          <span>{0}</span>
        </div>
      </div>
      <div className="content-section">
        <div className="rate-section">
          <img
            className="rating-img"
            src={
              process.env.PUBLIC_URL + "/imgs/starRate" + item.rating + ".png"
            }
            alt=""
          />
          <span>{item.rating}</span>
          <span>평균별점 {item.rating}</span>
        </div>
        <div>{item.content}</div>
      </div>
    </div>
  );
};
export default ReviewItem;
