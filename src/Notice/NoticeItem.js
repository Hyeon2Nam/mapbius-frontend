import { Link } from "react-router-dom";

export default function NoticeItem({ item }) {
  const spliteTitleText = () => {
    const MAX_LEN = 20;

    if (item.title.length > MAX_LEN) {
      return item.title.substr(0, MAX_LEN) + "...";
    }

    return item.title;
  };

  const reFormateDate = () => {
    const date = new Date(item.created_date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <tr className="notice-item">
      <td>{item.id}</td>
      <td>
        <Link to={"/notice/view/" + item.id}>{spliteTitleText()}</Link>
      </td>
      <td>{reFormateDate()}</td>
    </tr>
  );
}
