import { sliceText, setDateText } from "../mypage/UtileFunc";

const ItemContent = ({ item, category }) => {
  return (
    <div className="list-item">
      {category === "festival" && (
        <>
          <img src={item.firstimage} alt="" />
          <div className="info-wrapper">
            <div className="title-text">{item.title}</div>
            <div className="info-text">{item.addr1 + item.addr2}</div>
            <div className="info-text">
              연락처 {"("}
              {item.tel}
              {")"}
            </div>
          </div>
        </>
      )}
      {category === "product" && (
        <>
          <img src={item.imgUrl} alt="" />
          {item.cntntsSj}
        </>
      )}
      {category === "news" && (
        <a href={item.link}>
          <div
            className="title-text"
            dangerouslySetInnerHTML={{
              __html: sliceText(
                item.title.replace("<b>", "").replace("</b>", ""),
                30,
                "기사제목"
              ),
            }}
          ></div>
          <div className="date-text">{setDateText(item.pubDate)}</div>
          <span
            dangerouslySetInnerHTML={{
              __html: sliceText(
                item.description.replace("<b>", "").replace("</b>", ""),
                50,
                "기사내용"
              ),
            }}
          ></span>
        </a>
      )}
      {category === "trip" && (
        <>
          <img src={item.imgUrl} alt="" />
          {item.cntntsSj}
        </>
      )}
    </div>
  );
};

export default ItemContent;
