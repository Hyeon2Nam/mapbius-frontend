import React, { useEffect, useRef, useState } from "react";
import "./sidebar.scss";
import weather from "./img/weather.png";
import "./styles.css";
import InfoPage from "../map/InfoPage";
import ChatPage from "../map/ChatPage";
import "../style/TempTest.scss";
import "../style/ChatPage.scss";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { Link } from "react-router-dom";
import { getRateAndCnt } from "../api/mapApi";
import LayersIcon from '@mui/icons-material/Layers';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

/* global kakao */

const KakaoMap = () => {
  const mapRef = useRef(null); // 지도 객체를 참조할 ref 생성
  const [MapTypeId, setMapTypeId] = useState(null); // 지도 타입 상태 관리
  const [info, setInfo] = useState(""); // 지도 정보를 저장할 상태
  const [markers, setMarkers] = useState([]);
  const [hiddenMarkers, setHiddenMarkers] = useState([]); // 숨겨진 마커를 저장
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null); // 현재 위치 마커 상태 추가
  const [selectedCategory, setSelectedCategory] = useState("coffee"); // 카테고리 상태 추가
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); // 오버레이 가시성 상태 추가
  const [customOverlay, setCustomOverlay] = useState(null); // 오버레이 가시성 상태
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawingManager, setDrawingManager] = useState(null);
  const [drawnData, setDrawnData] = useState(null);

  const mapContainer = useRef(null); // 카카오맵을 렌더링할 DOM 참조
  const [showButtons, setShowButtons] = useState(true); // 버튼 표시 여부

  const [regionInfo, setRegionInfo] = useState("현재 위치의 정보를 불러옵니다...");

  const [navbarCollapsed, setNavbarCollapsed] = useState(false); // navbar1 상태
  const [icon, setIcon] = useState("chevrons-left"); // 아이콘 상태

  const [filteredResults, setFilteredResults] = useState([]); // 바로 필터링된 결과 저장

  const regionFullNameMap = {
    "서울": "서울특별시",
    "부산": "부산광역시",
    "대구": "대구광역시",
    "인천": "인천광역시",
    "광주": "광주광역시",
    "대전": "대전광역시",
    "울산": "울산광역시",
    "세종": "세종특별자치시",
    "경기": "경기도",
    "강원": "강원도",
    "충북": "충청북도",
    "충남": "충청남도",
    "전북": "전라북도",
    "전남": "전라남도",
    "경북": "경상북도",
    "경남": "경상남도",
    "제주": "제주특별자치도"
  };

  // 카카오맵 주소 검색 API 호출 함수
  const fetchRegionInfo = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (result.length > 0) {
          const address = result[0].address;
          const region1DepthFullName = regionFullNameMap[address.region_1depth_name] || address.region_1depth_name;
          const region = `${region1DepthFullName} > ${address.region_2depth_name}`;

          setRegionInfo(region);
          setRegionData({
            category: region1DepthFullName,
            name:address.region_2depth_name
          })
          setSpotType("region")
        }
      } else {
        setRegionInfo("행정구역 정보를 불러올 수 없습니다.");
      }
    });
  };

  //카테고리용 이미지
  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png";

  // const imageSize = new kakao.maps.Size(22, 26); // 마커 기본 크기
  // const spriteSize = new kakao.maps.Size(36, 98); // 스프라이트 이미지 크기

  // 지도, 장소정보 더미 데이터
  const [isChatShow, setIsChatShow] = useState(false);
  const [isInfoShow, setIsInfoShow] = useState(true);
  const [placeData, setPlaceData] = useState({});
  const [regionData, setRegionData] = useState({});
  const [spotType, setSpotType] = useState("region");

  const regionDump = {
    category: "충청남도",
    name: "청양",
  };


//   useEffect(() => {
// setSpotType("region")
// setRegionData({
//   category : regionInfo.slice(),
//   name : regionInfo,
// })
//   }, [regionInfo]);

  // 사용자 로그인 상태
  const [userState, setUserState] = useState("none");

  useEffect(() => {
    if (localStorage.getItem("people1") === "partsOfGun") setUserState("admin");
    else if (localStorage.getItem("loginUser")) setUserState("login");
  }, []);

  useEffect(() => {
    const feather = require("feather-icons");
    feather.replace();
  }, [icon]);

  useEffect(
    () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps API가 로드되지 않았습니다.");
        return;
      }

      // Kakao 지도 API가 로드된 후에 실행
      if (window.kakao) {
        const container = document.getElementById("map"); // 지도 컨테이너 엘리먼트를 찾기
        if (!container) return;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const options = {
              // 지도 옵션 설정
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 5,
            };

            // 지도 생성
            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map; // Store the map instance in the ref 추가

            // 현재 위치 기반 행정구역 정보 가져오기
            // kakao.maps.event.addListener(map, "center_changed", () => {
            //   const center = map.getCenter();
            //   fetchRegionInfo(center.getLat(), center.getLng());
            // });
            fetchRegionInfo(lat, lng);

            let debounceTimer;

            kakao.maps.event.addListener(map, "idle", () => {
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(() => {
                const center = map.getCenter();
                fetchRegionInfo(center.getLat(), center.getLng());
              }, 500); // Adjust debounce delay as needed
            });

            updateCategoryMarkers(map, "coffee");

            // ★★★★ 스카이뷰 , 일반 맵 유형 지정
            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            // ★ 기존의 지도 위에 새롭게 설정
            map.addControl(
              mapTypeControl,
              window.kakao.maps.ControlPosition.TOP);

            // 줌 컨트롤 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

            // 커스텀 오버레이 생성
            const overlayPosition = new kakao.maps.LatLng(37.49887, 127.026581);
            const overlayContent = document.createElement("div");
            overlayContent.innerHTML = `
              <div class="overlaybox">
                <div class="boxtitle">금주 영화순위</div>
                <div class="first">
                  <div class="triangle text special-number">1</div>
                  <div class="movietitle text">드래곤 길들이기2</div>
                </div>
                <ul>
                  <li>
                    <span class="number">2</span>
                    <span class="title">명량</span>
                    <span class="arrow up"></span>
                    <span class="count">2</span><br/>
                  </li>
                  <li>
                    <span class="number">3</span>
                    <span class="title">해적(바다로 간 산적)</span>
                    <span class="arrow up"></span>
                    <span class="count">6</span><br/>
                  </li>
                  <li>
                    <span class="number">4</span>
                    <span class="title">해무</span>
                    <span class="arrow up"></span>
                    <span class="count">3</span><br/>
                  </li>
                  <li>
                    <span class="number">5</span>
                    <span class="title">안녕, 헤이즐</span>
                    <span class="arrow down"></span>
                    <span class="count">1</span><br/>
                  </li>
                </ul>
              </div>`;

            const overlay = new kakao.maps.CustomOverlay({
              position: overlayPosition,
              content: overlayContent,
              xAnchor: 0.3,
              yAnchor: 0.91,
              map: map,
            });

            setCustomOverlay(overlay);

            // Drawing Manager 설정 및 초기화
            const drawingOptions = {
              map,
              drawingMode: [
                kakao.maps.drawing.OverlayType.RECTANGLE,
                kakao.maps.drawing.OverlayType.POLYGON,
                kakao.maps.drawing.OverlayType.CIRCLE,
                kakao.maps.drawing.OverlayType.POLYLINE,
              ],
              guideTooltip: ["draw", "drag", "edit"],
              rectangleOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              circleOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              polygonOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              polylineOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
            };

            const manager = new kakao.maps.drawing.DrawingManager(
              drawingOptions
            );
            setDrawingManager(manager);

            // Drawing Toolbox 생성
            const toolbox = new kakao.maps.drawing.Toolbox({
              drawingManager: manager,
            });
            map.addControl(
              toolbox.getElement(),
              kakao.maps.ControlPosition.BOTTOM
            );

            // Drawing Manager 설정 및 초기화
            const drawingOptions1 = {
              map,
              drawingMode: [kakao.maps.drawing.OverlayType.MARKER],
              guideTooltip: ["draw", "drag", "edit"],
              markerOptions: {
                draggable: true,
                removable: true,
              },
            };

            const manager1 = new kakao.maps.drawing.DrawingManager(
              drawingOptions1
            );
            setDrawingManager(manager1);

            // 마커가 생성될 때 이벤트 리스너 추가
            kakao.maps.event.addListener(manager1, "drawend", function (data) {
              if (data.overlayType === kakao.maps.drawing.OverlayType.MARKER) {
                const marker = data.target; // 생성된 마커

                // 인포윈도우 생성
                const infowindowContent = `
                  <div class="wra">
                    <div class="info">
                      <div class="title"> 카카오 스페이스닷원
                        <div class="close" title="닫기"></div>
                      </div>
                      <div class="body">
                        <div class="img">
                          <img src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005" width="73" height="70" alt="클릭한 위치" />
                        </div>
                        <div class="desc">
                          <div class="ellipsis">
                            제주특별자치도 제주시 첨단로 242
                          </div>
                          <div class="jibun ellipsis">
                            (우) 63309 (지번) 영평동 2181
                          </div>
                          <div>
                            <a href="https://www.kakaocorp.com/main" target="_blank" class="link" rel="noreferrer">홈페이지</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;

                const infowindow = new kakao.maps.InfoWindow({
                  content: infowindowContent,
                });

                let isFixed = false; //인포윈도우 고정 상태 플래그

                // 닫기 버튼 클릭 이벤트 추가
                document.addEventListener("click", (event) => {
                  if (event.target.classList.contains("close")) {
                    infowindow.close(); // 인포윈도우 닫기
                    isFixed = false;
                  }
                });

                // 마커 클릭 이벤트 추가
                kakao.maps.event.addListener(marker, "click", function () {
                  if (isFixed) {
                    infowindow.close();
                    isFixed = false; // 고정 해제
                  } else {
                    infowindow.open(map, marker);
                    isFixed = true; // 고정 상태로 설정
                  }
                });

                // 마커에 마우스 오버/아웃 이벤트 추가
                kakao.maps.event.addListener(marker, "mouseover", function () {
                  if (!isFixed) {
                    infowindow.open(map, marker); // 고정 상태가 아닌 경우에만 열기
                  }
                });

                kakao.maps.event.addListener(marker, "mouseout", function () {
                  if (!isFixed) {
                    infowindow.close(); // 고정 상태가 아닌 경우에만 닫기
                  }
                });

                // 마커 이동(드래그) 이벤트 추가
                kakao.maps.event.addListener(marker, "dragend", function () {
                  if (!isFixed) {
                    infowindow.close(); // 마커를 드래그하면 고정 상태가 아닌 경우에만 닫기
                  }
                  infowindow.close(); // 마커
                });

                // 마커 삭제 버튼 클릭 시 인포윈도우 닫기
                kakao.maps.event.addListener(marker, "rightclick", function () {
                  infowindow.close(); // 마커 삭제 전에 인포윈도우 닫기
                  marker.setMap(null); // 마커 삭제
                });

                // 커스텀 닫기 버튼 이벤트 추가
                setTimeout(() => {
                  const closeButton =
                    document.querySelector(".infowindow .close");
                  if (closeButton) {
                    closeButton.addEventListener("click", () => {
                      infowindow.close();
                      isFixed = false; // 고정 해제
                    });
                  }
                }, 100);
              }
            });

            // Drawing Toolbox marker 생성
            const toolbox1 = new kakao.maps.drawing.Toolbox({
              drawingManager: manager1,
            });
            map.addControl(
              toolbox1.getElement(),
              kakao.maps.ControlPosition.TOPRIGHT
            );

          });
        } else {
          setRegionInfo("현재 위치를 가져올 수 없습니다.");
        }
      }
    },
    [],
    [selectedCategory]
  ); // 컴포넌트가 마운트될 때 한 번만 실행

  const toggleOverlayVisibility = () => {
    const map = mapRef.current;
    if (!map || !customOverlay) return;

    if (customOverlay.getMap()) {
      customOverlay.setMap(null); // 커스텀 오버레이 숨기기
      setIsOverlayVisible(false); // 상태 업데이트
    } else {
      customOverlay.setMap(map); // 커스텀 오버레이 보이기
      setIsOverlayVisible(true); // 상태 업데이트
    }
  };

  //오버레이 삭제
  function deleteOverlay(map) {
    if (map == null) {
      map = mapRef.current;
    }
    console.log(map.getMapTypeId());

    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADMAP);
  }

  // MapTypeId
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !MapTypeId) return;

    try {
      console.log("동작 체크하기기: ", MapTypeId);
      deleteOverlay(map);

      //지도 타입 변경
      switch (MapTypeId) {
        case "TRAFFIC":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통정보
          break;
        case "ROADVIEW":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW); //로드뷰
          break;
        case "TERRAIN":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN); //지형 정보
          break;
        case "BICYCLE":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE); // 자전거 정보
          break;
        case "USE_DISTRICT":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT); // 지적편집도 정보
          break;
        default:
          //map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADMAP); // 기본 지도 정보

          setMapTypeId("");
          map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);

          break;
      }
    } catch (error) {
      console.error("지도 타입 변경 중 오류 발생: ", error);
    }
  }, [MapTypeId]);


  // 도형 데이터를 가져오는 메소드
  const getDrawnData = () => {
    if (!drawingManager) return;

    const data = drawingManager.getData();
    setDrawnData(data);
    console.log("Drawn Data:", data);
  };

  // 도형 데이터를 지도에 표시하는 메소드
  const displayDrawnData = () => {
    if (!drawnData) return;
    const map = mapRef.current;

    const { marker, rectangle, circle, polygon, polyline } = drawnData;

    if (marker) {
      marker.forEach((data) => {
        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(data.y, data.x),
        });
        marker.setMap(map);
      });
    }

    if (rectangle) {
      rectangle.forEach((data) => {
        const bounds = new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(data.sPoint.y, data.sPoint.x),
          new kakao.maps.LatLng(data.ePoint.y, data.ePoint.x)
        );

        const rect = new kakao.maps.Rectangle({ bounds, map });
        rect.setMap(map);
      });
    }

    if (circle) {
      circle.forEach((data) => {
        const circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(data.center.y, data.center.x),
          radius: data.radius,
          map,
        });
        circle.setMap(map);
      });
    }

    if (polygon) {
      polygon.forEach((data) => {
        const path = data.points.map(
          (point) => new kakao.maps.LatLng(point.y, point.x)
        );
        const poly = new kakao.maps.Polygon({ path, map });
        poly.setMap(map);
      });
    }

    if (polyline) {
      polyline.forEach((data) => {
        const path = data.points.map(
          (point) => new kakao.maps.LatLng(point.y, point.x)
        );
        const line = new kakao.maps.Polyline({ path, map });
        line.setMap(map);
      });
    }
  };

  const updateCategoryMarkers = (map, category) => {
    // 기존 마커 삭제
    markers.forEach((marker) => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
  };

  const clustererRef = useRef(null); // 클러스터러 참조

  const handleSearch = () => {
    const map = mapRef.current;
    if (!map || !searchQuery) {
      alert("검색어를 입력하세요.");
      return;
    }

    const places = new kakao.maps.services.Places();

    places.keywordSearch(searchQuery, async (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        displaySearchMarkers(data); // 검색 결과 마커 표시

        const firstPlace = data[0];
        if (firstPlace) {
          const firstPlacePosition = new kakao.maps.LatLng(
            firstPlace.y,
            firstPlace.x
          );
          map.setCenter(firstPlacePosition);
        }

        setFilteredResults(
          await Promise.all(
            data.map(async (place) => {
              return await setPlaceDataHandler(place); // 비동기 처리 후 반환된 값
            })
          )
        );
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setFilteredResults([]);
      } else {
        console.error("검색 중 오류가 발생했습니다.");
      }
    });
  };

  const setPlaceDataHandler = async (place) => {
    let resData = {
      id: place.id,
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      purl: place.place_url,
      //cgc: place.category_group_code,
      phone: place.phone,
      rating: 0, // Kakao API에는 리뷰 점수가 없으
      reviews: 0, // Kakao API에는 리뷰 수가 없으
    };

    await getRateAndCnt({ phoneNumber: place.id })
      .then((res) => {
        if (res.status === 200) {
          resData.rating = res.data.objData.avgRating;
          resData.reviews = res.data.objData.reviewCount;
        }
      })
      .catch((e) => {});
    return resData;
  };

  const displaySearchMarkers = (data) => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 검색 결과 마커 및 인포윈도우 제거
    if (searchMarkers.length > 0) {
      searchMarkers.forEach(({ marker, infowindow }) => {
        if (marker) marker.setMap(null); // 마커 제거
        if (infowindow) infowindow.close(); // 인포윈도우 닫기
      });
      setSearchMarkers([]);
    }

    // 기존 클러스터러 제거
    if (clustererRef.current) {
      const clusterer = clustererRef.current;
      const markers = clusterer.getMarkers();

      markers.forEach((marker) => marker.setMap(null)); // 클러스터러의 마커 제거
      clusterer.clear(); // 클러스터러 초기화
      clusterer.setMap(null); // 지도와의 연결 해제
      clustererRef.current = null; // 참조 제거
    }

    // 새 검색 결과 마커 및 인포윈도우 생성
    const newMarkers = data.map((place) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x),
        map: map,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
        removable: true,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        // 모든 인포윈도우 닫기
        searchMarkers.forEach(({ infowindow }) => infowindow.close());
        infowindow.open(map, marker);
      });

      return { marker, infowindow };
    });

    // 검색 마커 상태 업데이트
    setSearchMarkers(newMarkers);

    // 새 클러스터러 생성
    createClusterer(newMarkers.map(({ marker }) => marker)); // 마커 배열 전달
  };

  const createClusterer = (markers) => {
    const map = mapRef.current;
    if (!map) return;

    // 클러스터러 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true, // 클러스터 중심 좌표 설정
      minLevel: 6, // 클러스터 최소 레벨
    });

    // 검색된 마커만 클러스터러에 추가
    clusterer.addMarkers(markers);

    // 새 클러스터러 참조 저장
    clustererRef.current = clusterer;

    // 클러스터러 클릭 이벤트 추가
    kakao.maps.event.addListener(clusterer, "clusterclick", (cluster) => {
      const level = map.getLevel(); // 현재 지도 레벨
      const clusterPosition = cluster.getCenter(); // 클러스터 중심 좌표

      // 지도 레벨을 1단계 줄이고 클러스터 중심으로 이동
      map.setLevel(level - 1, {
        anchor: clusterPosition,
        animate: true,
      });
    });
  };

  const handleCategoryChange = (category) => {
    const map = mapRef.current;
    if (!map) return;

    setSelectedCategory(category);
    updateCategoryMarkers(map, category);
  };

  const addMarker = (position, isCustom = false) => {
    const map = mapRef.current;
    if (!map) return;

    const markerOptions = {
      position,
      draggable: true,
      removable: true,
    };

    if (isCustom) {
      markerOptions.image = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new kakao.maps.Size(24, 35)
      );
    }

    // 마커 생성
    const marker = new window.kakao.maps.Marker(markerOptions);
    marker.setMap(map);
  };

  const showCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const map = mapRef.current;
      if (!map) return;

      const currentLatLng = new kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      //이전 마커 제거
      if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
      }

      //지도 중심 이동
      map.setCenter(currentLatLng);
    });
  };


  return (
    <div
      className="kakao-map-page"
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      <div className="container">
        <nav className="navbar">
          <ul className="navbar__menu">
            <li>
              <img
                src={process.env.PUBLIC_URL + "imgs/logolog.png"}
                style={{
                  marginBottom: "50px",
                }}
                alt=""
              />
            </li>
            <li className="navbar__item">
              <Link to={"/notice/1"} className="navbar__link navbar__icon">
                <CampaignOutlinedIcon fontSize="large" />
                <span>공지사항</span>
              </Link>
            </li>
            <li className={userState === "admin" ? "navbar__item " : "none"}>
              <Link to={"/admin/user-list"} className="navbar__link">
                <i data-feather="settings"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <ul className="navbar__menu">
            <li className="navbar__item">
              <a
                href="#"
                className="navbar__link"
                onClick={() => {
                  setNavbarCollapsed(!navbarCollapsed);
                }}
              >
                <i data-feather="search"></i>
                <span>search</span>
              </a>
            </li>
          </ul>

          <ul className="navbar__menu">
            <li
              className="navbar__item"
              onClick={() => {
                setIsChatShow(!isChatShow);
              }}
            >
              <a href="#" className="navbar__link">
                <i data-feather="message-circle"></i>
                <span>chat</span>
              </a>
            </li>
            <li className="navbar__item">
              <Link to={"/trip/1"} className="navbar__link">
                <i data-feather="map"></i>
                <span>map</span>
              </Link>
            </li>

            {userState === "none" ? (
              <li className="navbar__item">
                <Link to={"/login"} className="navbar__link">
                  <i data-feather="user"></i>
                  <span>log-in</span>
                </Link>
              </li>
            ) : (
              <li className="navbar__item">
                <Link to={"/mypage/main"} className="navbar__link">
                  <i data-feather="user"></i>
                  <span>user</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <nav className={`navbar1 ${navbarCollapsed ? "collapsed" : ""}`}>
          <ul className="navbar1__menu">
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <div
                className="search-bar"
                style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
              >
                <input
                  type="text"
                  placeholder="장소 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <i></i>
                <button className="button" onClick={handleSearch}>
                  검색
                </button>
              </div>

              <div href="#" className="" style={{ left: "100px" }}>
                {regionInfo}
              </div>
              <div className="results">
                {filteredResults.length > 0 ? (
                  filteredResults.map((place) => (
                    <div
                      onClick={() => {
                        setIsInfoShow(true);
                        setPlaceData(place);
                        setSpotType("place");
                      }}
                      key={place.id}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "15px",
                        marginBottom: "10px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <h3 style={{ margin: "0 0 10px" }}>{place.name}</h3>
                      <p style={{ margin: "0 0 5px" }}>{place.address}</p>
                      <p style={{ margin: "0 0 5px" }}>
                        전화번호: {place.phone || "정보 없음"}
                      </p>
                      <p style={{ margin: 0 }}>
                        ⭐ {place.rating} (후기 {place.reviews})
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>
                )}
              </div>
            </div>
          </ul>
        </nav>

        <div id="map">
        <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {/* 카카오맵 컨테이너 */}
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      ></div>

      {/* 레이어 토글 버튼 */}
      <div
        style={{
          position: "absolute",
          top: "1px",
          right: "37%",
          zIndex: 1000,
        }}
      >
        <div>
          <button 
              style={{
                padding: "8px 14px",
                margin: "2px",
                backgroundColor: "#5d9cec",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={showCurrentLocation}>
              <GpsFixedIcon/>
            </button>

          <button
            style={{
              padding: "8px 14px",
              margin: "2px",
              backgroundColor: "#5d9cec",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}

            onClick={() => setShowButtons(!showButtons)}>
            <LayersIcon/>
          </button>
        </div>

        {/* 버튼 레이어 */}
        {showButtons && (
          <div
            style={{
              position: "absolute",
              right: "-155%",
              marginTop: "20px",
              width: "440px",

              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              display: "grid", // 그리드 레이아웃 설정
              gridTemplateColumns: "repeat(3, 1fr)", // 3칸으로 나눔
              gap: "10px", // 버튼 간격 설정
            }}
          >
            <button className="button" onClick={() => setMapTypeId("ROADMAP")}>
              기본지도
            </button>
            
            <button className="button" onClick={() => setMapTypeId("TRAFFIC")}>
              교통정보
            </button>

            <button className="button" onClick={() => setMapTypeId("ROADVIEW")}>
              로드뷰
            </button>

            <button className="button" onClick={() => setMapTypeId("TERRAIN")}>
              지형정보
            </button>

            <button className="button" onClick={() => setMapTypeId("BICYCLE")}>
              자전거도로
            </button>

            <button className="button" onClick={() => setMapTypeId("USE_DISTRICT")}>
              지적편집도
            </button>

            <button className="button" onClick={() => deleteOverlay()}>
              오버레이삭제
            </button>

            <button className="button" onClick={toggleOverlayVisibility}>
            {customOverlay && customOverlay.getMap()
              ? "오버레이숨기기"
              : "오버레이보이기"}
          </button>

          <button
              className="button"
              onClick={() =>
                addMarker(new kakao.maps.LatLng(36.437, 126.803), true)
              }
            >
              커스텀마커 추가
            </button>
          </div>
          
          )}
        </div>
      </div>
      </div>
      </div>

      <div className={isChatShow ? "chat-gpt-page" : "none"}>
        <ChatPage />
      </div>
      {isInfoShow ? (
        <div className={isInfoShow ? "spot-section" : "none"}>
          <InfoPage
            data={spotType === "place" ? placeData : regionData}
            type={spotType}
            setIsInfoShow={setIsInfoShow}
          />
        </div>
      ) : (
        <div className="down-btn">
          <button
            onClick={() => {
              setIsInfoShow(true);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/imgs/downArrow.png"} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
