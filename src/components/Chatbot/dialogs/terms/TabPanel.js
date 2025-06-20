import React from 'react';
import { Box } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ px: 2, pt: 9, pb: 3, overflowY: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );
}
export default TabPanel;