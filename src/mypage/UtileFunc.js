export const concatListHandler = (
  curIdx,
  dump,
  setDataList,
  setCurIdx,
  sliceCnt = 3
) => {
  console.log(curIdx, sliceCnt);

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

export default concatListHandler;
