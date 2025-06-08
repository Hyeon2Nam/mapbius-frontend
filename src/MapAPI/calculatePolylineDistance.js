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
  const [overlayLines, setOverlayLines] = useState([]);
  const [hasSaved, setHasSaved] = useState(false);

  const reFormPathData = () => {
    const coordinates = routeData.locationInfo
      .split(",")
      .reduce((acc, value, index, array) => {
        if (index % 2 === 0) {
          acc.push({
            lat: parseFloat(value),
            lng: parseFloat(array[index + 1]),
          });
        }
        return acc;
      }, []);
    return coordinates;
  };

  useEffect(() => {
    if (mode === "view" && routeData) {
      const savedPaths = reFormPathData();
      setDistances([routeData.distances]);
      setPaths(savedPaths);
      const kakao = window.kakao;
      clickLine?.setPath(savedPaths.map(p => new kakao.maps.LatLng(p.lat, p.lng)));
    }
  }, [routeData]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    const kakao = window.kakao;
    const container = document.getElementById("map");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const mapInstance = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(lat, lng),
          level: 5,
        });

        setMap(mapInstance);

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
      },
      (error) => alert("현재 위치를 가져올 수 없습니다.")
    );
  }, []);

  const handleClick = (mouseEvent) => {
    if (mode === "view") return;
    const latLng = mouseEvent.latLng;
    const kakao = window.kakao;

    if (!isdrawing || hasSaved) {
      overlayLines.forEach(line => line.setMap(null));
      setOverlayLines([]);
      setPaths([]);
      setDistances([]);
      clickLine?.setPath([]);
      moveLine?.setPath([]);
      setHasSaved(false);
    }

    setPaths((prev) => {
      const newPaths = [...prev, { lat: latLng.getLat(), lng: latLng.getLng() }];
      clickLine?.setPath(newPaths.map(p => new kakao.maps.LatLng(p.lat, p.lng)));
      if (newPaths.length >= 2) {
        const lineDistance = Math.round(clickLine.getLength());
        setDistances([lineDistance]);
      }
      return newPaths;
    });

    setIsdrawing(true);
  };

  const handleMouseMove = (mouseEvent) => {
    if (mode === "view") return;
    const latLng = mouseEvent.latLng;
    const kakao = window.kakao;

    if (isdrawing && paths.length > 0) {
      const lastPath = paths[paths.length - 1];
      moveLine?.setPath([
        new kakao.maps.LatLng(lastPath.lat, lastPath.lng),
        latLng,
      ]);
    }
  };

  const handleRightClick = () => {
    if (mode === "view") return;
    setIsdrawing(false);
    moveLine?.setPath([]);
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
    const pathData = { paths, distances };
    setRoute(pathData);
    const kakao = window.kakao;
    const linePath = paths.map(p => new kakao.maps.LatLng(p.lat, p.lng));

    const background = new kakao.maps.Polyline({
      map: map,
      path: linePath,
      strokeWeight: 12,
      strokeColor: "#999",
      strokeOpacity: 0.4,
      strokeStyle: "dash",
    });

    const main = new kakao.maps.Polyline({
      map: map,
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#3b8eff",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    const startMarker = new kakao.maps.Marker({
      map: map,
      position: linePath[0],
      title: "출발지",
      image: new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png",
        new kakao.maps.Size(50, 45),
        { offset: new kakao.maps.Point(14, 45) }
      ),
    });

    const endMarker = new kakao.maps.Marker({
      map: map,
      position: linePath[linePath.length - 1],
      title: "도착지",
      image: new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png",
        new kakao.maps.Size(50, 45),
        { offset: new kakao.maps.Point(14, 45) }
      ),
    });

    setOverlayLines([background, main, startMarker, endMarker]);
    setHasSaved(true);
    alert("경로가 저장되었습니다.");
  };

  const DistanceInfo = ({ distance }) => {
    const walkTime = Math.floor(distance / 67);
    const bicycleTime = Math.floor(distance / 227);
    return (
      <ul className="dotOverlay distanceInfo">
        <li><span className="label">총거리</span> <span className="number">{distance}</span>m</li>
        <li><span className="label">도보</span> {walkTime > 60 && <><span className="number">{Math.floor(walkTime / 60)}</span> 시간 </>}<span className="number">{walkTime % 60}</span> 분</li>
        <li><span className="label">자전거</span> {bicycleTime > 60 && <><span className="number">{Math.floor(bicycleTime / 60)}</span> 시간 </>}<span className="number">{bicycleTime % 60}</span> 분</li>
      </ul>
    );
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "1150px" }}></div>
      {mode === "create" && (
        <button className="distance-button" onClick={savePathData}>
          경로 저장
        </button>
      )}
      {distances.length > 0 && <DistanceInfo distance={distances[0]} />}
    </div>
  );
};

export default KakaoMap;
