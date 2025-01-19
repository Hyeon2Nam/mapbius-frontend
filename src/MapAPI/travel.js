import React, { useState } from "react";
import KakaoMap from "./calculatePolylineDistance";
import ProfileImageUpload from "./ProfileImageUpload";

const MainPage = () => {
const [route, setRoute] = useState({
  paths:"",
  distances:0
})

  return (
    <div>
      <main>
        {/* Kakao Map Section */}
        <section>
          <KakaoMap setRoute={setRoute} />
        </section>
        {/* Profile Image Upload Section */}
        <section>
          <ProfileImageUpload route={route} />
        </section>
      </main>
    </div>
  );
};

export default MainPage;