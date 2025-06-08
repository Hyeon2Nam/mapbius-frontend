import { Link } from "react-router-dom";

const MypageCardItem = ({ item }) => {
  return (
    <div className="card-item">
      <Link to={"/mypage" + item.link} key={item.name}>
        <span>{item.name}</span>
        <div className="moreBtn">
          <img src={process.env.PUBLIC_URL + "/imgs/moreBtn.png"} />
        </div>
      </Link>
    </div>
  );
};

export default MypageCardItem;
