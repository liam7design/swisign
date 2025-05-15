import React from 'react';
import { Box, Button } from '@mui/material';

export const FloatingBox = ({ children, ...props }) => {
  return (
    <>
      <Box sx={{ height: 76 }} />
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          // borderTop: 1,
          // borderColor: 'divider',
          px: { xs: 2, sm: 3 },
          py: 2,
          zIndex: 999,
          ...props.sx
        }}
        {...props}
      >
        {/* 그라데이션 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -24,
            height: 24,
            // pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
          }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
            {children}
        </Box>
      </Box>
    </>
  );
}

export const FloatingButton = ({ variant, label, onClick, ...props }) => (
  <Button
    variant={variant || 'outlined'}
    size="large"
    onClick={onClick}
    fullWidth
    sx={{
      minWidth: 120,
      ...props.sx,
    }}
    {...props}
  >
    {label}
  </Button>
);