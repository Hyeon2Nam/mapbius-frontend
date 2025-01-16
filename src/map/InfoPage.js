import PlaceInfo from "./PlaceInfo.js";
import RegionInfo from "./RegionInfo.js";

const InfoPage = ({ data, type, setIsShow }) => {
  return (
    <>
      {type === "place" ? (
        <PlaceInfo place={data} />
      ) : (
        <RegionInfo place={data} />
      )}
      <button className="up-btn" onClick={() => setIsShow(false)}>
        <img src={process.env.PUBLIC_URL + "/imgs/upArrow.png"} alt="" />
      </button>
    </>
  );
};

export default InfoPage;
