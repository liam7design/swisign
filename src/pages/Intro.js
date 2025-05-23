import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';

const Intro = () => {
  const navigate = useNavigate();

  // 버튼 클릭 시 즉시 이동
  const handleIntroComplete = () => {
    navigate('/');
  };

  // 5초 후 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant='h6' sx={{ fontSize: 18 }}>부동산 계약 전부터 관리까지</Typography>
      <IconButton 
        sx={{
          my: 2,
          '&:hover': {
            backgroundColor: 'unset',
          }
        }}
        onClick={handleIntroComplete}
        disableRipple
      >
        <img src="/logo_swisign.png" alt="로고" width={120} height={100} />
      </IconButton>
    </Box>
  )
}

export default Intro;