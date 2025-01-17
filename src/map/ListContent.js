import { useState } from "react";
import ItemContent from "./ItemContent";
import TripItem from "./../mypage/trip/TripItem";

const ListContent = ({ list, divCnt, category }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - divCnt);
    }
  };

  const handleNext = () => {
    if (startIndex + divCnt < list.length) {
      setStartIndex(startIndex + divCnt);
    }
  };

  const itemsToDisplay = list.slice(startIndex, startIndex + divCnt);

  return (
    <div className="product-list">
      <button
        className="prev-btn"
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        <img src={process.env.PUBLIC_URL + "/imgs/prevIcon.png"} alt="" />
      </button>
      <div className={"item-wrapper " + category}>
        {itemsToDisplay.map((item, index) =>
          category !== "trip" ? (
            <ItemContent key={index} item={item} category={category} />
          ) : (
            <TripItem key={index} item={item} />
          )
        )}
      </div>
      <button
        className="next-btn"
        onClick={handleNext}
        disabled={startIndex + divCnt >= list.length}
      >
        <img src={process.env.PUBLIC_URL + "/imgs/nextIcon.png"} alt="" />
      </button>
    </div>
  );
};

export default ListContent;
