import React, { useState } from "react";
import { uploadProfileImg } from "../api/myPageApi";
import { useNavigate } from "react-router-dom";

const ProfileImageUpload = ({ onChangeProfileImg }) => {
  const nav = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("업로드할 파일을 선택하세요!");
      return;
    }

    onChangeProfileImg(file);

    const formData = new FormData();
    formData.append("file", file);

    uploadProfileImg(formData, localStorage.getItem("userToken"))
      .then((res) => {
        alert("업로드 성공");
      })
      .catch((e) => {
        if (e.status === 403) {
          alert("다시 로그인 해주세요");
          nav("/logn");
        }
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default ProfileImageUpload;
