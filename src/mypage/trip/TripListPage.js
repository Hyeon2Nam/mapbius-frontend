import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";
import TripList from "./TripLIst";
import "../../style/TripListPage.scss";

const TripListPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [dataList, setDataList] = useState([]);
  const dump = [
    {
      img: "https://img.siksinhot.com/place/1695358551647068.jpg?w=560&h=448&c=Y",
      name: "청양 맛집 루트",
      range: "public",
      description: "청양 맛집 리스트 입니다~",
      date: "2025-01-14",
      like: 20,
      nickname: "asdf222",
      profileImg:
        "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.jpg",
    },
    {
      img: "https://previews.123rf.com/images/alxyago/alxyago1711/alxyago171100001/89282012-%EB%93%A4%ED%8C%90%EA%B3%BC-%ED%95%98%EB%8A%98.jpg",
      name: "나만 볼 거",
      range: "private",
      description: "개인 메모용 루트",
      date: "2025-01-10",
      like: 0,
      nickname: "asdf2",
      profileImg: "https://pbs.twimg.com/media/E6ln-jEUUAIfJoY.jpg",
    },
    {
      img: "https://ynoblesse.com/wp-content/uploads/2024/10/464676375_1751431735682376_7779456267627272696_n.jpg",
      name: "홍대 놀거리 추천 루트",
      range: "public",
      description: "홍대에 왔으면 여길 가야ㅏ지...",
      date: "2022-12-12",
      like: 20,
      nickname: "가나디",
      profileImg:
        "https://image1.marpple.co/files/u_4652883/2024/8/original/71961d882ef2c32ae9e1ba8f8fce453a4b7e214f1.png?q=80&w=360&f=webp",
    },
    {
      img: "https://image.idus.com/image/files/da988d4f52a842a3a3f1018f7bc81d9f_720.jpg",
      name: "용한 타로 가게",
      range: "public",
      description: "사기아니고 이상한 사람아니고 진짜 찐으로 용한 사람 모음",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/8TfGt4Oov4V2TPYaEpXzR1bLTZ0",
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
