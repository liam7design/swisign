import React from 'react';
import { Box, Button } from '@mui/material';

const FloatingButton = ({ buttons = [] }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        px: { xs: 2, sm: 3 },
        py: 2,
        zIndex: 999
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        gap: 1 
      }}>
        {buttons.map((btn, index) => (
          <Button
            key={index}
            variant={btn.variant || 'outlined'}
            size="large"
            onClick={btn.onClick}
            fullWidth
            sx={{ 
              minWidth: 120,
              ...btn.sx 
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default FloatingButton;