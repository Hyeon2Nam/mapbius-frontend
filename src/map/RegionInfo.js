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
  const [isBookmark, setIsBookmark] = useState(false);
  const [backImg, setBackImg] = useState("");
  const [population, setPopulation] = useState(0);
  const [productList, setProductList] = useState(null);
  const [newsList, setNewsList] = useState(null);
  const [tripRouteList, setTripRouteList] = useState([
    {
      img: "https://img.siksinhot.com/place/1695358551647068.jpg?w=560&h=448&c=Y",
      name: "청양 맛집 루트",
      range: "public",
      description: "청양 맛집 리스트 입니다~",
      date: "2025-01-14",
      like: 2,
      nickname: "asdf222",
      profileImg:
        "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.jpg",
    },
    {
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
      nickname: "기니",
      name: "8월 가볼만한 국내여행지",
      description: "바다가 끝내줍니다!",
      date: "2024-12-28",
      like: 2,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MDZfMjI5%2FMDAxNzIyOTQ2NjM1MDIz.Aw5RWmb4c02WDHZ4r-WUQfRqc8Ww0KnwcEiOUxj1IZwg.kOd_EFFapko24Yo3Djb-0FlzeUSIi7Azm2LJ1qMzTl4g.JPEG%2FDSC06592.jpg&type=a340",
      range: "public",
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
      .catch((e) => {});
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
      .catch((e) => {});

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
      .catch((e) => {});
  };

  const getFestival = () => {
    let obj = {
      region: region.name,
    };

    getRegionFes(obj)
      .then((res) => {
        if (res.status === 200) {
          setFestivalList(res.data.items.item);
        }
      })
      .catch((e) => {});
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
      .catch((e) => {});
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
      .catch((e) => {});
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
