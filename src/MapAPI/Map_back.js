import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

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

  //카테고리용 이미지
  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png";

  const imageSize = new kakao.maps.Size(22, 26); // 마커 기본 크기
  const spriteSize = new kakao.maps.Size(36, 98); // 스프라이트 이미지 크기

  const coffeePositions = [
    { lat: 37.499590490909185, lng: 127.0263723554437 },
    { lat: 37.499427948430814, lng: 127.02794423197847 },
    { lat: 37.498553760499505, lng: 127.02882598822454 },
    { lat: 37.497625593121384, lng: 127.02935713582038 },
    { lat: 37.49646391248451, lng: 127.02675574250912 },
    { lat: 37.49629291770947, lng: 127.02587362608637 },
    { lat: 37.49754540521486, lng: 127.02546694890695 },
  ];
  const coffeeOrigin = { x: 10, y: 0 };

  const storePositions = [
    { lat: 37.497535461505684, lng: 127.02948149502778 },
    { lat: 37.49671536281186, lng: 127.03020491448352 },
    { lat: 37.496201943633714, lng: 127.02959405469642 },
    { lat: 37.49640072567703, lng: 127.02726459882308 },
    { lat: 37.49640098874988, lng: 127.02609983175294 },
    { lat: 37.49932849491523, lng: 127.02935780247945 },
    { lat: 37.49996818951873, lng: 127.02943721562295 },
  ];
  const storeOrigin = { x: 10, y: 36 };

  const carparkPositions = [
    { lat: 37.49966168796031, lng: 127.03007039430118 },
    { lat: 37.499463762912974, lng: 127.0288828824399 },
    { lat: 37.49896834100913, lng: 127.02833986892401 },
    { lat: 37.49893267508434, lng: 127.02673400572665 },
    { lat: 37.49872543597439, lng: 127.02676785815386 },
    { lat: 37.49813096097184, lng: 127.02591949495914 },
    { lat: 37.497680616783086, lng: 127.02518427952202 },
  ];
  const carparkOrigin = { x: 10, y: 72 };


  
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    // Kakao 지도 API가 로드된 후에 실행
    if (window.kakao) {
      const container = document.getElementById('map'); // 지도 컨테이너 엘리먼트를 찾기
      const options = { // 지도 옵션 설정
        // center: new window.kakao.maps.LatLng(36.43698897735751, 126.80202130837696), // 충도대 위치 중심 좌표
        center: new window.kakao.maps.LatLng(37.497400850714165, 127.02723103671623), // 강남역 위치 중심 좌표
        level: 5, // 확대 레벨
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map; // Store the map instance in the ref 추가

      //console.log("Kakao Map Version:", window.kakao.maps.VERSION); //버전 체크(뺼 기능)

      updateCategoryMarkers(map, "coffee");

      const markerPosition = new window.kakao.maps.LatLng(36.436988, 126.802021);
      const markerPosition1 = new window.kakao.maps.LatLng(36.459105, 126.802004); // 마커 위치
      
      const marker = new window.kakao.maps.Marker({ position: markerPosition }); // 마커 생성
      const marker1 = new window.kakao.maps.Marker({ position: markerPosition1 }); // 마커1 생성

      // 지도에 마커 표시
      marker.setMap(map);
      marker1.setMap(map);

      // 인포윈도우 (마커 클릭 시 표시될 정보창)
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:16px;">후라보노보노</div>' +
        '<a href="https://cnsu.ac.kr/main.do" style={{ color: "blue" }} target="_blank" rel="noreferrer">충남도립대학교</a>',
        removable: true,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      //지도 클릭 이벤트 추가
      // window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      //   const latLng = mouseEvent.latLng; // 클릭한 위치의 좌표
      //   addMarker(latLng); // 클릭한 위치에 마커 추가
      //   //console.log("마커 찍기");
      // });

      // ★★★★ 스카이뷰 , 일반 맵 유형 지정
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      // ★ 기존의 지도 위에 새롭게 설정
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

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
      guideTooltip: ['draw', 'drag', 'edit'],
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

    // Drawing Manager 설정 및 초기화
    const drawingOptions1 = {
      map,
      drawingMode: [
        kakao.maps.drawing.OverlayType.MARKER,
      ],
      guideTooltip: ['draw', 'drag', 'edit'],
      markerOptions: {
        draggable: true,
        removable: true,
      },
    };

    const manager = new kakao.maps.drawing.DrawingManager(drawingOptions);
    setDrawingManager(manager);

    // Drawing Toolbox 생성
    const toolbox = new kakao.maps.drawing.Toolbox({ drawingManager: manager });
    map.addControl(toolbox.getElement(), kakao.maps.ControlPosition.TOPRIGHT);


    const manager1 = new kakao.maps.drawing.DrawingManager(drawingOptions1);
    setDrawingManager(manager1);

    // 마커가 생성될 때 이벤트 리스너 추가
      kakao.maps.event.addListener(manager1, 'drawend', function (data) {
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
            </div>
        `;

        const infowindow = new kakao.maps.InfoWindow({
          content: infowindowContent,
        });

        let isFixed = false; //인포윈도우 고정 상태 플래그

        // 닫기 버튼 클릭 이벤트 추가
        document.addEventListener('click', (event) => {
          if (event.target.classList.contains('close')) {
            infowindow.close(); // 인포윈도우 닫기
            isFixed = false;
          }
        });

        // 마커 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', function () {
          if (isFixed) {
            infowindow.close();
            isFixed = false; // 고정 해제
          } else {
            infowindow.open(map, marker);
            isFixed = true; // 고정 상태로 설정
          }
        });

        // 마커에 마우스 오버/아웃 이벤트 추가
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          if (!isFixed) {
            infowindow.open(map, marker); // 고정 상태가 아닌 경우에만 열기
          }
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          if (!isFixed) {
            infowindow.close(); // 고정 상태가 아닌 경우에만 닫기
          }
        });

        // 마커 이동(드래그) 이벤트 추가
        kakao.maps.event.addListener(marker, 'dragend', function () {
          if (!isFixed) {
            infowindow.close(); // 마커를 드래그하면 고정 상태가 아닌 경우에만 닫기
          }
          infowindow.close(); // 마커 
        });

        // 커스텀 닫기 버튼 이벤트 추가
        setTimeout(() => {
          const closeButton = document.querySelector('.info-window .close');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              infowindow.close();
              isFixed = false; // 고정 해제
            });
          }
        }, 100);
      }
    });

    // 상태에 마커와 인포윈도우 저장
    setMarkers((prevMarkers) => [...prevMarkers, { marker, infowindow }]);

    // Drawing Toolbox marker 생성
    const toolbox1 = new kakao.maps.drawing.Toolbox({ drawingManager: manager1 });
    map.addControl(toolbox1.getElement(), kakao.maps.ControlPosition.RIGHT);


    }
  }, [], [selectedCategory]); // 컴포넌트가 마운트될 때 한 번만 실행


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
    if(map == null) {
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
      console.log('동작 체크하기기: ', MapTypeId);
      deleteOverlay(map);


      //지도 타입 변경
      switch (MapTypeId) {
        case "TRAFFIC":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통정보
          break;
        case "ROADVIEW":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW) //로드뷰
          break;
        case "TERRAIN":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN) //지형 정보
          break;
        case "BICYCLE":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE); // 자전거 정보
          break;
        case "USE_DISTRICT":
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT); // 지적편집도 정보
          break;
        default:
          //map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADMAP); // 기본 지도 정보
          
          setMapTypeId('');
          map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
          
          break;
      }
    } catch (error) {
      console.error('지도 타입 변경 중 오류 발생: ', error);
    }
  }, [MapTypeId]);

  // 도형 데이터를 가져오는 메소드
  const getDrawnData = () => {
    if (!drawingManager) return;

    const data = drawingManager.getData();
    setDrawnData(data);
    console.log('Drawn Data:', data);
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
        const path = data.points.map((point) => new kakao.maps.LatLng(point.y, point.x));
        const poly = new kakao.maps.Polygon({ path, map });
        poly.setMap(map);
      });
    }

    if (polyline) {
      polyline.forEach((data) => {
        const path = data.points.map((point) => new kakao.maps.LatLng(point.y, point.x));
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
    setMarkers([]);

    // 선택된 카테고리별 마커 추가
    const positions =
      category === "coffee"
        ? coffeePositions
        : category === "store"
        ? storePositions
        : carparkPositions;

    const spriteOrigin =
      category === "coffee"
        ? coffeeOrigin
        : category === "store"
        ? storeOrigin
        : carparkOrigin;

    const newMarkers = positions.map((pos) => {
      const markerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        imageSize,
        { spriteSize, spriteOrigin }
      );
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(pos.lat, pos.lng),
        image: markerImage,
      });
      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers); // 새로운 마커 상태 저장
  };

  const clustererRef = useRef(null); // 클러스터러 참조

const handleSearch = () => {
  const map = mapRef.current;
  if (!map || !searchQuery) {
    alert("검색어를 입력하세요.");
    return;
  }

  const places = new kakao.maps.services.Places();

  places.keywordSearch(searchQuery, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      displaySearchMarkers(data); // 검색 결과 마커 표시
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 없습니다.");
    } else {
      console.error("검색 중 오류가 발생했습니다.");
    }
  });
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

  const hideMarkers = () => {
    markers.forEach(({marker}) => {
      marker.setMap(null); // 지도에서 마커 숨기기
    });
    setHiddenMarkers(markers); // 숨겨진 마커 저장
    setMarkers([]); // 현재 표시된 마커 초기화
  };

  const showMarkers = () => {
    const map = mapRef.current;
    hiddenMarkers.forEach(({marker}) => {
      marker.setMap(map); // 지도에 마커 다시 표시
    });
    setMarkers(hiddenMarkers); // 숨겨진 마커를 다시 활성 마커로 설정
    setHiddenMarkers([]); // 숨겨진 마커 초기화
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
  
  const clearMarkers = () => {
    // 저장된 모든 마커와 인포윈도우 삭제
    markers.forEach(({ marker, infowindow }) => {
      if (marker) marker.setMap(null); // 지도에서 마커 제거
      if (infowindow) infowindow.close(); // 인포윈도우 닫기
    });

    setMarkers([]); // 마커 상태 초기화
  };

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();         // 지도의 가운데 지정
    const level = map.getLevel();           // 지도의 현재 레벨을 얻어옵니다
    const mapTypeId = map.getMapTypeId();   // 지도타입을 얻어옵니다
    const bounds = map.getBounds();         // 지도의 현재 영역을 얻어옵니다
    const swLatLng = bounds.getSouthWest(); // 영역의 남서쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast(); // 영역의 북동쪽 좌표를 얻어옵니다

    let message = "지도 중심좌표는 위도 " + center.getLat() + ", <br>"
    message += "경도 " + center.getLng() + " 이고 <br>"
    message += "지도 레벨은 " + level + " 입니다 <br> <br>"
    message += "지도 타입은 " + mapTypeId + " 이고 <br> "
    message += "지도의 남서쪽 좌표는 " + swLatLng.getLat() + ", " + swLatLng.getLng() + " 이고 <br>"
    message += "북동쪽 좌표는 " + neLatLng.getLat() + ", " + neLatLng.getLng() + " 입니다.";

    setInfo(message);
  };

  const resetMapBounds = () => {
    const map = mapRef.current;
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(36.43698897735751, 126.80202130837696)); // 충도대 좌표 추가
    bounds.extend(new kakao.maps.LatLng(36.459105780044275, 126.80200414891813)); // 추가 영역 좌표

    map.setBounds(bounds); // 지도의 영역을 설정
  };

  const showCurrentLocation = () => {
    if(!navigator.geolocation) {
      alert('현재 위치를 가져올 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const map = mapRef.current;
      if(!map) return;

      const currentLatLng = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);

      //이전 마커 제거
      if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
      }

      // 현재 위치 마커 생성
      const newMarker = new kakao.maps.Marker({
        position: currentLatLng,
        map: map,
      });
      setCurrentLocationMarker(newMarker);

      //지도 중심 이동
      map.setCenter(currentLatLng);
    })
  }

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f7f7f7', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#333' }}>Kakao 지도</h1>
      </header>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="장소 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button className="button" onClick={handleSearch}>검색</button>
      </div>

      <div id="map" style={{
        margin: "20px auto",
        width: '95%',
        height: '500px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}></div>
  
      <div className="category" style={{
        textAlign: 'center',
        marginTop: '20px',
        backgroundColor: '#f7f7f7',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      }}>
        <ul>
          <li id="coffeeMenu" onClick={() => handleCategoryChange("coffee")}>
            <span className="ico_comm ico_coffee"></span> 커피숍
          </li>
          <li id="storeMenu" onClick={() => handleCategoryChange("store")}>
            <span className="ico_comm ico_store"></span> 편의점
          </li>
          <li id="carparkMenu" onClick={() => handleCategoryChange("carpark")}>
            <span className="ico_comm ico_carpark"></span> 주차장
          </li>
        </ul>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="button" onClick={toggleOverlayVisibility}>
          {customOverlay && customOverlay.getMap() ? "오버레이 숨기기" : "오버레이 보이기"}
        </button>
      </div>
  
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>타입 변경</h2>
        <div style={{ marginBottom: '10px' }}>
          <button className="button" onClick={() => setMapTypeId("ROADMAP")}>기본지도 보기</button>
          <button className="button" onClick={() => setMapTypeId("TRAFFIC")}>교통 정보 보기</button>
          <button className="button" onClick={() => setMapTypeId("ROADVIEW")}>로드뷰 보기</button>
          <button className="button" onClick={() => setMapTypeId("TERRAIN")}>지형 정보 보기</button>
          <button className="button" onClick={() => setMapTypeId("BICYCLE")}>자전거 도로 정보 보기</button>
          <button className="button" onClick={() => setMapTypeId("USE_DISTRICT")}>지적 편집도 보기</button>
          <button className="button" onClick={() => deleteOverlay()}>오버레이 삭제하기</button>
        </div>
        
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginTop: '20px' }}>맵핑 범위</h2>
        <button className="button" id="resetBoundsBtn" onClick={resetMapBounds}>맵핑 범위 재설정</button>
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginTop: '20px' }}>현재 위치 표시</h2>
        <button className="button" onClick={showCurrentLocation}>현 위치로 이동 및 마커 추가</button>
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginTop: '20px' }}>마커 제어</h2>
        <div>
          <button className="button" onClick={hideMarkers}>모든 마커 숨기기</button>
          <button className="button" onClick={showMarkers}>모든 마커 다시 표시</button>
          <button className="button" onClick={() => addMarker(new kakao.maps.LatLng(36.437, 126.803), true)}>커스텀 마커 추가</button>
          <button className="button" onClick={clearMarkers}>모든 마커 제거</button>
        </div>
  
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginTop: '20px' }}>맵 정보 가져오기</h2>
        <button className="button" id="getInfoBtn" onClick={getInfo}>맵정보 가져오기</button>
        <div id="info" style={{
          marginTop: '10px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }} dangerouslySetInnerHTML={{
          __html: info,
        }} />
      </div>
    </div>
  );
};

export default KakaoMap;