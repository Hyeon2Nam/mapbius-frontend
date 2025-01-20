const BackImg = ({ dimensions, img }) => {
  return (
    <div>
      <img
        src={img}
        alt=""
        style={dimensions}
        onError={(e) => {
          e.target.src = process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg";
        }}
      />
    </div>
  );
};

export default BackImg;
