import { useNavigate } from "react-router-dom";

export default function PageNation({ pages, curpage, maxpage, category }) {
  const nav = useNavigate();

  return (
    <div className="pagenation">
      <button onClick={() => nav("/" + category + "/1")}>&lt;&lt;</button>
      <button
        onClick={() => {
          const targetPage = curpage > 1 ? curpage - 1 : 1;
          nav(`/${category}/${targetPage}`);
        }}
      >
        &lt;
      </button>
      {pages?.map((i) => (
        <button
          key={i}
          className={i === +curpage ? "cur-page" : ""}
          onClick={() => {
            nav("/" + category + "/" + i);
          }}
        >
          {i}
        </button>
      ))}
      <button
        onClick={() => {
          const targetPage = curpage < maxpage ? +curpage + 1 : maxpage;
          nav(`/${category}/${targetPage}`);
        }}
      >
        &gt;
      </button>
      <button onClick={() => nav("/" + category + "/" + maxpage)}>
        &gt;&gt;
      </button>
    </div>
  );
}
