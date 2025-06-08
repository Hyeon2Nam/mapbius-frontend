import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";
import TripList from "./TripLIst";
import "../../style/TripListPage.scss";
import { getBookmarkList } from "../../api/mapApi";
import { getUserTripRouteList } from "../../api/myPageApi";

const TripListPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [dataList, setDataList] = useState([
    {
      content: "빵을 먹어요",
      coverImageName:
        process.env.PUBLIC_URL + "/imgs/ganadi.jpg",
      createdAt: "2025-06-07 00:59:49",
      creatorId: "qtaro1234",
      creatorNickName: "qtaro1234",
      distances: 8434,
      heartCount: 2,
      id: 80,
      imageFile: null,
      isPrivate: false,
      locationInfo:
        "36.45014830556474,126.79537874027916,36.43584941430587,126.78158704803639,36.43555094474115,126.8186144075184,36.463170683562986,126.82399447967995",
      profileImage:
        process.env.PUBLIC_URL +"/imgs/ganadi_face.png",
      title: "가나디와 빵집 투어",
    },  {
      content: "빵을 먹어요",
      coverImageName:
        process.env.PUBLIC_URL + "/imgs/ganadi.jpg",
      createdAt: "2025-06-07 00:59:49",
      creatorId: "qtaro1234",
      creatorNickName: "qtaro1234",
      distances: 8434,
      heartCount: 2,
      id: 80,
      imageFile: null,
      isPrivate: false,
      locationInfo:
        "36.45014830556474,126.79537874027916,36.43584941430587,126.78158704803639,36.43555094474115,126.8186144075184,36.463170683562986,126.82399447967995",
      profileImage:
        process.env.PUBLIC_URL +"/imgs/ganadi_face.png",
      title: "가나디와 빵집 투어",
    },
  ]);

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
