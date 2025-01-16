import { useEffect, useState } from "react";
// import NoticeList from "./NoticeList";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeList.scss";
import { getItemWithPage } from "./../api/noticeApi";
import TripList from "../mypage/trip/TripLIst";
import PageNation from "../Notice/PageNation";

const TripBoard = () => {
  const nav = useNavigate();
  const params = useParams();
  const [noticeList, setNoticeList] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [curpage, setCurpage] = useState(1);
  const [maxpage, setMaxpage] = useState(1);
  const [searchType, setSearchType] = useState("title");

  const dump = [
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트청양 맞집 루트",
      range: "private",
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
      range: "private",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
    {
      img: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
      name: "청양 맞집 루트",
      range: "private",
      description: "청양 맛집 리스트 입니다청양 맛집 리스트 입니다~",
      date: "2022-12-12",
      like: 20,
      nickname: "asdf222",
      profileImg: process.env.PUBLIC_URL + "/imgs/gyeongbokgung.jpg",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("people1") === "partsOfGun") setIsAdmin(true);
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
      nav("/notice/1");
      return;
    }
  };

  useEffect(() => {
    // checkPage();
    // setCurpage(params.page);
    // getItemList();
  }, [params.page]);

  useEffect(() => {
    checkPage();
    const start = (Math.ceil(params.page / 5) - 1) * 5 + 1;

    setPages(
      Array.from(
        { length: Math.min(maxpage - start + 1, 5) },
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
        <TripList list={dump} />
        {/* <div className="bottom-menu">
          {isAdmin && (
            <button
              onClick={() => {
                nav("/notice/create/0");
              }}
            >
              만들기기
            </button>
          )}
        </div> */}
        <PageNation pages={pages} curpage={curpage} maxpage={maxpage} />
      </div>
    </div>
  );
};

export default TripBoard;
