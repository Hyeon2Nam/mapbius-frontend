import { useState, useEffect } from "react";
import { useRef } from "react";
import BackImg from "./BackImg";

const FavoriteItem = ({ item }) => {
  const frontRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [afterMake, setAfterMake] = useState(false);
  const [setAbsolute, setSetAbsolute] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (frontRef.current) {
        const height = frontRef.current.offsetHeight;
        const width = frontRef.current.offsetWidth;
        setDimensions({ width, height });
        setAfterMake(true);
        setSetAbsolute(true);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const flipHandler = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`favorite-item ${isFlipped ? "is-flipped" : ""}`}
      onClick={flipHandler}
      style={dimensions.width > 0 ? dimensions : {}}
    >
      <div className={`content-wraper ${setAbsolute ? "absolute" : ""}`}>
        <div
          className={`flip-front ${setAbsolute ? "absolute" : ""}`}
          ref={frontRef}
          style={dimensions.width > 0 ? dimensions : {}}
        >
          <div className="code-img-wrapper ">
            <img src={process.env.PUBLIC_URL + "/imgs/qrcode.png"} />
            <img src={process.env.PUBLIC_URL + "/imgs/barcodeImg.png"} alt="" />
          </div>
          <div className="ticket-contents">
            <div
              className="upside"
              style={{
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
            ></div>
            <div className="main-section">
              <div className="item-wrapper">
                <span className="item-name">{item.name}</span>
                <span className="item-address">{item.address}</span>
              </div>
              <img src={process.env.PUBLIC_URL + "/imgs/regionIcon.png"} />
            </div>
            <div
              className="downside"
              style={{
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
            ></div>
          </div>
        </div>
        {afterMake && (
          <div
            className={`flip-back ${setAbsolute ? "absolute" : ""}`}
            style={{ dimensions }}
          >
            <BackImg img={item.img} dimensions={dimensions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteItem;
