import ReviewList from "./ReviewList.js";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const PlaceInfo = ({ place }) => {
  const [value, setValue] = useState(3);
  const [isBookmark, setIsBookmark] = useState(false);

  return (
    <>
      <div className="head-section place">
        <img
          className="back-img"
          src="https://d12zq4w4guyljn.cloudfront.net/750_750_20240306021828565_photo_f4b171bf1359.jpg"
          alt=""
        />
        <div className="text-section">
          <span className="place-name">{place.name}</span>
          <span>{place.address}</span>
          <div>
            <img
              className="call-img"
              src={process.env.PUBLIC_URL + "/imgs/callIcon.png"}
              alt=""
            />
            <span>{place.phone ? place.phone : "전화 정보 없음"}</span>
          </div>
          <div>
            {place.rating > 0 ? (
              <>
                <img
                  className="rating-img"
                  src={
                    process.env.PUBLIC_URL +
                    "/imgs/starRate" +
                    place.rating +
                    ".png"
                  }
                  alt=""
                />
                <span>
                  {place.rating}
                  {" (후기 "}
                  {place.reviews}
                  {")"}
                </span>
              </>
            ) : (
              <span>후기 정보 없음</span>
            )}
          </div>
        </div>
      </div>
      <div
        className="bookmark-bar"
        onClick={() => {
          setIsBookmark(!isBookmark);
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/imgs/bookmark" + isBookmark + ".png"}
          alt=""
        />
      </div>
      <ReviewList list={place.reviewList} />
      <div className="input-section">
        <div className="input-container">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <div>
            <textarea />
            <button>입력</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceInfo;
