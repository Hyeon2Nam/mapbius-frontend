import { useState } from "react";
import { getTodayDateText } from "../mypage/UtileFunc";
import { plusHeartCnt } from "../api/mapApi";

const ReviewItem = ({ item }) => {
  const [likeCnt, setLikeCnt] = useState(item.heartCount ? item.heartCount : 0);

  const heartClickHandler = () => {
    let obj = {
      reviewId: item.reviewId,
    };

    if (item.userId === localStorage.getItem("loginUser")) {
      alert("본인이 작성한 후기는 추천을 누를 수 없습니다.");
      return;
    }

    setLikeCnt(likeCnt + 1);

    plusHeartCnt(obj, localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 201) {
          alert(res.data.message);
          setLikeCnt(likeCnt - 1);
        } else if (res.status === 202) {
          alert(res.data.message);
        } else if (res.status === 200) {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        if (e.status === 403) {
          alert("로그인해주세요");
          window.location = "/login";
        }
      });
  };

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
          <button onClick={heartClickHandler}>
            <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          </button>
          <span>{likeCnt}</span>
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
