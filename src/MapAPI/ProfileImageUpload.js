import React, { useState } from "react";
import axios from "axios";

const ProfileImageUpload = () => {
    const [imageFile, setImageFile] = useState(null); // 업로드할 파일
    const [preview, setPreview] = useState(null); // 이미지 미리보기 URL

    // 텍스트 데이터
    const [formData, setFormData] = useState({
        coverImageUrl: "https://example.com/image.jpg",
        title: "서울 여행 추천",
        content: "서울의 주요 관광 명소를 둘러보는 여행 루트입니다.",
        isPrivate: false,
        locationInfo: "서울타워, 경복궁, 홍대, 명동",
    });

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

        try {
            const response = await axios.post(
                `http://127.0.0.1:8080/api/private/travel-route/enroll`,
                form,
                {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZW03ODg3Iiwicm9sZSI6IlJPTEVfQURNSU4iLCJzdGF0ZSI6ImFjdGl2YXRlIiwibG9naW5fdHlwZSI6Im5vcm1hbCIsImlhdCI6MTczNzI5NTcyOCwiZXhwIjoxNzM3MzAyOTI4fQ.ajVGgxAtB9zUuzNLuFq3vaQsLFQ7XHagPT3gKekNNjc",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("업로드 성공!");
            console.log(response.data);
        } catch (error) {
            console.error("요청 실패:", error.response || error.message);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h1>프로필 이미지 업로드</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
                <div>
                    <h2>미리보기</h2>
                    <img src={preview} alt="이미지 미리보기" width="200" />
                </div>
            )}
            <div>
                <input
                    type="text"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    placeholder="내용"
                    value={formData.content}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="locationInfo"
                    placeholder="위치 정보"
                    value={formData.locationInfo}
                    onChange={handleInputChange}
                />
                <label>
                    <input
                        type="checkbox"
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
            <button onClick={handleSubmit}>업로드</button>
        </div>
    );
};

export default ProfileImageUpload;
