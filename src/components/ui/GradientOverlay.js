import React from 'react';
import {
  Box,
} from '@mui/material';

const GradientOverlay = ({ pos }) => {
  const positionStyles = {
    top:pos === 'top' && {
      bottom: -24,
      background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))'
    },
    bottom:pos === 'bottom' && {
      top: -24,
      background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
    }
  }
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 24,
          pointerEvents: 'none',
          zIndex: 9,
          ...positionStyles[pos]
        }}
      />
    </Box>
  );
}

export default GradientOverlay;