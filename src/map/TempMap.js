import PlaceInfo from "./PlaceInfo";

export default function TempMap() {
  const dump = {
    name: "스미카츠 압구정 본점",
    address: "서울 강남구 선릉로 157길 23-3 지상 1층 101호",
    call: "0507-1456-1384",
    rate: "4",
    reviewCnt: "13",
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
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
      },
      {
        nickName: "아마바바바바바바",
        like: 5,
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
        rate: 5,
        avgRate: 4.5,
        content:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tonkatsu_by_ayustety_in_Tokyo.jpg/250px-Tonkatsu_by_ayustety_in_Tokyo.jpg",
      },
    ],
  };

  return (
    <div>
      <div>
        <img src={process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"} alt="" />
      </div>
      <div>
        <PlaceInfo place={dump} />
      </div>
    </div>
  );
}
