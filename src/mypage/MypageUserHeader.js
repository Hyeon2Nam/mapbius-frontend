import { useNavigate } from "react-router-dom";
import "../style/mypageCommon.scss";
import { useEffect, useState } from "react";
import { getProfileImg } from "../api/myPageApi";
import { useSelector } from "react-redux";
import { selectProfileImg } from "../@modules/mypage";

const MypageUserHeader = () => {
  const nav = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [nickName, setNickName] = useState("");
  const profileImg = useSelector(selectProfileImg);

  useEffect(() => {
    if (profileImg) {
      const objectUrl = URL.createObjectURL(profileImg);
      setImageUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [profileImg]);

  useEffect(() => {
    const fetchImage = async () => {
      await getProfileImg(localStorage.getItem("userToken"))
        .then((res) => {
          if (res.status === 200) {
            setImageUrl(res.data.fileUrl);
            setNickName(res.data.userNm);
          }
        })
        .catch((e) => {
          if (e.status === 403) {
            alert("다시 로그인해주세요");
            nav("/login");
          }
        });
    };

    fetchImage();
  }, []);

  return (
    <div className="mypage-userheader">
      <div className="user-img">
        <img
          src={
            imageUrl
              ? imageUrl
              : process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg"
          }
        />
      </div>
      <div
        className="text-wrapper"
        onClick={() => {
          nav("/mypage/main");
        }}
      >
        <div className="hello-user">안녕하세요 {nickName}님</div>
        <div className="intro-text">
          당신만의 보물을 찾아 떠나는 여정, 맵비우스에서 시작하세요!
        </div>
      </div>
    </div>
  );
};

export default MypageUserHeader;
