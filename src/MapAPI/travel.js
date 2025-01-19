import React from "react";
import KakaoMap from "./calculatePolylineDistance";
import ProfileImageUpload from "./ProfileImageUpload";

const MainPage = () => {
  return (
    <div>
      <main>
        {/* Kakao Map Section */}
        <section>
          <KakaoMap />
        </section>
        {/* Profile Image Upload Section */}
        <section>
          <h2>프로필 이미지 및 여행 정보 업로드</h2>
          <ProfileImageUpload />
        </section>
      </main>
    </div>
  );
};

export default MainPage;
