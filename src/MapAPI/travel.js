import React, { useEffect, useState } from "react";
import KakaoMap from "./calculatePolylineDistance";
import ProfileImageUpload from "./ProfileImageUpload";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const params = useParams();
  const [route, setRoute] = useState({
    paths: "",
    distances: 0,
  });
  const [mode, setMode] = useState("create");
  const [routeId, setRouteId] = useState(0);
  const [routeData, setRouteData] = useState({});

  useEffect(() => {
    setMode(params.mode);
    setRouteId(params.id);
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
