import FavoriteList from "./FavoriteList";
import "../../style/FavoritePage.scss";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const dump = [
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
  ];
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    concatListHandler();
  }, []);

  const concatListHandler = () => {
    const sliceCnt = 2;

    if (curIdx >= dump.length) {
      alert("더이상 데이터가 없습니다");
      return;
    }

    const newItems = dump.slice(curIdx, curIdx + sliceCnt);
    setDataList((prevDataList) => [...prevDataList, ...newItems]);

    setCurIdx((prevIdx) => prevIdx + sliceCnt);
  };

  return (
    <div className="favorite-page">
      <div className="big-section-title">회원정보 변경</div>
      <FavoriteList list={dataList} />
      <button onClick={concatListHandler}>더보기</button>
    </div>
  );
};

export default FavoritePage;
