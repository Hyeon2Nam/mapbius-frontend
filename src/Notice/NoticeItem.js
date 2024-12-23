export default function NoticeItem({ item }) {
  return (
    <div>
      <div>{item.id}</div>
      <div>{item.category}</div>
      <div>{item.title}</div>
      <div>{item.date}</div>
      <hr />
    </div>
  );
}
