import { useState } from "react";
import ItemContent from "./ItemContent";

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
        {"<"}
      </button>
      <div className={"item-wrapper " + category}>
        {itemsToDisplay.map((item, index) => (
          <ItemContent key={index} item={item} category={category} />
        ))}
      </div>
      <button
        className="next-btn"
        onClick={handleNext}
        disabled={startIndex + divCnt >= list.length}
      >
        {">"}
      </button>
    </div>
  );
};

export default ListContent;
