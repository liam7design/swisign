import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ onSend, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend({ text: inputValue });
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            '&.Mui-focused fieldset': {
              borderColor: '#010101',
            },
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={!inputValue.trim() || disabled}
        aria-label="메시지 보내기"
        sx={{ 
          backgroundColor: '#010101', 
          color: 'white', 
          '&:hover': { backgroundColor: '#010101' }, 
          '&.Mui-disabled': { backgroundColor: '#E0E0E0' } 
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;