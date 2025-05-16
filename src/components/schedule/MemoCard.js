import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ThreeDotsMenu from '../ui/ThreeDotsMenu';

const MemoCard = ({ date, time, content, onEdit, onDelete }) => {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      border: '1px solid #bdbdbd',
      background: '#fff'
    }}>
      <Stack direction="row" sx={{ height: '28px', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1 }}>
        <Typography sx={{ fontSize: '15px', fontWeight: 'medium' }}>
          {date}&nbsp;&nbsp;{time}
        </Typography>
        <ThreeDotsMenu
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Stack>
      <Typography variant="body2">
        {content}
      </Typography>
    </Box>
  );
};

export default MemoCard;