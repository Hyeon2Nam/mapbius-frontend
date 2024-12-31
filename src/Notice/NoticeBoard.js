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
  const [isAdmin, setIsAdmin] = useState(true);
  const [curpage, setCurpage] = useState(1);
  const [maxpage, setMaxpage] = useState(1);

  useEffect(() => {
    if (params.page > maxpage || params.page < 1) {
      nav("/notice/1");
      return;
    }

    setCurpage(params.page);

    getItemWithPage({ curpage: params.page })
      .then((res) => {
        if (res.status === 200) {
          setNoticeList(res.data.items);
          setMaxpage(res.data.maxpage);
        }
      })
      .catch((e) => {});
  }, [params.page]);

  useEffect(() => {
    const start = (Math.ceil(params.page / 5) - 1) * 5 + 1;
    setPages(
      Array.from(
        { length: Math.min(maxpage - start + 1, 5) },
        (v, i) => i + start
      )
    );
  }, [noticeList]);

  const searchNoticeHandler = () => {
    let obj = {
      title: search,
    };
  };

  return (
    <div className="notice-board-container">
      <div className="page-title-wrapper">
        <img src={process.env.PUBLIC_URL + "/imgs/logo.jpg"} />
        <div className="page-title">공지사항</div>
      </div>
      <div className="back-text">NOTICE</div>
      <div className="notice-list">
        <NoticeList list={noticeList.reverse()} />
        <PageNation pages={pages} curpage={curpage} maxpage={maxpage} />
        <div className="bottom-menu">
          <div className="search">
            <input type="button" value={"검색"} onClick={searchNoticeHandler} />
            <input
              value={search}
              placeholder="검색어 입력"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
      </div>
    </div>
  );
}
