import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const isInitialMount = useRef(true);

  const addBotMessage = useCallback((node) => {
    const newMessage = {
      ...node,
      id: Date.now() + Math.random(),
      type: node.type,
      text: node.message,
      sender: botProfile,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // 초기 메시지 표시
  useEffect(() => {
    if (isInitialMount.current) {
      const startNode = contractScenario[currentNodeId];
      if (startNode) {
        addBotMessage(startNode);
      }
      isInitialMount.current = false;
    }
  }, [currentNodeId, addBotMessage]);

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

  const navigateToNode = useCallback((nodeId, userText = '') => {
    if (userText) {
      addUserMessage(userText);
    }

    const timeoutId = setTimeout(() => {
      if (nodeId === 'RESTART') {
        setMessages([]);
        setUserData({
          address: '',
          detailAddress: '',
          contractRole: '',
          contractType: ''
        });
        setCurrentNodeId('START');
        isInitialMount.current = true;
        return;
      }

      const nextNode = contractScenario[nodeId];
      if (nextNode) {
        setCurrentNodeId(nodeId);
        
        // final_step 타입의 경우 최종 메시지 추가
        if (nextNode.type === 'final_step') {
          // 메인 메시지 추가
          addBotMessage({
            ...nextNode,
            type: 'text' // final_step 타입을 text로 변경하여 종료 버튼이 표시되지 않도록 함
          });
          
          // finalText가 있는 경우 1초 후에 추가 메시지와 종료 버튼 표시
          if (nextNode.finalText) {
            const finalTimeoutId = setTimeout(() => {
              addBotMessage({
                type: 'final_step',
                message: nextNode.finalText,
                actionText: nextNode.actionText // 종료 버튼 추가
              });
            }, 1000);
            return () => clearTimeout(finalTimeoutId);
          } else {
            // finalText가 없는 경우 바로 종료 버튼 표시
            addBotMessage({
              type: 'final_step',
              message: '',
              actionText: nextNode.actionText
            });
          }
        } else {
          addBotMessage(nextNode);
        }
      }
    }, userText ? 1000 : 100);

    return () => clearTimeout(timeoutId);
  }, [addBotMessage]);

  const handleQuickReply = useCallback((reply) => {
    navigateToNode(reply.nextId, reply.autoText);
  }, [navigateToNode]);

  const handleNext = useCallback((nextId, userText) => {
    navigateToNode(nextId, userText);
  }, [navigateToNode]);

  const handleUserInput = useCallback((inputText, nextId) => {
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
  }, [currentNodeId, navigateToNode]);

  const handleSend = useCallback(({ text }) => {
    if (currentNodeId === 'ADDRESS_SEARCH_INPUT' || currentNodeId === 'SEARCH_ADDRESS_GUIDE') {
      // 주소 검색 로직
      setTimeout(() => {
        navigateToNode('ADDRESS_SEARCH_RESULTS');
      }, 1000);
    } else if (currentNodeId === 'DETAIL_ADDRESS_INPUT') {
      // 상세 주소 입력 처리
      handleUserInput(text, 'CONFIRM_ADDRESS');
    } else {
      handleUserInput(text);
    }
  }, [currentNodeId, handleUserInput, navigateToNode]);

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