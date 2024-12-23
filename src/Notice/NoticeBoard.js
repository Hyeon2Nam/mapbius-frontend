import { useState } from "react";
import NoticeList from "./NoticeList";
import { Link } from "react-router-dom";

export default function Notice() {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);

  const dumpList = [
    {
      id: 1,
      title: "1234",
      category: "공지",
      date: "2024-12-12",
    },
    {
      id: 2,
      title: "1234",
      category: "공지",
      date: "2024-12-12",
    },
    {
      id: 3,
      title: "1234",
      category: "공지",
      date: "2024-12-12",
    },
    {
      id: 4,
      title: "1234",
      category: "공지",
      date: "2024-12-12",
    },
    {
      id: 5,
      title: "1234",
      category: "공지",
      date: "2024-12-12",
    },
  ];

  return (
    <div>
      <h3>검색</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <h1>공지사항</h1>
      <NoticeList list={dumpList.reverse()} />
      <div className="pagenation"></div>
      <Link to={"/notice/create/0"}>
        <button>글쓰기</button>
      </Link>
    </div>
  );
}
