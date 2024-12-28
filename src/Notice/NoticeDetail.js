import { Link, useParams } from "react-router-dom";
import "../style/NoticeDetail.scss";
import { useState } from "react";

export default function NoticeDetail() {
  const params = useParams();
  const [isAdmin, setisAdmin] = useState(true);

  const dump = {
    title: "Hello World",
    content: "Tell Your World",
    date: "2024-12-25",
  };

  const deleteNoticeHandler = () => {};
  return (
    <div className="notice-detail">
      <div className="page-title-wrapper">
        <img src={process.env.PUBLIC_URL + "/imgs/logo.jpg"} />
        <div className="page-title">공지사항</div>
      </div>
      <div className="main-container">
        {isAdmin && (
          <div className="btn-wrapper">
            <button className="gray-btn" onClick={deleteNoticeHandler}>
              삭제
            </button>
            <button className="gray-btn">
              <Link to={"/notice/edit/" + params.id}>수정</Link>
            </button>
          </div>
        )}
        <div className="title-bar">
          <span className="blue-text">NOTICE</span>
          <span className="notice-title">{dump.title}</span>
          <span>{dump.date}</span>
        </div>
        <div className="content">{dump.content}</div>
        <button className="list-btn">
          <Link to={"/notice/1"}>목록으로</Link>
        </button>
      </div>
    </div>
  );
}
