import { Link } from "react-router-dom";

export default function NoticeItem({ item }) {
  const spliteTitleText = () => {
    const MAX_LEN = 20;

    if (item.boardTitle.length > MAX_LEN) {
      return item.boardTitle.substr(0, MAX_LEN) + "...";
    }

    return item.boardTitle;
  };

  return (
    <tr className="notice-item">
      <td>{item.boardIdx}</td>
      <td>
        <Link to={"/notice/view/" + item.boardIdx}>{spliteTitleText()}</Link>
      </td>
      <td>{item.boardCreatedDate}</td>
    </tr>
  );
}
