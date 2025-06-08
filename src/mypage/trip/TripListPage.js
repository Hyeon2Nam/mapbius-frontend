import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";
import TripList from "./TripLIst";
import "../../style/TripListPage.scss";
import { getBookmarkList } from "../../api/mapApi";
import { getUserTripRouteList } from "../../api/myPageApi";

const TripListPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [dataList, setDataList] = useState([]);

  const getTripRouteList = () => {
    getUserTripRouteList(localStorage.getItem("userToken"))
      .then((res) => {
        console.log(res);
        setDataList(res.data.objData);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    concatListHandler(curIdx, dataList, setDataList, setCurIdx, 2);
    getTripRouteList();
  }, []);

  return (
    <div className="triplist-page">
      <div className="big-section-title">여행루트 리스트</div>
      <TripList list={dataList} />
      <button
        className="more-btn"
        onClick={() => {
          concatListHandler(curIdx, dataList, setDataList, setCurIdx, 2);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default TripListPage;
