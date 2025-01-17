import { useEffect, useState } from "react";
// import NoticeList from "./NoticeList";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/NoticeList.scss";
import { getItemWithPage } from "./../api/noticeApi";
import TripList from "../mypage/trip/TripLIst";
import PageNation from "../Notice/PageNation";

const TripBoard = () => {
  const nav = useNavigate();
  const params = useParams();
  const [noticeList, setNoticeList] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [curpage, setCurpage] = useState(1);
  const [maxpage, setMaxpage] = useState(2);
  const [searchType, setSearchType] = useState("title");

  const dump = [
    {
      img: "https://img.siksinhot.com/place/1695358551647068.jpg?w=560&h=448&c=Y",
      name: "청양 맛집 루트",
      range: "public",
      description: "청양 맛집 리스트 입니다~",
      date: "2025-01-14",
      like: 2,
      nickname: "asdf222",
      profileImg:
        "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.jpg",
    },
    {
      img: "https://ynoblesse.com/wp-content/uploads/2024/10/464676375_1751431735682376_7779456267627272696_n.jpg",
      name: "홍대 놀거리 추천 루트",
      range: "public",
      description: "홍대에 왔으면 여길 가야ㅏ지...",
      date: "2025-01-09",
      like: 5,
      nickname: "가나디",
      profileImg:
        "https://image1.marpple.co/files/u_4652883/2024/8/original/71961d882ef2c32ae9e1ba8f8fce453a4b7e214f1.png?q=80&w=360&f=webp",
    },
    {
      img: "https://image.idus.com/image/files/da988d4f52a842a3a3f1018f7bc81d9f_720.jpg",
      name: "용한 타로 가게",
      range: "public",
      description: "사기아니고 이상한 사람아니고 진짜 찐으로 용한 사람 모음",
      date: "2025-01-05",
      like: 1,
      nickname: "QQ",
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/8TfGt4Oov4V2TPYaEpXzR1bLTZ0",
    },
    {
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
      nickname: "랭크",
      name: "강원도 춘천",
      description: "밤에 야경보러 꼭 가보세요",
      date: "2025-01-05",
      like: 3,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MTNfMTE4%2FMDAxNzE1NTg5NzczNjI1.kynzUhR0mcg4A-2njZvPJ8WiuRjVRJaTWw0tueiGaZUg.XU9hLpu7Tna-QtCFLpDLcExgWPb_lzDj6CpGJ7kt3MAg.JPEG%2F20240510_201211.jpg&type=sc960_832",
      range: "public",
    },
    {
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
      nickname: "기니",
      name: "8월 가볼만한 국내여행지",
      description: "바다가 끝내줍니다!",
      date: "2024-12-28",
      like: 2,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MDZfMjI5%2FMDAxNzIyOTQ2NjM1MDIz.Aw5RWmb4c02WDHZ4r-WUQfRqc8Ww0KnwcEiOUxj1IZwg.kOd_EFFapko24Yo3Djb-0FlzeUSIi7Azm2LJ1qMzTl4g.JPEG%2FDSC06592.jpg&type=a340",
      range: "public",
    },
    {
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTVfNTUg%2FMDAxNjEwNzEzOTE2NDk2.eSgkKnKdh-XGblGx391lWmw0GT4TK-u_voRzaDSITfgg.g9_Hbx4zV9FWwLRUFyxYo-R6c4sUnynrgR-f6SE1M4Yg.JPEG.sosohan_n%2FIMG_1016.JPG&type=a340",
      nickname: "나라",
      name: "거제 외도 보타니아",
      description: "해외여행 온 기분이 듭니다",
      date: "2024-12-17",
      like: 4,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDRfMTY1%2FMDAxNzA5NTE0NjE0OTMw.UBZTn02owl5f3dwQZKRdiRlHZwVgZxEVMasIek5EhBwg.Uty7J69tpd-uKafWWIbJCJECDkvdVJBpJO_HmsrNfpog.JPEG%2F20230929%25A3%25DF122341.jpg&type=sc960_832",
      range: "public",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("people1") === "partsOfGun") setIsAdmin(true);
  }, []);

  const getItemList = async () => {
    await getItemWithPage({
      curpage: curpage,
      keyword: search,
      type: searchType,
    })
      .then((res) => {
        if (res.status === 200) {
          setNoticeList(res.data.objData.items);
          setMaxpage(res.data.objData.maxpage);
        }
      })
      .catch((e) => {});
  };

  const checkPage = () => {
    if (params.page > maxpage || params.page < 1 || params.page === undefined) {
      nav("/trip/1");
      return;
    }
  };

  useEffect(() => {
    checkPage();
    setCurpage(params.page);
    console.log(params.page, typeof params.page);

    if (params.page === "1") {
      setNoticeList(dump.slice(0, 4));
    } else {
      setNoticeList(dump.slice(4, 6));
    }
    // getItemList();
  }, [params.page]);

  useEffect(() => {
    const itemMax = 5;

    checkPage();
    const start = (Math.ceil(params.page / itemMax) - 1) * itemMax + 1;

    setPages(
      Array.from(
        { length: Math.min(maxpage - start + 1, itemMax) },
        (v, i) => i + start
      )
    );
  }, [noticeList]);

  const searchNoticeHandler = () => {
    setCurpage(1);
    getItemList();
  };

  return (
    <div className="notice-board-container">
      <div className="notice-list">
        <div className="search">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}
          >
            <option value={"title"}>제목</option>
            <option value={"content"}>아이디</option>
          </select>
          <input
            type="text"
            value={search}
            placeholder="검색어 입력"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchNoticeHandler();
              }
            }}
          />
          <button onClick={searchNoticeHandler}>
            <img src={process.env.PUBLIC_URL + "/imgs/searchIcon.png"} />
          </button>
        </div>
        <TripList list={noticeList} />
        {/* <div className="bottom-menu">
          {isAdmin && (
            <button
              onClick={() => {
                nav("/notice/create/0");
              }}
            >
              만들기
            </button>
          )}
        </div> */}
        <PageNation
          pages={pages}
          curpage={curpage}
          maxpage={maxpage}
          category={"trip"}
        />
      </div>
    </div>
  );
};

export default TripBoard;
