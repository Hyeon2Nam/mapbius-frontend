import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Distance.css";
import { createTripRoute } from "../api/tripRouteApi";

const ProfileImageUpload = ({ route }) => {
  const [imageFile, setImageFile] = useState(null); // 업로드할 파일
  const [preview, setPreview] = useState(null); // 이미지 미리보기 URL

  // 텍스트 데이터
  const [formData, setFormData] = useState({
    title: "서울 여행 추천",
    content: "서울의 주요 관광 명소를 둘러보는 여행 루트입니다.",
    isPrivate: false,
    locationInfo: route.paths,
    distances: route.distances,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      distances: route.distances[0],
      locationInfo: makeStringData(),
    });

    
  }, [route]);

  const makeStringData = () => {
    if (route.paths) {
      const locationString = route.paths
        .map((item) => `${item.lat},${item.lng}`)
        .join(",");

      return locationString;
    }
  };

  // 파일 선택 이벤트 처리
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 텍스트 입력 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 파일 업로드 요청 처리
  const handleSubmit = async () => {
    const form = new FormData();

    // 파일 데이터 추가 (파일이 없을 경우 제외)
    if (imageFile) {
      form.append("imageFile", imageFile);
    }

    // 나머지 데이터 추가
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // for (const [key, value] of formData.entries()) {
    //  console.log(key, value);
    // };

    // locationInfo undefined
    // distances undefined


    createTripRoute(form, localStorage.getItem("userToken"))
      .then((res) => {
        alert("업로드 성공!");
      })
      .catch((e) => {
        if (e.status === 403) {
          alert("로그인 해주세요");
          window.location = "/login";
        } else {
          console.error("요청 실패:", e.response || e.message);
          alert("업로드 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="distance-container">
      <h1 className="distance-h1">프로필 이미지 업로드</h1>
      <input
        type="file"
        className="distance-input"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && (
        <div className="distance-preview-container">
          <h2 className="distance-h1">미리보기</h2>
          <img src={preview} alt="이미지 미리보기" width="200" />
        </div>
      )}
      <div>
        <input
          type="text"
          className="distance-input"
          name="title"
          placeholder="제목"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          className="distance-textarea"
          name="content"
          placeholder="내용"
          value={formData.content}
          onChange={handleInputChange}
        />
        <label className="distance-label">
          <input
            type="checkbox"
            className="distance-input"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) =>
              setFormData({
                ...formData,
                isPrivate: e.target.checked,
              })
            }
          />
          비공개 여부
        </label>
      </div>
      <button className="distance-button" onClick={handleSubmit}>
        업로드
      </button>
    </div>
  );
};

export default ProfileImageUpload;
