import ReviewList from "./ReviewList.js";

const PlaceInfo = ({ place }) => {
  return (
    <div>
      <div>
        {place.name}
        {place.address}
        <div>
          <img src={process.env.PUBLIC_URL + "/imgs/callIcon.png"} alt="" />
          <span>{place.call}</span>
        </div>
        <div>
          <img
            src={
              process.env.PUBLIC_URL + "/imgs/starRate" + place.rate + ".png"
            }
            alt=""
          />
          <span>{place.reviewCnt}</span>
        </div>
      </div>
      <ReviewList />
      <div>
        {/* rating */}
        <div>
          <input />
          <button>입력</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;
