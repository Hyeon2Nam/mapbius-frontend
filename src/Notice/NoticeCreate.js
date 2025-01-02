import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editNotice, getItemInfo, writeNotice } from "../api/noticeApi";

export default function NoticeCreate() {
  const nav = useNavigate();
  const params = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    content: "",
  });

  const articleInfoHandler = (e) => {
    const { name, value } = e.target;

    setArticleInfo({
      ...articleInfo,
      [name]: value,
    });
  };

  const articleHandler = () => {
    let obj = {
      boardTitle: articleInfo.title,
      boardContent: articleInfo.content,
      boardAuthor: localStorage.getItem("loginUser"),
    };

    if (!(obj.boardTitle && obj.boardContent)) {
      alert("제목과 내용을 작성하세요");
      return;
    }

    if (isEditMode) {
      obj.boardIdx = params.id;
      editNotice(obj, localStorage.getItem("userToken"))
        .then((res) => {
          if (res.status === 200) {
            nav("/notice/1");
          }
        })
        .catch((e) => {
          alert("권한이 없습니다");
          nav("/notice/1");
        });
    } else {
      writeNotice(obj, localStorage.getItem("userToken"))
        .then((res) => {
          if (res.status === 201) {
            nav("/notice/1");
          }
        })
        .catch((e) => {
          console.log(e);

          // alert("권한이 없습니다");
          // nav("/notice/1");
        });
    }
  };

  const setItemInfo = () => {
    getItemInfo(params.id)
      .then((res) => {
        if (res.status === 200) {
          setArticleInfo({
            title: res.data.objData.boardTitle,
            content: res.data.objData.boardContent,
          });
        } else {
          alert("존재하지 않는 글입니다.");
          nav("/notice/1");
        }
      })
      .catch((e) => {
        alert("존재하지 않는 글입니다.");
        nav("/notice/1");
      });
  };

  useEffect(() => {
    if (params.mode !== "edit" && params.mode !== "create") nav("/");

    if (params.mode === "edit") {
      setIsEditMode(true);
      setItemInfo();
    }
  }, []);

  return (
    <div>
      <h2>제목</h2>
      <input
        value={articleInfo.title}
        onChange={articleInfoHandler}
        name="title"
      />
      <hr />
      <h2>내용</h2>
      <textarea
        value={articleInfo.content}
        name="content"
        onChange={articleInfoHandler}
      />
      <button onClick={articleHandler}>작성</button>
    </div>
  );
}
