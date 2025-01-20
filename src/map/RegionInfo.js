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
import { getPublicTripRouteList } from "../api/tripRouteApi";

const RegionInfo = ({ region }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [backImg, setBackImg] = useState("");
  const [population, setPopulation] = useState(0);
  const [productList, setProductList] = useState(null);
  const [newsList, setNewsList] = useState(null);
  const [tripRouteList, setTripRouteList] = useState(null);
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

  const getTwoTripList = () => {
    getPublicTripRouteList()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTripRouteList(res.data.objData.slice(0, 2));
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (region && region.name) {
      getBackImg();
      getFestival();
      getPopulation();
      getAreaCodeHandler();
      getNews();
      getTwoTripList();
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
