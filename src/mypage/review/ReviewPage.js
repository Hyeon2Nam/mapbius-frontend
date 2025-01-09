import ReviewList from "./ReviewList";
import "../../style/ReviewPage.scss";
import concatListHandler from "../UtileFunc";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const [curIdx, setCurIdx] = useState(0);
  const dump = [
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
      rate: 1,
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
      rate: 2,
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
      rate: 3,
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
      rate: 4,
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
      rate: 5,
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양우거디",
      content:
        "목적지 근처를 돌다가 한적하고, 깔끔한 문화의 거리 안에 자리 잡은 조그만 어죽집을 발견하고는 무정 들어 갔지요.테이블이 더댓 개 밖에 안되는 아담한 식당입니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille 메뉴판의 맨 윗 자리에 있는 음식이 가장 보편적인 것이라, 그걸 주문했다가 수제비가 있으면 더 좋을 것 같아 1,000원이 더 비싼 그 아래 메뉴, '국수+수제비'를 시켰습니다. [출처] 어탕국수, 청양에 가면 꼭 맛봐야 할 음식 1호|작성자 Bille CC",
      date: "2022-12-12",
      like: 20,
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
