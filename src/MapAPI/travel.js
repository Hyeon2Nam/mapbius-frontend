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
  });
  const [mode, setMode] = useState("create");
  const [routeId, setRouteId] = useState(0);
  const [routeData, setRouteData] = useState({});

  const getRouteDataHandler = () => {
    let obj = {
      id: params.id,
    };

    getTripRouteData(obj)
      .then((res) => {
        if (res.status === 200) {
          setRouteData(res.data.objData);
        }
      })
      .catch((e) => {
        // if (e.status === 404) {
        alert("오류가 발생하였습니다");
        window.location = "/";
        // }
      });
  };

  useEffect(() => {
    setMode(params.mode);
    setRouteId(params.id);

    if (params.mode === "view") {
      getRouteDataHandler();
    }
  }, []);

  return (
    <div>
      <main>
        {/* Kakao Map Section */}
        <section>
          <KakaoMap setRoute={setRoute} routeData={routeData} mode={mode} />
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
