import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NoticeCreate() {
  const params = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    content: "",
    category: "",
  });
  const categories = ["1", "2", "3", "4", "5"];

  const articleInfoHandler = (e) => {
    const { name, value } = e.target;

    setArticleInfo({
      ...articleInfo,
      [name]: value,
    });

    // console.log(articleInfo);
  };

  const articleHandler = () => {
    let obj = {
      title: articleInfo.title,
      content: articleInfo.content,
      category: articleInfo.category,
    };

    if (!(obj.title && obj.content)) console.log("작성하세요");

    if (isEditMode) {
      // edit api
    } else {
      //create api
    }
  };

  useEffect(() => {
    if (params.mode === "edit") {
      console.log("edit mode");
      setIsEditMode(true);
      // load data api
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
      <h2>카테고리</h2>
      <select onChange={articleInfoHandler} name="category">
        {categories.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      {params.id}

      <button onClick={articleHandler}>작성</button>
    </div>
  );
}
