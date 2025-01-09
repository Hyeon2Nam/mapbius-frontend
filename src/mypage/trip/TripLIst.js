import TripItem from "./TripItem";

const TripList = ({ list }) => {
  return (
    <div className="trip-list">
      {list.map((item, index) => (
        <TripItem key={index} item={item} />
      ))}
    </div>
  );
};

export default TripList;
