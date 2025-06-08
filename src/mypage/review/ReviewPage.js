import ReviewList from "./ReviewList";
import "../../style/ReviewPage.scss";
import concatListHandler from "../UtileFunc";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const dump = [
    {
      img: "https://cdn.jbnews.com/news/photo/202409/1450857_1277135_5328.jpg",
      name: "성심당 본점",
      content:
        "역시 성심당은 고로케죠. 부추빵이나 튀소가 유명하긴해도 솔직히 고로케 이기는 거? 없다고 봅니다... 여러분 고로케를 드세요. 특히 낙지고로케가 정말 제대로입니다. 다른 빵집처럼 내용물 먹겠다고 열심히 겉을 안 뜯어먹어도 됩니다. 성심당은 첫입부터 마지막입까지 내용물을 먹을 수 있어요. 여러분, 고로케를 드세요.",
      date: "2025-01-14",
      like: 10,
      rate: 5,
    },
    {
      img: "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDlfMjQ4/MDAxNTU3MzgxMDEzMDI0.5tzO1PiOiac-OCmJ5CDW_5aRbjOJuQ0xpQ7PVSzRB3kg.CnlzF2w4ILHSl42vIorcqYs725SF2S7Zq20JDx1p1nEg.JPEG.tjmedia00/%EB%8C%80%EC%A0%84_%EA%B0%80%EB%B3%BC%EB%A7%8C%ED%95%9C%EA%B3%B3_%EB%8C%80%EC%A0%84_%EC%BD%94%EC%9D%B8%EB%85%B8%EB%9E%98%EB%B0%A9_(8).jpg?type=w800",
      name: "제이비코인노래연습장",
      content:
        "여기 서비스 많이 준다길래 가봤는데 대박이에요. 1시간 결제했는데 서비스로 1시간 받음... 심지어 가격도 쌈... 총 8천원에 2시간한거에요. 사람 없는 날엔 더 준다는 소문도 있는데 평일에도 가고 싶어요",
      date: "2025-01-11",
      like: 3,
      rate: 5,
    },
    {
      img: "https://mblogthumb-phinf.pstatic.net/MjAyNDEwMjlfMTEg/MDAxNzMwMTYzMzYyNzA5.pigWt5Q4xR-s5NSNhB6Rd_nb_nlwf4eZd7ULAU1DcRMg.GWWf-yZCv64_4lLi-iw-j5uXEK5aMXgZY8mF_I1n70og.JPEG/IMG_9081.jpg?type=w800",
      name: "도산 뚝배기",
      content:
        "도산뚝배기에서 한우깍둑등심과 특차돌국밥 먹었습니다! 너무 감동적인 맛! 밑반찬 세팅도 엄청 다양해서 여러가지로 즐길 수 있어서 좋았습니다! 깍둑등심 원조답게 진짜 맛있었고 특차돌국밥도 고기를 이렇게 많이 주셔도 되나 싶을 정도로 든든해서 점심에 오기 진짜 좋다고 생각했어요! 맛있게 잘먹고 갑니다!",
      date: "2025-01-09",
      like: 1,
      rate: 3,
    },
    {
      img: "https://d12zq4w4guyljn.cloudfront.net/750_750_20180924020658435_photo0_MbOJZBOJg3hY.jpg",
      name: "칠갑산추어탕",
      content: "지금까지 먹어본 추어탕 중에 여기가 제일 맛있음",
      date: "2024-12-28",
      like: 5,
      rate: 4,
    },
    {
      img: "https://image.ytn.co.kr/general/jpg/2020/1224/202012241051158353_t.jpg",
      name: "육군훈련소",
      content: "다신 가고 싶지 않아요",
      date: "2024-12-22",
      like: 100,
      rate: 1,
    },
    {
      img: "https://mblogthumb-phinf.pstatic.net/MjAyMzEwMTJfMTIz/MDAxNjk3MTEzMjE4OTMy.GF5vAYcNC24e_q3KzGlbeseyEapI0wPPuUptzRPRQmIg.tJ0zEIdOnoL41h1Xbf867l6w_8EztoW-E873qefaYi4g.JPEG.hero3901/20231012%EF%BC%BF112619.jpg?type=w800",
      name: "파리바게뜨 양구점",
      content: "체인점인데 맛 실화임?",
      date: "2024-12-20",
      like: 0,
      rate: 1,
    },
  ];
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    concatListHandler(curIdx, dump, setDataList, setCurIdx);
  }, []);

  return (
    <div className="review-page">
      <div className="big-section-title">후기 목록</div>
      <ReviewList list={dataList} />
      <button
        className="more-btn"
        onClick={() => {
          concatListHandler(curIdx, dump, setDataList, setCurIdx);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default ReviewPage;
