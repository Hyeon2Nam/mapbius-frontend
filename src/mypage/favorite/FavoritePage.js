import FavoriteList from "./FavoriteList";
import "../../style/FavoritePage.scss";
import { useEffect, useState } from "react";
import concatListHandler from "../UtileFunc";

const FavoritePage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const dump = [
    {
      img: "https://cdn.jbnews.com/news/photo/201903/1238023_1037017_5012.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: "https://www.djto.kr/kor/resources/images/sub/d-light-daejeon-v2.jpg",
      name: "대전",
      address: "대전광역시",
    },
    {
      img: "https://themeparkbuff.com/wp-content/uploads/2020/11/%EC%97%90%EB%B2%84%EB%9E%9C%EB%93%9C-1068x601.jpg",
      name: "에버랜드",
      address: "경기도 용인시 처인구 포곡읍 에버랜드로 199",
    },
    {
      img: "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530528",
      name: "해운대해수욕장",
      address: "부산 해운대구 우동",
    },
    {
      img: "https://cdn.jbnews.com/news/photo/202409/1450857_1277135_5328.jpg",
      name: "성심당 본점",
      address: "대전 중구 대종로480번길 15 1-2층",
    },
    {
      img: "https://www.wj1news.com/data/photos/20211042/art_16348080035664_cdb7e3.jpg",
      name: "대둔산",
      address: "전북특별자치도 완주군 운주면 산북리 산 15-1",
    },
    {
      img: "https://www.domin.co.kr/news/photo/202111/1360746_493393_2621.jpg",
      name: "전주한옥마을",
      address: "전북특별자치도 전주시 완산구 풍남동3가 64-1",
    },
    {
      img: "https://d12zq4w4guyljn.cloudfront.net/750_750_20241222230238_photo1_677ff9df1a4d.jpg",
      name: "루시드",
      address: "대구 중구 동성로4길 94 1층",
    },
    {
      img: "https://img.sbs.co.kr/newimg/news/20121118/200618834_500.jpg",
      name: "홈플러스 합정점",
      address: "서울 마포구 양화로 45 메세나폴리스 지하2층",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gnj.jpg",
      name: "궁남지",
      address: "충남 부여군 부여읍 궁남로 52",
    },
  ];
  const [dataList, setDataList] = useState([]);
  // const sliceCnt = 5;

  useEffect(() => {
    concatListHandler(curIdx, dump, setDataList, setCurIdx, 3);
  }, []);

  return (
    <div className="favorite-page">
      <div className="big-section-title">즐겨찾기 목록</div>
      <FavoriteList list={dataList} />
      <button
        onClick={() => {
          concatListHandler(curIdx, dump, setDataList, setCurIdx, 3);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default FavoritePage;
