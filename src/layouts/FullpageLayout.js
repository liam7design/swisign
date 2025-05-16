import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import getTitle from '../utils/getTitle';

const FullpageLayout = ({ children, customTitle }) => {
  const location = useLocation();
  const headerTitle = customTitle || getTitle(location.pathname);

  return (
    <>
      {/* 닫기 버튼과 제목 표시 */}
      <Header title={headerTitle} showCloseButton />
      <main>
        <Container sx={{ 
          pt: { xs: 4, sm: 6 }, 
          pb: { xs: 6, sm: 8 },
          textAlign: 'left',
        }}>{children}</Container>
      </main>
    </>
  );
};

export default FullpageLayout;