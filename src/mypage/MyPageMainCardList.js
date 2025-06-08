import MypageCardItem from "./MypageCardItem";
import "../style/MypageMainCard.scss";

const MypageMainCardList = () => {
  const cardList = [
    { name: "즐겨찾기 목록", link: "/favorite-list" },
    { name: "후기 목록", link: "/reiew-list" },
    { name: "여행루트 리스트", link: "/trip-route-list" },
    { name: "개인정보 수정", link: "/edit-user-info" },
  ];

  return (
    <div className="mypage-card">
      {cardList.map((e, i) => {
        return <MypageCardItem key={e.name + i} item={e} />;
      })}
    </div>
  );
};

export default MypageMainCardList;
