import { useEffect, useState } from "react";
import { sliceText } from "../UtileFunc";

const ReviewItem = ({ item }) => {
  const [likeCnt, setLikeCnt] = useState(0);
  const [alreadClick, setAlreadClick] = useState(false);

  useEffect(() => {
    setLikeCnt(item.like);
  }, []);

  const updateLikeCnt = () => {
    if (alreadClick) {
      alert("이미 좋아요를 하셨습니다.");
      return;
    }

    setLikeCnt(likeCnt + 1);
    setAlreadClick(true);
  };

  return (
    <div className="review-item">
      <img className="cover-img" src={item.img} alt="" />
      <div className="content-container">
        <div className="upside">
          <span className="title-text">
            {sliceText(item.name, 5, "가게이름")}
          </span>
          <span className="date-text">{item.date}</span>
        </div>
        <img
          className="star-img"
          src={process.env.PUBLIC_URL + "/imgs/starRate" + item.rate + ".png"}
          alt=""
        />
        <div className="content-section">
          {sliceText(item.content, 180, "내용이 없습니다.")}
        </div>
        <div className="like-btn">
          <button onClick={updateLikeCnt}>
            <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          </button>
          <span>{likeCnt}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
