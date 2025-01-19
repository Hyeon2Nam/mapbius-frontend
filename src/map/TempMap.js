import { useState } from "react";
import "../style/TempTest.scss";
import InfoPage from "./InfoPage";
import ChatPage from "./ChatPage";

export default function TempMap() {
  const [isInfoShow, setIsInfoShow] = useState(true);

  const regionDump = {
    category: "충청남도",
    name: "청양",
  };

  return (
    <div className="temp-test">
      <ChatPage />
      <div className="map-section">
        <img src={process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"} alt="" />
      </div>
      {isInfoShow ? (
        <div className={isInfoShow ? "spot-section" : "none"}>
          {/* <InfoPage data={dump} type={"place"} setIsInfoShow={setIsInfoShow} /> */}
          <InfoPage
            data={regionDump}
            type={"region"}
            setIsInfoShow={setIsInfoShow}
          />
        </div>
      ) : (
        <div className="down-btn">
          <button
            onClick={() => {
              setIsInfoShow(true);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/imgs/downArrow.png"} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}
