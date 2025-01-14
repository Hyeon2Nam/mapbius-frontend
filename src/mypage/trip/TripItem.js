import { sliceText } from "../UtileFunc";

const TripItem = ({ item }) => {
  return (
    <div className="trip-item">
      <img className="back-img" src={item.img} alt="" />
      <div className="content-wrapper">
        <div className="text-wrapper">
          <div className="title-text">
            <span>{sliceText(item.name, 13, "루트 이름")}</span>
            {item.range === "private" ? (
              <img
                src={process.env.PUBLIC_URL + "/imgs/passwordIcon.png"}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <span className="desc-text">
            {sliceText(item.description, 60, "루트 이름")}
          </span>
        </div>
        <div className="profile-container">
          <img src={item.profileImg} className="profile-img" alt="" />
          <span>{item.nickname}</span>
        </div>
      </div>
      <div className="downside">
        <span>{item.date}</span>
        <div>
          <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          {item.like}
        </div>
      </div>
    </div>
  );
};

export default TripItem;
