import { useState } from "react";
import "../style/TempTest.scss";
import InfoPage from "./InfoPage";
import ChatPage from "./ChatPage";

export default function TempMap() {
  const [isInfoShow, setIsInfoShow] = useState(true);

  const dump = {
    name: "스미카츠 압구정 본점",
    address: "서울 강남구 선릉로 157길 23-3 지상 1층 101호",
    call: "0507-1456-1384",
    rate: "4",
    reviewCnt: "13",
    avg: 4.0,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
    reviewList: [
      {
        nickName: "랭크",
        like: 5,
        profileImg:
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
        rate: 5,
        avgRate: 5,
        content:
          "와진짜 맛있었어요👍🏻오픈시간 맞춰갔는데 저 들어가고나서 웨이팅 시작하더라고요..돈가스 대박 맛있고 부드럽고 소금에만 찍어먹어도 충분히 맛있었어요! 특히 안심은 입에서 사르르 녹아요..치즈카츠도 왕추천😋 우동까지 다먹고 나왔더니 배터질 것 같네요ㅎㅎㅎ또방문할게요🙌🏻",
        date: "2024-12-31",
      },
      {
        nickName: "asdf222",
        like: 2,
        profileImg:
          "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.jpg",
        rate: 3,
        avgRate: 3,
        content:
          "진짜 맛이 보장된 스미카츠👍🏻\n안심 카츠는 언제 먹어도 소고기 맛!!\n가츠동도 당연히 맛있어요!\n\n소스도 다양하게 있어서 취향에 따라 한조각 한조각 다르게 먹는 재미가 있어요ㅎㅎ\n\n매주 먹고 있지만 매주 생각나는 맛! 강추!!!",
        date: "2024-12-30",
      },
      {
        nickName: "asdf2",
        like: 1,
        profileImg: "https://pbs.twimg.com/media/E6ln-jEUUAIfJoY.jpg",
        rate: 4,
        avgRate: 2.0,
        content: "",
        date: "2024-12-30",
      },
      {
        nickName: "가나디",
        like: 0,
        profileImg:
          "https://image1.marpple.co/files/u_4652883/2024/8/original/71961d882ef2c32ae9e1ba8f8fce453a4b7e214f1.png?q=80&w=360&f=webp",
        rate: 4,
        avgRate: 3.5,
        content:
          "지난주에 이어서 오늘도 또 왔어요 😍\n저희 부부 최애 맛집 !\n이거 먹으려고 일주일 기다린다고 해도과언이 아님 ㅎㅎ\n오늘은 늘 먹던 안심카츠와 더불어 치즈카츠를 먹어보았어요 :-)\n치즈카츠도 강추에요 👍🏼\n치주가 완전 부드럽고 풍미있어요!\n그리고 수란은 꼭 드세요!\n두번드세요 ㅎㅎㅎ\n",
        date: "2024-12-30",
      },
      {
        nickName: "QQ",
        like: 0,
        profileImg:
          "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/8TfGt4Oov4V2TPYaEpXzR1bLTZ0",
        rate: 3,
        avgRate: 2,
        content:
          "볏집훈연 특등심 카츠정식 주문했어요! 훈연향과 먹물튀김옷이 넘 신기하고 입맛을 돋구네요~\n먹는 팁으로 방앗간 들기름과 여러 소스를 활용하는 방법이 스미카츠의 킥이네요😍",
        date: "2024-12-30",
      },
    ],
  };

  const regionDump = {
    category: "충청남도",
    name: "청양",
  };

  return (
    <div className="temp-test">
      <ChatPage />
      <div className="map-section">
        <img src={process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"} alt="" />
      </div>
      {isInfoShow ? (
        <div className={isInfoShow ? "spot-section" : "none"}>
          {/* <InfoPage data={dump} type={"place"} setIsInfoShow={setIsInfoShow} /> */}
          <InfoPage
            data={regionDump}
            type={"region"}
            setIsInfoShow={setIsInfoShow}
          />
        </div>
      ) : (
        <div className="down-btn">
          <button
            onClick={() => {
              setIsInfoShow(true);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/imgs/downArrow.png"} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}
