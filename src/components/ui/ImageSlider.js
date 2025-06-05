import React from 'react';
import { Box, styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const ImageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'aspectratio',
})(({ aspectratio }) => ({
  position: 'relative',
  aspectRatio: aspectratio || '4 / 3',
  overflow: 'hidden',
  marginBottom: 24,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
}));

const ImageSlider = ({ 
  imageData,
  delay = 5000,
  aspectRatio = '4 / 3',
  paginationType = 'progressbar', // 기본값: progressbar
  showPagination = true           // 기본값: true
}) => {
  
  // Swiper pagination 옵션 동적 생성
  const paginationOption = showPagination
    ? { type: paginationType }
    : false;
 
  return (
    <Box sx={{ 
      ml: { xs: -2, sm: -3 }, 
      mr: { xs: -2, sm: -3 },
      '& .swiper-pagination-progressbar .swiper-pagination-progressbar-fill': {
        backgroundColor: '#000',
      }
    }}>
      <Swiper 
        slidesPerView={1} 
        loop={true}
        autoplay={{
          delay: delay,
          disableOnInteraction: false
        }}
        speed={500}
        pagination={paginationOption}
        modules={[Autoplay, Pagination]}
      >
        {imageData.map((img, index) => (
          <SwiperSlide key={index}>
            <ImageBox aspectratio={aspectRatio}>
              <img src={img} alt='' />
            </ImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;