import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { contractScenario, botProfile, userProfile } from './data/contractScenario';
import { FloatingBox } from '../ui/FloatingBox';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState('START');
  const [userData, setUserData] = useState({
    address: '',
    detailAddress: '',
    contractRole: '',
    contractType: ''
  });

  // 초기 메시지 표시
  useEffect(() => {
    const startNode = contractScenario[currentNodeId];
    if (startNode && messages.length === 0) {
      addBotMessage(startNode);
    }
  }, []);

  const addBotMessage = (node) => {
    const newMessage = {
      ...node,
      id: Date.now() + Math.random(),
      type: node.type,
      text: node.message,
      sender: botProfile,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text) => {
    if (!text) return;
    const newMessage = {
      id: Date.now() + 1,
      type: 'text',
      text: text,
      sender: userProfile,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const navigateToNode = (nodeId, userText = '') => {
    if (userText) {
      addUserMessage(userText);
    }

    // 노드 전환 딜레이
    setTimeout(() => {
      if (nodeId === 'RESTART') {
        setCurrentNodeId('START');
        setMessages([]);
        setUserData({
          address: '',
          detailAddress: '',
          contractRole: '',
          contractType: ''
        });
        return;
      }

      const nextNode = contractScenario[nodeId];
      if (nextNode) {
        setCurrentNodeId(nodeId);
        
        // final_step 타입의 경우 최종 메시지 추가
        if (nextNode.type === 'final_step' && nextNode.finalText) {
          setTimeout(() => {
            addBotMessage({
              type: 'text',
              message: nextNode.finalText
            });
          }, 1000);
        }
        
        addBotMessage(nextNode);
      }
    }, userText ? 1000 : 100);
  };

  const handleQuickReply = (reply) => {
    navigateToNode(reply.nextId, reply.autoText);
  };

  const handleNext = (nextId, userText) => {
    navigateToNode(nextId, userText);
  };

  const handleUserInput = (inputText, nextId) => {
    // 사용자 데이터 저장
    if (currentNodeId === 'DETAIL_ADDRESS_INPUT') {
      setUserData(prev => ({ ...prev, detailAddress: inputText }));
    }

    addUserMessage(inputText);
    
    if (nextId) {
      setTimeout(() => {
        navigateToNode(nextId);
      }, 1000);
    }
  };

  const handleSend = ({ text }) => {
    if (currentNodeId === 'ADDRESS_SEARCH_INPUT' || currentNodeId === 'SEARCH_ADDRESS_GUIDE') {
      // 주소 검색 로직
      setTimeout(() => {
        navigateToNode('ADDRESS_SEARCH_RESULTS');
      }, 1000);
    } else {
      handleUserInput(text);
    }
  };

  return (
    <Box>
      <MessageList
        messages={messages}
        currentUser={userProfile}
        onQuickReply={handleQuickReply}
        onNext={handleNext}
        onUserInput={handleUserInput}
      />
      <FloatingBox>
        <MessageInput onSend={handleSend} />
      </FloatingBox>
    </Box>
  );
};

export default Chatbot;