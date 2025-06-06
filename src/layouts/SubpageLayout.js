import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import getTitle from '../utils/getTitle';

const SubpageLayout = ({ children, customTitle, customBackPath, rightElement, containerSx }) => {
  const location = useLocation();
  const headerTitle = customTitle || getTitle(location.pathname);
  
  return (
    <>
      {/* 뒤로가기 버튼과 제목 표시 */}
      <Header title={headerTitle} customBackPath={customBackPath} rightElement={rightElement} showBackButton />
      <main>
        <Container sx={{ 
          pt: { xs: 4, sm: 6 }, 
          pb: { xs: 6, sm: 8 },
          textAlign: 'left',
          ...containerSx
        }}>{children}</Container>
      </main>
    </>
  );
};

export default SubpageLayout;