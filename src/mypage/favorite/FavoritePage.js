import FavoriteList from "./FavoriteList";
import "../../style/FavoritePage.scss";
import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";
import { getBookmarkList } from "../../api/mapApi";
import { getUserBookmarkList } from "../../api/myPageApi";

const FavoritePage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [dataList, setDataList] = useState([]);
  // const sliceCnt = 5;

  const getDataListHandler = () => {
    getUserBookmarkList(localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          setBookmarkList(res.data.objData);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    concatListHandler(curIdx, bookmarkList, setDataList, setCurIdx, 3);
    getDataListHandler();
  }, []);

  return (
    <div className="favorite-page">
      <div className="big-section-title">즐겨찾기 목록</div>
      <FavoriteList list={bookmarkList} />
      <button
        onClick={() => {
          concatListHandler(curIdx, bookmarkList, setDataList, setCurIdx, 3);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default FavoritePage;
