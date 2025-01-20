import { useEffect, useState } from "react";
// import NoticeList from "./NoticeList";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeList.scss";
import { getItemWithPage } from "./../api/noticeApi";
import TripList from "../mypage/trip/TripLIst";
import PageNation from "../Notice/PageNation";
import { getPublicTripRouteList } from "../api/tripRouteApi";

const TripBoard = () => {
  const nav = useNavigate();
  const params = useParams();
  const [noticeList, setNoticeList] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [curpage, setCurpage] = useState(1);
  const [maxpage, setMaxpage] = useState(2);
  const [searchType, setSearchType] = useState("title");

  const getAllPublicTripList = () => {
    getPublicTripRouteList()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setNoticeList(res.data.objData);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    // if (localStorage.getItem("people1") === "partsOfGun") setIsAdmin(true);
    getAllPublicTripList();
  }, []);

  const getItemList = async () => {
    await getItemWithPage({
      curpage: curpage,
      keyword: search,
      type: searchType,
    })
      .then((res) => {
        if (res.status === 200) {
          setNoticeList(res.data.objData.items);
          setMaxpage(res.data.objData.maxpage);
        }
      })
      .catch((e) => {});
  };

  const checkPage = () => {
    if (params.page > maxpage || params.page < 1 || params.page === undefined) {
      nav("/trip/1");
      return;
    }
  };

  useEffect(() => {
    checkPage();
    setCurpage(params.page);

    if (params.page === "1") {
      setNoticeList(noticeList.slice(0, 4));
    } else {
      setNoticeList(noticeList.slice(4, 6));
    }
    // getItemList();
  }, [params.page]);

  useEffect(() => {
    const itemMax = 5;

    checkPage();
    const start = (Math.ceil(params.page / itemMax) - 1) * itemMax + 1;

    setPages(
      Array.from(
        { length: Math.min(maxpage - start + 1, itemMax) },
        (v, i) => i + start
      )
    );
  }, [noticeList]);

  const searchNoticeHandler = () => {
    setCurpage(1);
    getItemList();
  };

  return (
    <div className="notice-board-container">
      <div className="notice-list">
        <div className="search">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}
          >
            <option value={"title"}>제목</option>
            <option value={"content"}>아이디</option>
          </select>
          <input
            type="text"
            value={search}
            placeholder="검색어 입력"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchNoticeHandler();
              }
            }}
          />
          <button onClick={searchNoticeHandler}>
            <img src={process.env.PUBLIC_URL + "/imgs/searchIcon.png"} />
          </button>
        </div>
        <div className="bottom-menu">
          <button
            onClick={() => {
              nav("/travel/create/0");
            }}
          >
            만들기
          </button>
        </div>
        <TripList list={noticeList} />
        {/* <PageNation
          pages={pages}
          curpage={curpage}
          maxpage={maxpage}
          category={"trip"}
        /> */}
      </div>
    </div>
  );
};

export default TripBoard;
