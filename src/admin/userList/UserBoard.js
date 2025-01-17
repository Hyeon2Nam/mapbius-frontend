import { useEffect, useState } from "react";
import UserList from "./UserList";
import "../../style/UserBoard.scss";
import { Link } from "react-router-dom";

const UserBoard = () => {
  const [search, setSearch] = useState("");
  const [curpage, setCurpage] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("people1") !== "partsOfGun") {
      window.location = "/";
    }
  }, []);

  const dump = [
    {
      id: "23ssssss1k3k545k7k8k",
      nickName: "asdf222",
      email: "asdfa@gmail.com",
      isAdmin: false,
      isActive: false,
      img: "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.jpg",
      review: 1,
      avg: 3.0,
      date: "2025-01-12",
    },
    {
      id: "asdfasdf2",
      nickName: "asdf2",
      email: "asdfasdf2@gmail.com",
      isAdmin: true,
      isActive: true,
      img: "https://pbs.twimg.com/media/E6ln-jEUUAIfJoY.jpg",
      review: 3,
      avg: 2.0,
      date: "2025-01-21",
    },
    {
      id: "1ddqdfdf23",
      nickName: "가나디",
      email: "ganadi@gmail.com",
      isAdmin: false,
      isActive: true,
      img: "https://image1.marpple.co/files/u_4652883/2024/8/original/71961d882ef2c32ae9e1ba8f8fce453a4b7e214f1.png?q=80&w=360&f=webp",
      review: 5,
      avg: 3.5,
      date: "2024-12-30",
    },
    {
      id: "vdds112",
      nickName: "QQ",
      email: "qtaro@gmail.com",
      isAdmin: true,
      isActive: false,
      img: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/8TfGt4Oov4V2TPYaEpXzR1bLTZ0",
      review: 56,
      avg: 2,
      date: "2024-12-28",
    },
    {
      id: "poiulkjh1",
      nickName: "랭크",
      email: "qwerqwer@gmail.com",
      isAdmin: false,
      isActive: true,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
      review: 1,
      avg: 5.0,
      date: "2024-12-28",
    },
    {
      id: "zaqxsw2",
      nickName: "기니",
      email: "cccvg@naver.com",
      isAdmin: false,
      isActive: true,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfNDAg%2FMDAxNzI2MzUyNDU5MzAy.ILqNGao2La29DZrdiKorvKZIyzW46S4FwjVKuKvcYHQg.tywwY5k79fOP0GGx8klfOdFqVpO8K2RDhRModwPseSgg.JPEG%2F15aceb5eee4e67f81a155bed0f6d09ad.jpg&type=a340",
      review: 2,
      avg: 4.0,
      date: "2024-12-28",
    },
    {
      id: "zxcvbnm1",
      nickName: "나라",
      email: "qqqqq@test.co",
      isAdmin: false,
      isActive: true,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTVfNTUg%2FMDAxNjEwNzEzOTE2NDk2.eSgkKnKdh-XGblGx391lWmw0GT4TK-u_voRzaDSITfgg.g9_Hbx4zV9FWwLRUFyxYo-R6c4sUnynrgR-f6SE1M4Yg.JPEG.sosohan_n%2FIMG_1016.JPG&type=a340",
      review: 0,
      avg: 0.0,
      date: "2024-12-28",
    },
  ];

  const getItemList = async () => {
    // await getItemWithPage({
    //   curpage: curpage,
    //   keyword: search,
    //   type: searchType,
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setNoticeList(res.data.objData.items);
    //       setMaxpage(res.data.objData.maxpage);
    //     }
    //   })
    //   .catch((e) => {});
  };

  const searchNoticeHandler = () => {
    setCurpage(1);
    getItemList();
  };

  return (
    <div className="user-board-list">
      <div className="side-bar">
        <div className="admin-wrapper">
          <img src={process.env.PUBLIC_URL + "/imgs/userIcon.png"} alt="" />
        </div>
        <span>관리자</span>
      </div>
      <div className="main-container">
        <div className="header-menu">
          <Link to={"/"}>홈페이지</Link>
          <Link to={"/login"}>로그아웃</Link>
        </div>
        <div className="big-section-title">
          <div className="upside">
            <span>사용자 관리</span>
            <div className="search">
              <input
                type="text"
                value={search}
                placeholder="아이디 입력"
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
          </div>
        </div>
        <UserList list={dump} />
      </div>
    </div>
  );
};

export default UserBoard;
