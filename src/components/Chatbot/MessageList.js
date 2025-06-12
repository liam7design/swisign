import React, { useRef, useEffect } from 'react';
import { Box, List } from '@mui/material';
import MessageItem from './MessageItem';

const MessageList = ({ messages, currentUser, onQuickReply, onNext, onUserInput }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box>
      <List>
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            currentUser={currentUser}
            onQuickReply={onQuickReply}
            onNext={onNext}
            onUserInput={onUserInput}
          />
        ))}
      </List>
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;