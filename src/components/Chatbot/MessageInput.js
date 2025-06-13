import React, { useState } from 'react';
import { Box, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessageInputBox } from './ChatbotStyle';

const MessageInput = ({ onSend, disabled, currentUser }) => {
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
    <>
      <Box sx={{ height: 56 }} />
      <MessageInputBox sx={{ px: { xs: 2, sm: 3 } }}>
        <Avatar src={currentUser?.profileImage} alt={currentUser?.name} />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="메시지를 입력하세요..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          aria-label="메시지 보내기"
        >
          <SendIcon />
        </IconButton>
      </MessageInputBox>
    </>
  );
};

export default MessageInput;