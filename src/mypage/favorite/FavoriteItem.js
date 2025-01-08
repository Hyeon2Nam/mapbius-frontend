const FavoriteItem = ({ item }) => {
  return (
    <div className="favorite-item">
      <div className="code-img-wrapper">
        <img src={process.env.PUBLIC_URL + "/imgs/qrcode.png"} />
        <img src={process.env.PUBLIC_URL + "/imgs/barcodeImg.png"} alt="" />
      </div>
      <div className="ticket-contents">
        <div
          className="upside"
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
        ></div>
        <div className="main-section">
          <div className="item-wrapper">
            <span className="item-name">{item.name}</span>
            <span className="item-address">{item.address}</span>
          </div>
          <img src={process.env.PUBLIC_URL + "/imgs/regionIcon.png"} />
        </div>
        <div
          className="downside"
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FavoriteItem;
