import React from 'react';
import { Typography, Avatar, Box } from '@mui/material';  
import { ChatHeaderWrap } from './ChatbotStyle';

const ChatHeader = ({ avatarName, avatarSrc, avatarAlt }) => {
  return (
    <>
      <ChatHeaderWrap sx={{ top: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
        <Avatar src={avatarSrc} alt={avatarAlt} />
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{avatarName}</Typography>
      </ChatHeaderWrap>
      <Box sx={{ height: 48 }} />
    </>
  );
};

export default ChatHeader;