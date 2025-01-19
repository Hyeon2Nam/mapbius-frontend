import ReviewList from "./ReviewList.js";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { getRegionImg } from "../api/regionApi.js";
import { getProfileImg } from "../api/myPageApi.js";
import { getTodayDateText } from "../mypage/UtileFunc.js";
import { addReviewItem, getReviewList } from "./../api/mapApi";

const PlaceInfo = ({ place }) => {
  const [value, setValue] = useState(3);
  const [isBookmark, setIsBookmark] = useState(false);
  const [backImg, setBackImg] = useState(
    "https://d12zq4w4guyljn.cloudfront.net/750_750_20240306021828565_photo_f4b171bf1359.jpg"
  );
  const [reviewList, setReviewList] = useState([]);
  const [reviewData, setReviewData] = useState({
    userNm: "",
    phoneNumber: place.id,
    content: "",
    rating: value,
    profileImage: null,
  });
  const [isLogin, setisLogin] = useState(false);

  const addNewReview = async () => {
    await setReviewData({
      ...reviewData,
      rating: value,
      date: getTodayDateText(),
    });

    let obj = {
      phoneNumber: place.id,
      content: reviewData.content,
      rating: value,
    };

    setReviewList(reviewList.concat(reviewData));
    setReviewData({
      ...reviewData,
      content: "",
    });

    addReviewItem(obj, localStorage.getItem("userToken"))
      .then((res) => {})
      .catch((e) => {
        alert("리뷰 작성 오류. 다시 로그인 해주세요");
        window.location = "/login";
      });
  };

  const setBackImgHandler = () => {
    let obj = {
      query: place.name + " " + place.address,
    };

    getRegionImg(obj)
      .then((res) => {
        if (res.status === 200) {
          setBackImg(res.data[0].thumbnail);
        }
      })
      .catch((e) => {
        setBackImg(process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg");
      });
  };

  const fetchImage = async () => {
    await getProfileImg(localStorage.getItem("userToken"))
      .then((res) => {
        if (res.status === 200) {
          setReviewData({
            ...reviewData,
            profileImage: res.data.fileUrl,
            userNm: res.data.userNm,
          });
          setisLogin(true);
        }
      })
      .catch((e) => {
        setisLogin(false);
      });
  };

  const getReviewListHandler = () => {
    let obj = {
      phoneNumber: place.id,
    };

    getReviewList(obj)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setReviewList(res.data.objData);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    setBackImgHandler();
    getReviewListHandler();
  }, [place]);

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <div className="head-section place">
        <img className="back-img" src={backImg} alt="" />
        <div className="text-section">
          <span className="place-name">{place.name}</span>
          <span>{place.address}</span>
          <div>
            <img
              className="call-img"
              src={process.env.PUBLIC_URL + "/imgs/callIcon.png"}
              alt=""
            />
            <span>{place.phone ? place.phone : "전화 정보 없음"}</span>
          </div>
          <div>
            {place.rating > 0 ? (
              <>
                <img
                  className="rating-img"
                  src={
                    process.env.PUBLIC_URL +
                    "/imgs/starRate" +
                    place.rating +
                    ".png"
                  }
                  alt=""
                />
                <span>
                  {place.rating}
                  {" (후기 "}
                  {place.reviews}
                  {")"}
                </span>
              </>
            ) : (
              <span>후기 정보 없음</span>
            )}
          </div>
        </div>
      </div>
      <div
        className="bookmark-bar"
        onClick={() => {
          setIsBookmark(!isBookmark);
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/imgs/bookmark" + isBookmark + ".png"}
          alt=""
        />
      </div>
      <ReviewList list={reviewList} />
      <div className="input-section">
        <div className="input-container">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setReviewData({
                ...reviewData,
                rating: newValue,
              });
            }}
          />
          <div>
            <textarea
              name="content"
              value={isLogin ? reviewData.content : "로그인해주세요"}
              onChange={(e) => {
                setReviewData({ ...reviewData, content: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNewReview();
                  setReviewData({ ...reviewData, content: "" });
                }
              }}
              disabled={!isLogin}
            />
            <button onClick={addNewReview}>입력</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceInfo;
