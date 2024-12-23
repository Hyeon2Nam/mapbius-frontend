import { Link, useParams } from "react-router-dom";

export default function NoticeDetail() {
  const params = useParams();

  return (
    <div>
      <h1>Detail</h1>
      {params.id}
      <Link to={"/notice/edit/" + params.id}>
        <button>수정</button>
      </Link>
      <button>삭제</button>
    </div>
  );
}
