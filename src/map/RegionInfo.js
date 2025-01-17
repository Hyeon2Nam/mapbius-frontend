import { useEffect, useState } from "react";
import {
  getRegionFes,
  getRegionImg,
  getRegionName,
  getRegionNews,
  getRegionPopulation,
  getRegionProduct,
} from "../api/regionApi";
import ListContent from "./ListContent";

const RegionInfo = ({ region }) => {
  const [backImg, setBackImg] = useState("");
  const [population, setPopulation] = useState(0);
  const [productList, setProductList] = useState(null);
  const [newsList, setNewsList] = useState(null);
  const [tripRouteList, setTripRouteList] = useState([
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "public",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트",
      range: "public",
      description:
        "청양 맛집 리스트 입니다~청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다청양 맛집 리스트 입니다",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "public",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
  ]);
  const [festivalList, setFestivalList] = useState(null);

  const getPopulation = () => {
    let obj = {
      region: region.name,
    };

    getRegionPopulation(obj)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.item;
          let totalPopulation = 0;

          for (let i = 0; i < data.length; i++) {
            totalPopulation += +data[i].totNmprCnt;
          }

          setPopulation(totalPopulation);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAreaCodeHandler = async () => {
    let obj = {
      region: region.category,
    };

    let areaCode = 0;

    await getRegionName(obj)
      .then((res) => {
        if (res.status === 200) {
          const fr = res.data.item.filter((e) =>
            e.areaNm.includes(region.name)
          );
          areaCode = fr[0].areaCode;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    if (areaCode > 0) {
      getTourInfo(areaCode);
    }
  };

  const getTourInfo = (areacode) => {
    let obj = {
      region: areacode,
    };

    getRegionProduct(obj)
      .then((res) => {
        if (res.status === 200) {
          setProductList(res.data.item);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getFestival = () => {
    let obj = {
      region: region.name,
    };

    getRegionFes(obj)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.items.item);
          setFestivalList(res.data.items.item);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getNews = () => {
    let obj = {
      query: region.name,
    };

    getRegionNews(obj)
      .then((res) => {
        if (res.status === 200) {
          setNewsList(res.data.slice(0, 10));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBackImg = () => {
    let obj = {
      query: region.name + "풍경",
    };

    getRegionImg(obj)
      .then((res) => {
        if (res.status === 200) {
          setBackImg(res.data[0].thumbnail);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (region) {
      getBackImg();
      getFestival();
      getPopulation();
      getAreaCodeHandler();
      getNews();
    }
  }, [region]);

  return (
    <>
      <div className="head-section region">
        <img
          className="back-img"
          src={
            backImg
              ? backImg
              : "https://d12zq4w4guyljn.cloudfront.net/750_750_20240306021828565_photo_f4b171bf1359.jpg"
          }
          alt=""
        />
        <div className="text-section">
          <span className="place-name">{region.name}</span>
          <span>인구 수 {population}명</span>
        </div>
      </div>
      <div className="content-list">
        {festivalList && (
          <div className="category">
            <div className="category-section">
              <img
                src={process.env.PUBLIC_URL + "/imgs/festivalIcon.png"}
                alt=""
              />
              <span>축제</span>
            </div>
            <ListContent list={festivalList} divCnt={2} category={"festival"} />
          </div>
        )}
        {productList && (
          <div className="category">
            <div className="category-section">
              <img
                src={process.env.PUBLIC_URL + "/imgs/productIcon.png"}
                alt=""
              />
              <span>특산물</span>
            </div>
            <ListContent list={productList} divCnt={1} category={"product"} />
          </div>
        )}
        {newsList && (
          <div className="category">
            <div className="category-section">
              <img src={process.env.PUBLIC_URL + "/imgs/newsIcon.png"} alt="" />
              <span>뉴스</span>
            </div>
            <ListContent list={newsList} divCnt={2} category={"news"} />
          </div>
        )}
        {tripRouteList && (
          <div className="category">
            <div className="category-section">
              <img
                src={process.env.PUBLIC_URL + "/imgs/tripRouteIcon.png"}
                alt=""
              />
              <span>추천 여행 루트</span>
            </div>
            <ListContent list={tripRouteList} divCnt={2} category={"trip"} />
          </div>
        )}
      </div>
    </>
  );
};

export default RegionInfo;
