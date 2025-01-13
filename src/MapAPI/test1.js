import React, { useEffect, useState } from "react";

/* global kakao */

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [isdrawing, setIsdrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 });
  const [clickLine, setClickLine] = useState(null);
  const [moveLine, setMoveLine] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=9ecde12cc364a3c6cf0b0aff3d91243f&libraries=services,geometry,places,clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      const kakao = window.kakao;
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765),
        level: 3,
      };
      const mapInstance = new kakao.maps.Map(container, options);
      setMap(mapInstance);

      // Initialize polylines
      const polyline = new kakao.maps.Polyline({
        map: mapInstance,
        strokeWeight: 3,
        strokeColor: "#db4040",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });
      setClickLine(polyline);

      const movePolyline = new kakao.maps.Polyline({
        map: mapInstance,
        strokeWeight: 3,
        strokeColor: "#db4040",
        strokeOpacity: 0.5,
        strokeStyle: "solid",
      });
      setMoveLine(movePolyline);
    };
    document.head.appendChild(script);
  }, []);

  const handleClick = (mouseEvent) => {
    const latLng = mouseEvent.latLng;
    const kakao = window.kakao;

    if (!isdrawing) {
      setPaths([]);
      setDistances([]);
      clickLine.setPath([]);
      moveLine.setPath([]);
    }

    setPaths((prev) => {
      const newPaths = [...prev, { lat: latLng.getLat(), lng: latLng.getLng() }];
      clickLine.setPath(newPaths.map((p) => new kakao.maps.LatLng(p.lat, p.lng)));

      // 점이 정확히 2개일 때만 거리 계산
    if (newPaths.length >= 2) {
      const lineDistance = Math.round(clickLine.getLength());
      setDistances([lineDistance]); // 기존 거리를 초기화하고 새 거리만 추가
    }

      return newPaths;
    });

    const lineDistance = Math.round(clickLine.getLength());
    setDistances((prev) => [...prev, lineDistance]);
    setIsdrawing(true);
  };

  const handleMouseMove = (mouseEvent) => {
    const latLng = mouseEvent.latLng;

    //setMousePosition({ lat: latLng.getLat(), lng: latLng.getLng() });

    if (isdrawing && paths.length > 0) {
      const kakao = window.kakao;
      const lastPath = paths[paths.length - 1];

      moveLine.setPath([
        new kakao.maps.LatLng(lastPath.lat, lastPath.lng),
        latLng,
      ]);

      // 실시간 거리 계산 (현재 점과 마우스 위치 사이의 거리)
      const tempLine = new kakao.maps.Polyline({
        path: [
          new kakao.maps.LatLng(lastPath.lat, lastPath.lng),
          latLng,
        ],
      });
      const currentDistance = Math.round(tempLine.getLength()); // 마우스와 마지막 마커 간의 거리

    // 총 거리 업데이트: 기존 마커 간 거리 + 현재 마우스 위치 거리
    const previousDistance = paths.length > 1 ? Math.round(clickLine.getLength()) : 0;
    setDistances([previousDistance + currentDistance]); // 전체 거리 업데이트
    }
  };

  const handleRightClick = () => {
    setIsdrawing(false);
    moveLine.setPath([]); // 이동 중인 선 초기화
  };

  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, "click", handleClick);
      kakao.maps.event.addListener(map, "mousemove", handleMouseMove);
      kakao.maps.event.addListener(map, "rightclick", handleRightClick);
    }

    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, "click", handleClick);
        kakao.maps.event.removeListener(map, "mousemove", handleMouseMove);
        kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
      }
    };
  }, [map, isdrawing, paths]);

  const DistanceInfo = ({ distance }) => {
    const walkTime = Math.floor(distance / 67);
    const bicycleTime = Math.floor(distance / 227);

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{" "}
          {walkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkTime / 60)}</span> 시간{" "}
            </>
          )}
          <span className="number">{walkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{" "}
          {bicycleTime > 60 && (
            <>
              <span className="number">{Math.floor(bicycleTime / 60)}</span>{" "}
              시간{" "}
            </>
          )}
          <span className="number">{bicycleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "450px",
        }}
      ></div>
      {paths.map((path, index) => (
        <div
          key={index}
          className="dotOverlay"
          style={{
            position: "absolute",
            transform: `translate(${path.lat}px, ${path.lng}px)`,
          }}
        >
          점 {index + 1}
        </div>
      ))}
      {distances.length > 0 && <DistanceInfo distance={distances[0]} />}
    </div>
  );
};

export default KakaoMap;
