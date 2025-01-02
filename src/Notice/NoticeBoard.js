import { useEffect, useState } from "react";
import NoticeList from "./NoticeList";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeList.scss";
import PageNation from "./PageNation";
import { getItemWithPage } from "./../api/noticeApi";

export default function Notice() {
  const nav = useNavigate();
  const params = useParams();
  const [noticeList, setNoticeList] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [curpage, setCurpage] = useState(1);
  const [maxpage, setMaxpage] = useState(1);
  const [searchType, setSearchType] = useState("title");

  useEffect(() => {
    if (localStorage.getItem("people1") === "partsOfGun") setIsAdmin(true);
  }, []);

  const getItemList = async () => {
    await getItemWithPage({
      curpage: params.page,
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
    checkPage();
    setCurpage(params.page);
    getItemList();
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
      <div className="page-title-wrapper">
        <img
          src={process.env.PUBLIC_URL + "/imgs/logoFit.jpg"}
          onClick={() => {
            nav("/");
          }}
        />
        <div className="page-title">공지사항</div>
      </div>
      <div className="notice-list">
        <div>
          <div className="back-text">NOTICE</div>
          <div className="search">
            <select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            >
              <option value={"title"}>제목</option>
              <option value={"content"}>내용</option>
            </select>
            <input
              type="text"
              value={search}
              placeholder="검색어 입력"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchNoticeHandler}>
              <img src={process.env.PUBLIC_URL + "/imgs/searchIcon.png"} />
            </button>
          </div>
        </div>
        <NoticeList list={noticeList} />
        <div className="bottom-menu">
          {isAdmin && (
            <button
              onClick={() => {
                nav("/notice/create/0");
              }}
            >
              글쓰기
            </button>
          )}
        </div>
        <PageNation pages={pages} curpage={curpage} maxpage={maxpage} />
      </div>
    </div>
  );
}
