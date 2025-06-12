import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import Chatbot from '../components/Chatbot';

const ChatbotTest = () => {
  return (
    <SubpageLayout customTitle="계약서 작성">
      <Chatbot />
    </SubpageLayout>
  )
}

export default ChatbotTest;