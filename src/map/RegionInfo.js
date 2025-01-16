import ReviewList from "./ReviewList.js";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const RegionInfo = ({ place }) => {
  const [value, setValue] = useState(3);

  return (
    <>
      <div className="head-section">
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
            <span>{place.call}</span>
          </div>
          <div>
            <img
              className="rating-img"
              src={
                process.env.PUBLIC_URL + "/imgs/starRate" + place.rate + ".png"
              }
              alt=""
            />
            <span>
              {place.avg}
              {" (후기"}
              {place.reviewCnt}
              {")"}
            </span>
          </div>
        </div>
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

export default RegionInfo;
