import React, { useState } from "react";
import "./styles.css";
import { Map, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";

const KakaoMapDistance = () => {
  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState(null);
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 });
  const [moveLine, setMoveLine] = useState(null);

  const handleClick = (_map, mouseEvent) => {
    if (!isdrawing) {
      setDistances([]);
      setPaths([]);
    }
    setPaths((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    if (clickLine && moveLine) {
      setDistances((prev) => [
        ...prev,
        Math.round(clickLine.getLength() + moveLine.getLength()),
      ]);
    }
    setIsdrawing(true);
  };

  const handleMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  const handleRightClick = (_map, _mouseEvent) => {
    setIsdrawing(false);
  };

  const DistanceInfo = ({ distance }) => {
    const walkTime = Math.floor(distance / 67);
    const bicycleTime = Math.floor(distance / 227);

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span> <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>
          {walkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkTime / 60)}</span> 시간
            </>
          )}
          <span className="number">{walkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>
          {bicycleTime > 60 && (
            <>
              <span className="number">{Math.floor(bicycleTime / 60)}</span> 시간
            </>
          )}
          <span className="number">{bicycleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  return (
    <>
      <Map
        id="map"
        center={{ lat: 37.498004414546934, lng: 127.02770621963765 }}
        style={{ width: "100%", height: "450px" }}
        level={3}
        onClick={handleClick}
        onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
      >
        <Polyline
          path={paths}
          strokeWeight={3}
          strokeColor={"#db4040"}
          strokeOpacity={1}
          strokeStyle={"solid"}
          onCreate={setClickLine}
        />
        {paths.map((path, index) => (
          <CustomOverlayMap
            key={`dot-${path.lat},${path.lng}`}
            position={path}
            zIndex={1}
          >
            <span className="dot"></span>
          </CustomOverlayMap>
        ))}
        {paths.length > 1 &&
          distances.slice(1).map((distance, index) => (
            <CustomOverlayMap
              key={`distance-${paths[index + 1].lat},${paths[index + 1].lng}`}
              position={paths[index + 1]}
              yAnchor={1}
              zIndex={2}
            >
              {!isdrawing && distances.length === index + 2 ? (
                <DistanceInfo distance={distance} />
              ) : (
                <div className="dotOverlay">
                  거리 <span className="number">{distance}</span>m
                </div>
              )}
            </CustomOverlayMap>
          ))}
        <Polyline
          path={isdrawing ? [paths[paths.length - 1], mousePosition] : []}
          strokeWeight={3}
          strokeColor={"#db4040"}
          strokeOpacity={0.5}
          strokeStyle={"solid"}
          onCreate={setMoveLine}
        />
        {isdrawing && (
          <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
            <div className="dotOverlay distanceInfo">
              총거리 <span className="number">{Math.round(clickLine?.getLength() + moveLine?.getLength() || 0)}</span>m
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default KakaoMapDistance;
