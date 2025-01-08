import FavoriteList from "./FavoriteList";
import "../../style/FavoritePage.scss";

const FavoritePage = () => {
  const dump = [
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양",
      address: "충청남도 청양군 청양읍",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "가나다라마바사아자차카타파하",
      address:
        "충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍충청남도 청양군 청양읍",
    },
  ];

  return (
    <div className="favorite-page">
      <FavoriteList list={dump} />
    </div>
  );
};

export default FavoritePage;
