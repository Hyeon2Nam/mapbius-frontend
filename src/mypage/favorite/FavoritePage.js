import FavoriteList from "./FavoriteList";
import "../../style/FavoritePage.scss";
import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";

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
  // const sliceCnt = 5;

  useEffect(() => {
    concatListHandler(curIdx, dump, setDataList, setCurIdx);
  }, []);

  return (
    <div className="favorite-page">
      <div className="big-section-title">즐겨찾기 목록</div>
      <FavoriteList list={dataList} />
      <button
        onClick={() => {
          concatListHandler(curIdx, dump, setDataList, setCurIdx, 5);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default FavoritePage;
