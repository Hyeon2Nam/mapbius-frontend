import { Link } from "react-router-dom";
import { setDateText } from "../mypage/UtileFunc";

export default function NoticeItem({ item }) {
  const spliteTitleText = () => {
    const MAX_LEN = 20;

    if (item.title.length > MAX_LEN) {
      return item.title.substr(0, MAX_LEN) + "...";
    }

    return item.title;
  };

  return (
    <tr className="notice-item">
      <td>{item.id}</td>
      <td>
        <Link to={"/notice/view/" + item.id}>{spliteTitleText()}</Link>
      </td>
      <td>{setDateText(item.created_date)}</td>
    </tr>
  );
}
