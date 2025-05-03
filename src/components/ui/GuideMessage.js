import React from 'react';
import { Box, Card, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';

const MessageCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100],
}));

const GuideMessage = ({
  title = null,
  message,
}) => {
  return (
    <MessageCard variant="outlined">
      <ErrorIcon fontSize="small" />
      <Box>
        {title = !null &&
          <Typography variant="subtitle2">{title}</Typography>
        }
        <Typography variant="body2">{message}</Typography>
      </Box>
    </MessageCard>
  );
}

export default GuideMessage;