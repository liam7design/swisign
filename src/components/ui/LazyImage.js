import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * 지연 로딩 이미지 컴포넌트
 * @param {string} src - 이미지 소스
 * @param {string} alt - 대체 텍스트
 * @param {Object} sx - 스타일 객체
 * @param {number} width - 너비
 * @param {number} height - 높이
 * @param {string} placeholder - 플레이스홀더 색상
 */
const LazyImage = ({ 
  src, 
  alt, 
  sx = {}, 
  width, 
  height, 
  placeholder = 'grey.300',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true); // 에러 시에도 로딩 상태를 true로 설정
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        ...sx
      }}
      {...props}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: placeholder }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      )}
    </Box>
  );
};

export default React.memo(LazyImage); 