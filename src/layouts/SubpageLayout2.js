import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import getTitle from '../utils/getTitle';

const SubpageLayout2 = ({ children, customTitle }) => {
  const location = useLocation();
  const headerTitle = customTitle || getTitle(location.pathname);
  
  return (
    <>
      {/* 뒤로가기 버튼과 제목 표시 */}
      <Header title={headerTitle} showBackButton showDetailButton />
      <main>
        <Container sx={{ 
          pt: 0, 
          pb: { xs: 6, sm: 8 },
          textAlign: 'left',
        }}>{children}</Container>
      </main>
    </>
  );
};

export default SubpageLayout2;