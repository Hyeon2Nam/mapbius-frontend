import React, { useEffect, useState } from "react";
import "./styles.css";

/* global kakao */

<<<<<<< HEAD
const KakaoMap = ({ setRoute, routeData, mode }) => {
=======
const KakaoMap = ({ setRoute, routeData, mode, onMapLoad }) => {
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
  const [map, setMap] = useState(null);
  const [isdrawing, setIsdrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [clickLine, setClickLine] = useState(null);
  const [moveLine, setMoveLine] = useState(null);
<<<<<<< HEAD
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
=======
  const [overlayLines, setOverlayLines] = useState([]);
  const [hasSaved, setHasSaved] = useState(false);
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d

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
<<<<<<< HEAD

=======
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
    return coordinates;
  };

  useEffect(() => {
    if (mode === "view" && routeData) {
      const savedPaths = reFormPathData();
<<<<<<< HEAD

      setDistances([routeData.distances]);
      setPaths(savedPaths);

      const kakao = window.kakao;
      clickLine.setPath(
        savedPaths.map((p) => new kakao.maps.LatLng(p.lat, p.lng))
      );
=======
      setDistances([routeData.distances]);
      setPaths(savedPaths);
      const kakao = window.kakao;
      clickLine?.setPath(savedPaths.map(p => new kakao.maps.LatLng(p.lat, p.lng)));
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
    }
  }, [routeData]);

  useEffect(() => {
<<<<<<< HEAD
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
    if (mode === "view") {
      return;
    }

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
=======
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
        onMapLoad && onMapLoad(mapInstance);

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

>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
    setIsdrawing(true);
  };

  const handleMouseMove = (mouseEvent) => {
<<<<<<< HEAD
    if (mode === "view") {
      return;
    }

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
=======
    if (mode === "view") return;
    const latLng = mouseEvent.latLng;
    const kakao = window.kakao;

    if (isdrawing && paths.length > 0) {
      const lastPath = paths[paths.length - 1];
      moveLine?.setPath([
        new kakao.maps.LatLng(lastPath.lat, lastPath.lng),
        latLng,
      ]);
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
    }
  };

  const handleRightClick = () => {
<<<<<<< HEAD
    if (mode === "view") {
      return;
    }

    setIsdrawing(false);
    moveLine.setPath([]); // 이동 중인 선 초기화
=======
    if (mode === "view") return;
    setIsdrawing(false);
    moveLine?.setPath([]);
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
  };

  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, "click", handleClick);
      kakao.maps.event.addListener(map, "mousemove", handleMouseMove);
      kakao.maps.event.addListener(map, "rightclick", handleRightClick);
    }
<<<<<<< HEAD

=======
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, "click", handleClick);
        kakao.maps.event.removeListener(map, "mousemove", handleMouseMove);
        kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
      }
    };
  }, [map, isdrawing, paths]);

  const savePathData = () => {
<<<<<<< HEAD
    const pathData = {
      paths,
      distances,
    };

    setRoute(pathData);

    // 폴리라인 초기화
    // setPaths([]);
    // setDistances([]);
    // if (clickLine) clickLine.setPath([]);
    // if (moveLine) moveLine.setPath([]);

    alert(`경로가 저장되었습니다.`);
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
=======
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

    //출발 도착 마커1
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
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
  };

  const DistanceInfo = ({ distance }) => {
    const walkTime = Math.floor(distance / 67);
    const bicycleTime = Math.floor(distance / 227);
<<<<<<< HEAD

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
=======
    return (
      <ul className="dotOverlay distanceInfo">
        <li><span className="label">총거리</span> <span className="number">{distance}</span>m</li>
        <li><span className="label">도보</span> {walkTime > 60 && <><span className="number">{Math.floor(walkTime / 60)}</span> 시간 </>}<span className="number">{walkTime % 60}</span> 분</li>
        <li><span className="label">자전거</span> {bicycleTime > 60 && <><span className="number">{Math.floor(bicycleTime / 60)}</span> 시간 </>}<span className="number">{bicycleTime % 60}</span> 분</li>
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
      </ul>
    );
  };

  return (
    <div>
<<<<<<< HEAD
      <div
        id="map"
        style={{
          width: "100%",
          height: "1150px",
        }}
      ></div>

=======
      <div id="map" style={{ width: "100%", height: "1150px" }}></div>
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
      {mode === "create" && (
        <button className="distance-button" onClick={savePathData}>
          경로 저장
        </button>
      )}
<<<<<<< HEAD

=======
>>>>>>> d4916f733f7c835e74504b5bfb93a3d809f5480d
      {distances.length > 0 && <DistanceInfo distance={distances[0]} />}
    </div>
  );
};

export default KakaoMap;
