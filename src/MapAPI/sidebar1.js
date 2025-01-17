import { useEffect, useState } from 'react';
import noticeImage from './img/notice.png';
import weather from './img/weather.png';
import './sidebar.scss';


const KakaoMap = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([
        { id: 1, name: "행복한쭈꾸미와갑오징어", address: "충남 청양군 청양읍 문화예술로 180", rating: 5.0, reviews: 47 },
        { id: 2, name: "진영분식", address: "충남 청양군 청양읍 문화예술로 180", rating: 4.0, reviews: 9 },
        { id: 3, name: "한가네어죽", address: "충남 청양군 청양읍 중앙로열길 18", rating: 4.0, reviews: 11 },
        { id: 4, name: "축제갈비", address: "충남 청양군 청양읍 중앙로열길 18", rating: 4.0, reviews: 19 },
        { id: 5, name: "고향회관", address: "충남 청양군 청양읍 칠갑산로7길 6", rating: 3.0, reviews: 14 },
        { id: 6, name: "둘순네 부대찌개", address: "충남 청양군 청양읍 중앙로 76", rating: 1.0, reviews: 1 },
        { id: 7, name: "둘순네 부대찌개", address: "충남 청양군 청양읍 중앙로 76", rating: 1.0, reviews: 1 },
        { id: 8, name: "둘순네 부대찌개", address: "충남 청양군 청양읍 중앙로 76", rating: 1.0, reviews: 1 },
        { id: 9, name: "둘순네 부대찌개", address: "충남 청양군 청양읍 중앙로 76", rating: 1.0, reviews: 1 },
        { id: 10, name: "둘순네 부대찌개", address: "충남 청양군 청양읍 중앙로 76", rating: 1.0, reviews: 1 },
      ]);

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

      const filteredResults = results.filter((result) =>
        result.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    useEffect(() => {
        const feather = require('feather-icons');
        feather.replace();
    }, []);

    return (
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            <nav className="navbar">
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="home"></i><span>Home</span></a>
                    </li>
                    <li className="navbar__item">
                        <a href="#" className="navbar__link navbar__icon"><img src={noticeImage} alt="공지사항" /><span>공지사항</span></a>
                    </li>
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="settings"></i><span>Settings</span></a>
                    </li>
                </ul>

                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="chevrons-left"></i><span>chevrons-left</span></a>
                    </li>
                </ul>

                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="map"></i><span>map</span></a>
                    </li>
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="user"></i><span>user</span></a>
                    </li>
                    <li className="navbar__item">
                        <a href="#" className="navbar__link"><i data-feather="log-in"></i><span>log-in</span></a>
                    </li>
                </ul>
            </nav>
            

            <nav className="navbar1">
                <ul className="navbar1__menu">
                    
                    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                        <div className="search-bar" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                            <input
                            type="text"
                            placeholder="장소 검색"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                flex: 1,
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                            />
                            <i data-feather="search"
                            style={{
                                padding: "10px 10px",
                                backgroundColor: "#6200EE",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}></i>   
                        </div>
                        
                        <a href="#" className="navbar__link" style={{left: "100px" }} ><img style={{ width: "300px", height: "50px"}} src={weather} alt="s" /><span>날씨</span></a>

                        <div className="results">
                            {filteredResults.length > 0 ? (
                            filteredResults.map((result) => (
                                <div key={result.id}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "15px",
                                    marginBottom: "10px",
                                    backgroundColor: "#f9f9f9",
                                }}>

                                <h3 style={{ margin: "0 0 10px" }}>{result.name}</h3>
                                <p style={{ margin: "0 0 5px" }}>{result.address}</p>
                                <p style={{ margin: 0 }}>⭐ {result.rating} (후기 {result.reviews})</p>
                                </div>
                            ))
                            ) : (
                            <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>
                            )}
                        </div>
                        </div>
                    
                </ul>
            </nav>
        </div>
    );
}
export default KakaoMap;
