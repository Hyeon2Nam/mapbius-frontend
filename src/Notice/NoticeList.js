import NoticeItem from "./NoticeItem";

export default function NoticeList({ list }) {
  return (
    <>
      {list && (
        <table>
          <thead>
            <tr className="notice-list-title notice-item">
              <th>NO.</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return <NoticeItem item={item} key={item.boardIdx} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
