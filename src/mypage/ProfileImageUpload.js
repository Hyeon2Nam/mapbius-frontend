import React, { useState } from "react";
import axios from "axios";
import { uploadProfileImg } from "../api/myPageApi";

const ProfileImageUpload = () => {
  const [file, setFile] = useState(null); // 업로드할 파일
  const [preview, setPreview] = useState(null); // 이미지 미리보기 URL

  // 파일 선택 이벤트 처리
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 파일 업로드 요청 처리
  const handleUpload = async () => {
    if (!file) {
      alert("업로드할 파일을 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // 업로드할 파일

    uploadProfileImg(formData, localStorage.getItem("userToken"))
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    // try {
    //   console.log(formData instanceof FormData);

    //   await axios.post(
    //     "http://127.0.0.1:8080/api/private/account/uploadProfileImage",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer " + localStorage.getItem("userToken"),
    //       },
    //     }
    //   );
    //   alert("업로드 성공!");
    // } catch (error) {
    //   console.error("업로드 실패:", error);
    //   alert("업로드 중 오류가 발생했습니다.");
    // }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default ProfileImageUpload;
