import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, currentUser, onQuickReply, onNext, onUserInput }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <>
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
      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;