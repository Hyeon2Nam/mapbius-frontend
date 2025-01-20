import PlaceInfo from "./PlaceInfo.js";
import RegionInfo from "./RegionInfo.js";

const InfoPage = ({ data, type, setIsInfoShow }) => {
  return (
    <>
      {type === "place" ? (
        <PlaceInfo place={data} />
      ) : (
        <RegionInfo region={data} />
      )}
      <button className="up-btn" onClick={() => setIsInfoShow(false)}>
        <img src={process.env.PUBLIC_URL + "/imgs/upArrow.png"} alt="" />
      </button>
    </>
  );
};

export default InfoPage;
