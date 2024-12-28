import { useEffect, useState } from "react";
import NoticeList from "./NoticeList";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeList.scss";
import PageNation from "./PageNation";

export default function Notice() {
  const nav = useNavigate();
  const params = useParams();
  const [noticeList, setNoticeList] = useState({});
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [curpage, setCurpage] = useState(1);
  const MAXPage = 13;

  const dumpList = [
    {
      id: 1,
      title:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하",
      category: "공지",
      date: "2024-12-12",
    },
    {
      id: 2,
      title: "1234",
      category: "공지",
      date: "2024-12-14",
    },
    {
      id: 3,
      title: "1234",
      category: "공지",
      date: "2024-12-16",
    },
    {
      id: 4,
      title: "1234",
      category: "공지",
      date: "2024-12-18",
    },
    {
      id: 5,
      title: "1234",
      category: "공지",
      date: "2024-12-20",
    },
  ];

  useEffect(() => {
    if (params.page > MAXPage || params.page < 1) {
      nav("/notice/1");
      return;
    }

    const start = (Math.ceil(params.page / 5) - 1) * 5 + 1;
    setCurpage(params.page);
    setPages(
      Array.from(
        { length: Math.min(MAXPage - start + 1, 5) },
        (v, i) => i + start
      )
    );
  }, [params.page]);

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
        <NoticeList list={dumpList.reverse()} />
        <PageNation pages={pages} curpage={curpage} MAXPage={MAXPage} />
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
