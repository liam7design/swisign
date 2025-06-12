import React from 'react';
import { Box, Button } from '@mui/material';

const QuickReplyCard = ({ replies, onReply }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, maxWidth: '280px' }}>
      {replies.map((reply, index) => (
        <Button
          key={index}
          variant="outlined"
          size="small"
          onClick={() => onReply(reply)}
          sx={{
            borderRadius: '20px',
            borderColor: '#010101',
            color: '#010101',
            '&:hover': {
              backgroundColor: '#010101',
              color: 'white'
            }
          }}
        >
          {reply.text}
        </Button>
      ))}
    </Box>
  );
};

export default QuickReplyCard;