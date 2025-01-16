import { useState } from "react";
import "../style/TempTest.scss";
import InfoPage from "./InfoPage";

export default function TempMap() {
  const [isShow, setIsShow] = useState(true);

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
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content:
          "시장투어하고, 눈에 띄는 곳에서 점심해결🍴<br>•김치찌개는 생소했는데.. 지역특성상 한끼식사용인거 같네요. 고기랑 두부가 잔뜩 <br>•경양식왕돈가스는 소스가 신의 한수, 느끼한 맛을 잡아줌<br>•등심돈가스는 돈카츠느낌에 더 가까워요. 고기가 찐🥩<br><br>*맛있는 한끼해결😋",
        date: "2025-01-01",
      },
      {
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content:
          "청양시장 내 가성비 맛집! 가격도 다른곳보다 천원씩은 싼 거같아요 ㅎㅎ 양도 많고 맛도 좋습니다. 돈까스는 단호박돈까스구요, 사진보다 실물이 커요! 밥 양도 많아요(국물은 없음). 순대국밥은 얼큰이맛인데 맛있어요~ 제일 많이 먹는 메뉴는 뼈해장국인데 어르신들이 많이 드시더라고요 ㅎㅎ 청양시장 인기 맛집 중 하나!",
        date: "2024-12-30",
      },
      {
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content: "",
        date: "2024-12-30",
      },
      {
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content:
          "청양시장 내 가성비 맛집! 가격도 다른곳보다 천원씩은 싼 거같아요 ㅎㅎ 양도 많고 맛도 좋습니다. 돈까스는 단호박돈까스구요, 사진보다 실물이 커요! 밥 양도 많아요(국물은 없음). 순대국밥은 얼큰이맛인데 맛있어요~ 제일 많이 먹는 메뉴는 뼈해장국인데 어르신들이 많이 드시더라고요 ㅎㅎ 청양시장 인기 맛집 중 하나!청양시장 내 가성비 맛집! 가격도 다른곳보다 천원씩은 싼 거같아요 ㅎㅎ 양도 많고 맛도 좋습니다. 돈까스는 단호박돈까스구요, 사진보다 실물이 커요! 밥 양도 많아요(국물은 없음). 순대국밥은 얼큰이맛인데 맛있어요~ 제일 많이 먹는 메뉴는 뼈해장국인데 어르신들이 많이 드시더라고요 ㅎㅎ 청양시장 인기 맛집 중 하나!청양시장 내 가성비 맛집! 가격도 다른곳보다 천원씩은 싼 거같아요 ㅎㅎ 양도 많고 맛도 좋습니다. 돈까스는 단호박돈까스구요, 사진보다 실물이 커요! 밥 양도 많아요(국물은 없음). 순대국밥은 얼큰이맛인데 맛있어요~ 제일 많이 먹는 메뉴는 뼈해장국인데 어르신들이 많이 드시더라고요 ㅎㅎ 청양시장 인기 맛집 중 하나!",
        date: "2024-12-30",
      },
      {
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content:
          "청양시장 내 가성비 맛집! 가격도 다른곳보다 천원씩은 싼 거같아요 ㅎㅎ 양도 많고 맛도 좋습니다. 돈까스는 단호박돈까스구요, 사진보다 실물이 커요! 밥 양도 많아요(국물은 없음). 순대국밥은 얼큰이맛인데 맛있어요~ 제일 많이 먹는 메뉴는 뼈해장국인데 어르신들이 많이 드시더라고요 ㅎㅎ 청양시장 인기 맛집 중 하나!",
        date: "2024-12-30",
      },
    ],
  };

  return (
    <div className="temp-test">
      <div className="map-section">
        <img src={process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"} alt="" />
      </div>
      {isShow ? (
        <div className={isShow ? "spot-section" : "none"}>
          <InfoPage data={dump} type={"place"} setIsShow={setIsShow} />
        </div>
      ) : (
        <div className="down-btn">
          <button
            onClick={() => {
              setIsShow(true);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/imgs/downArrow.png"} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}
