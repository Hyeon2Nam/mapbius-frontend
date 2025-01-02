import { useNavigate } from "react-router-dom";

export default function PageNation({ pages, curpage, maxpage }) {
  const nav = useNavigate();

  return (
    <div className="pagenation">
      <button onClick={() => nav("/notice/1")}>&lt;&lt;</button>
      <button
        onClick={() => {
          const targetPage = curpage > 1 ? curpage - 1 : 1;
          nav(`/notice/${targetPage}`);
        }}
      >
        &lt;
      </button>
      {pages?.map((i) => (
        <button
          key={i}
          className={i === +curpage ? "cur-page" : ""}
          onClick={() => {
            nav("/notice/" + i);
          }}
        >
          {i}
        </button>
      ))}
      <button
        onClick={() => {
          const targetPage = curpage < maxpage ? +curpage + 1 : maxpage;
          nav(`/notice/${targetPage}`);
        }}
      >
        &gt;
      </button>
      <button onClick={() => nav("/notice/" + maxpage)}>&gt;&gt;</button>
    </div>
  );
}
