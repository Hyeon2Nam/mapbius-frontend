export const concatListHandler = (
  curIdx,
  dump,
  setDataList,
  setCurIdx,
  sliceCnt = 3
) => {
  if (!dump) return;

  if (curIdx >= dump.length) {
    alert("더이상 데이터가 없습니다");
    return;
  }

  const newItems = dump.slice(curIdx, curIdx + sliceCnt);
  setDataList((prevDataList) => [...prevDataList, ...newItems]);

  setCurIdx((prevIdx) => prevIdx + sliceCnt);
};

export const sliceText = (str, cnt, repStr) => {
  if (!str) return repStr;

  if (str && str.length > cnt) {
    return str.slice(0, cnt) + "...";
  } else return str;
};

export const setDateText = (t) => {
  const date = new Date(t);

  if (isNaN(date)) return "날짜 정보가 없습니다";

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const setDateTextKor = (t) => {
  const date = new Date(t);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

export const getTodayDateText = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default concatListHandler;
