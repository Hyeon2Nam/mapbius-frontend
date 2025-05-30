import { sliceText } from "../UtileFunc";
import { setDateText } from "./../UtileFunc";

const TripItem = ({ item }) => {
  return (
    <div
      className="trip-item"
      onClick={() => {
        window.location = "/travel/view/" + item.id;
      }}
    >
      <img
        className="back-img"
        src={
          item.coverImageName
            ? item.coverImageName
            : process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"
        }
        alt=""
      />
      <div className="content-wrapper">
        <div className="text-wrapper">
          <div className="title-text">
            <span>{sliceText(item.title, 13, "루트 이름")}</span>
            {item.isPrivate ? (
              <img
                src={process.env.PUBLIC_URL + "/imgs/passwordIcon.png"}
                alt=""
                onError={(e) => {
                  e.target.src =
                    process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg";
                }}
              />
            ) : (
              ""
            )}
          </div>
          <span className="desc-text">
            {sliceText(item.content, 60, "루트 이름")}
          </span>
        </div>
        <div className="profile-container">
          <img
            src={
              item.profileImage
                ? item.profileImage
                : process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"
            }
            className="profile-img"
            alt=""
            onError={(e) => {
              e.target.src = process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg";
            }}
          />
          <span>{item.creatorNickName}</span>
        </div>
      </div>
      <div className="downside">
        <span>{setDateText(item.createdAt)}</span>
        <div>
          <img src={process.env.PUBLIC_URL + "/imgs/heartIcon.png"} />
          {item.heartCount}
        </div>
      </div>
    </div>
  );
};

export default TripItem;
