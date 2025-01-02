import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeDetail.scss";
import { useEffect, useState } from "react";
import { deleteItem, getItemInfo } from "../api/noticeApi";

export default function NoticeDetail() {
  const params = useParams();
  const nav = useNavigate();
  const [itemInfo, setItemInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("people1") === "partsOfGun") setIsAdmin(true);

    getItemInfo(params.id)
      .then((res) => {
        if (res.status === 200) {
          setItemInfo(res.data.objData);
        } else {
          alert("존재하지 않는 글입니다.");
          nav("/notice/1");
        }
      })
      .catch((e) => {
        alert("존재하지 않는 글입니다.");
        nav("/notice/1");
      });
  }, []);

  const dump = {
    title: "Hello World",
    content: "Tell Your World",
    date: "2024-12-25",
  };

  const deleteNoticeHandler = () => {
    deleteItem(params.id, localStorage.getItem("userToken"))
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          alert("글이 성공적으로 삭제되었습니다");
          nav("/notice/1");
        }
      })
      .catch((e) => {
        alert("권한이 없습니다");
        nav("/notice/1");
      });
  };

  const reFormateDate = () => {
    const date = new Date(itemInfo.boardCreatedDate);

    return date.toLocaleString();
  };

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
            <button
              className="gray-btn"
              onClick={() => {
                nav("/notice/edit/" + itemInfo.boardIdx);
              }}
            >
              수정
            </button>
          </div>
        )}
        <div className="title-bar">
          <span className="blue-text">NOTICE</span>
          <span className="notice-title">
            {itemInfo ? itemInfo.boardTitle : dump.title}
          </span>
          <span>{itemInfo ? reFormateDate() : dump.date}</span>
        </div>
        <div className="content">
          {itemInfo ? itemInfo.boardContent : dump.content}
        </div>
        <button className="list-btn">
          <Link to={"/notice/1"}>목록으로</Link>
        </button>
      </div>
    </div>
  );
}
