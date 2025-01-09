import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";
import TripList from "./TripLIst";
import "../../style/TripListPage.scss";

const TripListPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [dataList, setDataList] = useState([]);
  const dump = [
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트",
      range: "private",
      description:
        "청양 맛집 리스트 입니다~청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
  ];

  useEffect(() => {
    concatListHandler(curIdx, dump, setDataList, setCurIdx, 2);
  }, []);

  return (
    <div className="triplist-page">
      <div className="big-section-title">여행루트 리스트</div>
      <TripList list={dataList} />
      <button
        className="more-btn"
        onClick={() => {
          concatListHandler(curIdx, dump, setDataList, setCurIdx, 2);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default TripListPage;
