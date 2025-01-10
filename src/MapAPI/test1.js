import React, { useEffect, useRef, useState } from "react";

/* global kakao */

const KakaoMapDistance = () => {
  const mapRef = useRef(null);
  const clickLineRef = useRef(null);
  const moveLineRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API not loaded");
      return;
    }

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.498004414546934, 127.02770621963765),
      level: 5,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const handleMapClick = (mouseEvent) => {
      const clickedPosition = mouseEvent.latLng;

      if (!isDrawing) {
        if (clickLineRef.current) clickLineRef.current.setMap(null);
        clickLineRef.current = new kakao.maps.Polyline({
          map,
          path: [],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        if (moveLineRef.current) moveLineRef.current.setMap(null);
        moveLineRef.current = new window.kakao.maps.Polyline({
          map,
          path: [],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 0.5,
          strokeStyle: "solid",
        });

        setPaths([]);
        setDistances([]);
        setIsDrawing(true);
      }

      const newPaths = [...paths, clickedPosition];
      clickLineRef.current.setPath(newPaths);
      setPaths(newPaths);

      if (newPaths.length > 1) {
        const distance = Math.round(clickLineRef.current.getLength());
        setDistances((prev) => [...prev, distance]);
      }
    };

    const handleMouseMove = (mouseEvent) => {
      if (!isDrawing || !clickLineRef.current) return;
      const mousePos = mouseEvent.latLng;
      setMousePosition(mousePos);
      const currentPath = [...clickLineRef.current.getPath(), mousePos];
      moveLineRef.current.setPath(currentPath);
    };

    const handleRightClick = () => {
      setIsDrawing(false);
      if (moveLineRef.current) moveLineRef.current.setMap(null);
      if (clickLineRef.current) clickLineRef.current.setMap(null);
      setPaths([]);
      setDistances([]);
    };

    window.kakao.maps.event.addListener(map, "click", handleMapClick);
    window.kakao.maps.event.addListener(map, "mousemove", handleMouseMove);
    window.kakao.maps.event.addListener(map, "rightclick", handleRightClick);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleMapClick);
      window.kakao.maps.event.removeListener(map, "mousemove", handleMouseMove);
      window.kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
    };
  }, [isDrawing, paths]);

  const DistanceInfo = ({ distance }) => {
    const walkkTime = Math.floor(distance / 67);
    const bycicleTime = Math.floor(distance / 227);

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{" "}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{" "}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{" "}
              시간{" "}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "450px" }}></div>
      {distances.length > 0 &&
        distances.map((distance, index) => (
          <DistanceInfo key={index} distance={distance} />
        ))}
    </div>
  );
};

export default KakaoMapDistance;
