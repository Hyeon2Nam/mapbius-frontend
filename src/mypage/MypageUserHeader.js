import "../style/mypageCommon.scss";

const MypageUserHeader = () => {
  return (
    <div className="mypage-userheader">
      <div className="user-img">
        <img src={process.env.PUBLIC_URL + "/imgs/logo.jpg"} />
      </div>
      <div className="text-wrapper">
        <div className="hello-user">안녕하세요 {"유저"}님.</div>
        <div className="intro-text">당신만의 보물을 찾아 떠나는 여정,</div>
        <div className="intro-text">맵비우스에서 시작하세요!</div>
      </div>
    </div>
  );
};

export default MypageUserHeader;
