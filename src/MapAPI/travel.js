import React, { useEffect, useState } from "react";
import KakaoMap from "./calculatePolylineDistance";
import ProfileImageUpload from "./ProfileImageUpload";
import { useParams } from "react-router-dom";
import { getTripRouteData } from "../api/tripRouteApi";

const MainPage = () => {
  const params = useParams();
  const [route, setRoute] = useState({
    paths: "",
    distances: 0,
    start: null,
    end: null,
  });
  const [mode, setMode] = useState("create");
  const [routeId, setRouteId] = useState(0);
  const [routeData, setRouteData] = useState({});
  const [mapInstance, setMapInstance] = useState(null); // ← 지도 객체 상태 추가

  const getRouteDataHandler = () => {
    let obj = {
      id: params.id,
    };

    getTripRouteData(obj)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.objData;
          const pathArray = data.locationInfo.split(",").map(Number);
          const coordinates = [];
          for (let i = 0; i < pathArray.length; i += 2) {
            coordinates.push({ lat: pathArray[i], lng: pathArray[i + 1] });
          }

          // 지도에 출발지, 도착지 마커 표시
          if (window.kakao && window.kakao.maps && coordinates.length >= 2 && mapInstance) {
            const kakao = window.kakao;
            const startMarker = new kakao.maps.Marker({
              map: mapInstance,
              position: new kakao.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
              title: "출발지",
              image: new kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png",
                new kakao.maps.Size(50, 45),
                { offset: new kakao.maps.Point(14, 45) }
              ),
            });

            const endMarker = new kakao.maps.Marker({
              map: mapInstance,
              position: new kakao.maps.LatLng(
                coordinates[coordinates.length - 1].lat,
                coordinates[coordinates.length - 1].lng
              ),
              title: "도착지",
              image: new kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png",
                new kakao.maps.Size(50, 45),
                { offset: new kakao.maps.Point(14, 45) }
              ),
            });

            // 지도 객체가 로드되면 마커를 지도에 추가
            if (window.mapInstance) {
              startMarker.setMap(window.mapInstance);
              endMarker.setMap(window.mapInstance);
            }
          }

          setRoute({
            paths: data.locationInfo,
            distances: data.distances,
            start: coordinates[0],
            end: coordinates[coordinates.length - 1],
          });
          setRouteData(data);
        }
      })
      .catch((e) => {
        alert("오류가 발생하였습니다");
        window.location = "/";
      });
  };

  useEffect(() => {
    setMode(params.mode);
    setRouteId(params.id);

    if (params.mode === "view") {
      getRouteDataHandler();
    }
  }, [mapInstance]);

  return (
    <div>
      <main>
        {/* Kakao Map Section */}
        <section>
          <KakaoMap setRoute={setRoute} routeData={routeData} mode={mode} onMapLoad={setMapInstance} />
        </section>
        {/* Profile Image Upload Section */}

        {mode === "create" && (
          <section>
            <ProfileImageUpload route={route} />
          </section>
        )}
      </main>
    </div>
  );
};

export default MainPage;
