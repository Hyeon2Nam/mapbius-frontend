const BackImg = ({ dimensions, img }) => {
  return (
    <div>
      <img src={img} alt="" style={dimensions} />
    </div>
  );
};

export default BackImg;
