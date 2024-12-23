import { Link } from "react-router-dom";
import NoticeItem from "./NoticeItem";

export default function NoticeList({ list }) {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <Link to={"/notice/view/" + item.id} key={item.id}>
            <div>
              <NoticeItem item={item} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
