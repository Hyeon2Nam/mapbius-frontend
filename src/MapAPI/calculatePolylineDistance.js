import React, { useEffect, useState } from "react";
import "./styles.css";

/* global kakao */

const KakaoMap = ({ setRoute, routeData, mode }) => {
  const [map, setMap] = useState(null);
  const [isdrawing, setIsdrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [clickLine, setClickLine] = useState(null);
  const [moveLine, setMoveLine] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded.");
      return;
    }

    const kakao = window.kakao;
    const container = document.getElementById("map");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 5,
          };

          const mapInstance = new kakao.maps.Map(container, options);
          setMap(mapInstance);

          // Initialize polylines
          const polyline = new kakao.maps.Polyline({
            map: mapInstance,
            strokeWeight: 4,
            strokeColor: "#db4040",
            strokeOpacity: 1,
            strokeStyle: "solid",
          });
          setClickLine(polyline);

          const movePolyline = new kakao.maps.Polyline({
            map: mapInstance,
            strokeWeight: 9,
            strokeColor: "#db4040",
            strokeOpacity: 0.5,
            strokeStyle: "solid",
          });
          setMoveLine(movePolyline);

          return () => {
            polyline.setMap(null);
            movePolyline.setMap(null);
          };
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("현재 위치를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
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
      const newPaths = [
        ...prev,
        { lat: latLng.getLat(), lng: latLng.getLng() },
      ];
      clickLine.setPath(
        newPaths.map((p) => new kakao.maps.LatLng(p.lat, p.lng))
      );

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

    if (isdrawing && paths.length > 0) {
      const kakao = window.kakao;
      const lastPath = paths[paths.length - 1];

      moveLine.setPath([
        new kakao.maps.LatLng(lastPath.lat, lastPath.lng),
        latLng,
      ]);

      // 실시간 거리 계산 (현재 점과 마우스 위치 사이의 거리)
      const tempLine = new kakao.maps.Polyline({
        path: [new kakao.maps.LatLng(lastPath.lat, lastPath.lng), latLng],
      });
      const currentDistance = Math.round(tempLine.getLength()); // 마우스와 마지막 마커 간의 거리

      // 총 거리 업데이트: 기존 마커 간 거리 + 현재 마우스 위치 거리
      const previousDistance =
        paths.length > 1 ? Math.round(clickLine.getLength()) : 0;
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

  const savePathData = () => {
    // if (!routeName) {
    //   alert("경로 이름을 입력하세요.");
    //   return;
    // }

    const pathData = {
      // name: routeName,
      paths,
      distances,
    };

    // setSavedRoutes((prev) => [...prev, pathData]);
    // setRouteName("");
    setRoute(pathData);

    // 폴리라인 초기화
    setPaths([]);
    setDistances([]);
    if (clickLine) clickLine.setPath([]);
    if (moveLine) moveLine.setPath([]);

    alert(`경로가 저장되었습니다.`);
    // alert(`경로 '${routeName}'이(가) 저장되었습니다.`);
  };

  const loadPathData = () => {
    if (!selectedRoute) {
      alert("불러올 경로를 선택하세요.");
      return;
    }

    const route = savedRoutes.find((r) => r.name === selectedRoute);
    if (route) {
      const { paths: savedPaths, distances: savedDistances } = route;

      setPaths(savedPaths);
      setDistances(savedDistances);

      const kakao = window.kakao;
      clickLine.setPath(
        savedPaths.map((p) => new kakao.maps.LatLng(p.lat, p.lng))
      );
      alert(`경로 '${selectedRoute}'이(가) 불러와졌습니다.`);
    }
  };

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
          height: "1150px",
        }}
      ></div>

      {/* <input
        type="text"
        className="distance-input"
        placeholder="경로 이름"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
      /> */}

      {mode === "create" && (
        <button className="distance-button" onClick={savePathData}>
          경로 저장
        </button>
      )}

      {/* <button className="distance-button" onClick={loadPathData}>
        경로 불러오기
      </button> */}

      {/* <select
        className="distance-select"
        value={selectedRoute || ""}
        onChange={(e) => setSelectedRoute(e.target.value)}
      >
        <option value="" disabled>
          저장된 경로 선택
        </option>
        {savedRoutes.map((route, index) => (
          <option key={index} value={route.name}>
            {route.name}
          </option>
        ))}
      </select> */}

      {distances.length > 0 && <DistanceInfo distance={distances[0]} />}
    </div>
  );
};

export default KakaoMap;
