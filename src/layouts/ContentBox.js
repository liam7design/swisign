import React from 'react';
import { Box } from '@mui/material';

const ContentBox = ({ children, variant = 'flex' }) => {
  const TopContent = React.Children.toArray(children).find(
    child => child.type === ContentBox.Top
  );
  const BottomContent = React.Children.toArray(children).find(
    child => child.type === ContentBox.Bottom
  );
  const Content = React.Children.toArray(children).find(
    child => child.type === ContentBox.Content
  );

  // 레이아웃 렌더링 로직을 분리
  const renderContentBox = () => {
    switch (variant) {
      case 'flex':
        return (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: { xs: 'calc(100vh - 137px)', sm: 'calc(100vh - 177px)' },
          }}>
            <Box>{TopContent}</Box>
            <Box sx={{ mt: 3 }}>{BottomContent}</Box>
          </Box>
        );
      case 'block':
        return (
          <Box sx={{
            minHeight: { xs: 'calc(100vh - 137px)', sm: 'calc(100vh - 177px)' },
          }}>
            {Content}
          </Box>
        );
      default:
        return null;
    }
  };

  return renderContentBox();
};

ContentBox.Top = ({ children }) => children;
ContentBox.Bottom = ({ children }) => children;
ContentBox.Content = ({ children }) => children;

export default ContentBox;