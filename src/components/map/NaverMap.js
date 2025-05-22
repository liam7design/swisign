import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const NAVER = window.naver;

const NaverMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !NAVER) return;
    // 기본 지도만 표시
    new NAVER.maps.Map(mapRef.current, {
      center: new NAVER.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
      zoom: 15,
    });
  }, []);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: '100%',
        height: 'calc(100vh - 57px)'
      }}
    />
  );
};

export default NaverMap;