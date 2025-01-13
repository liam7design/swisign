import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import FullpageLayout from '../layouts/FullpageLayout';

const MapView = () => {
  const mapRef = useRef(null); // 지도가 렌더링될 DOM 요소를 참조
  const location = useLocation();
  
  // URL의 쿼리 파라미터에서 주소 정보 추출
  const address = new URLSearchParams(location.search).get('address');

  useEffect(() => {
    const initMap = async () => {
      if (!window.naver) {
        await loadNaverMapScript();
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 초기 위치 설정 (예: 서울)
        zoom: 15,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      // 주소를 검색하여 해당 위치에 마커 설정
      searchAddressToCoordinate(address, (result) => {
        if (result) {
          const { y, x } = result;
          const position = new window.naver.maps.LatLng(y, x);
          map.setCenter(position);
          new window.naver.maps.Marker({
            position,
            map,
          });
        }
      });
    };

    initMap();
  }, [address]);

  // 네이버 지도 API 비동기 로드
  const loadNaverMapScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%REACT_APP_NAVER_MAP_API_KEY%`;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  // 주소로 좌표를 검색하는 함수
  const searchAddressToCoordinate = (address, callback) => {
    const geocoder = new window.naver.maps.Service.Geocoder();
    geocoder.addressToCoord(address, (status, response) => {
      if (status === window.naver.maps.Service.Status.OK) {
        const { y, x } = response.v2.addresses[0];
        callback({ y, x });
      } else {
        alert("주소 검색에 실패했습니다.");
      }
    });
  };

  return (
    <FullpageLayout>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
    </FullpageLayout>
  );
};

export default MapView;