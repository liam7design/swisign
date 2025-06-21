import React, { useState } from 'react';
import { Box, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import QuickReplyButton from './QuickReplyButton';

import ContractInfoDialog from './dialogs/ContractInfoDialog';
import SpecialTermsDialog from './dialogs/SpecialTermsDialog';
import ConfirmationDocumentDialog from './dialogs/ConfirmationDocumentDialog';

import { formatTimestamp } from './utils/formatTimestamp';
import { MessageItemBox, ChatBubbleWBox , RenderSpecialBox } from './ChatbotStyle';

const MessageItem = ({ message, currentUser, onQuickReply, onNext }) => {
  const isUser = message.sender.id === currentUser.id;
  const [selectedResults, setSelectedResults] = useState([]);

  // 1. 단일 상태로 현재 활성화된 다이얼로그의 종류를 관리합니다. (null: 닫힘)
  const [activeDialog, setActiveDialog] = useState(null);

  // 2. 다이얼로그 제출(완료) 핸들러들을 정의합니다.
  const handleDialogSubmit = (formData) => {
    // 개발 환경에서만 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log(`${activeDialog} 데이터:`, formData);
    }
    onNext(message.nextId, message.autoText); // 다음 시나리오로 진행
    setActiveDialog(null); // 다이얼로그 닫기
  };

  // 3. 다이얼로그 닫기 핸들러
  const handleDialogClose = () => {
    setActiveDialog(null);
  };

  const renderInnerContent = () => {
    switch (message.type) {
      
      case 'quick_reply':
        return !isUser && <QuickReplyButton replies={message.replies} onReply={onQuickReply} />;

      case 'address_guide':
        return !isUser && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: '500' }}>
              [{message.guide.title}]
            </Typography>
            {message.guide.examples.map((example, index) => (
              <Box key={index} sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>{example.label}</Typography>
                <Typography variant="body2" component="i" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }} >{example.example}</Typography>
              </Box>
            ))}
            <QuickReplyButton>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onNext('SELECT_ADDRESS_OPTION', '')}
              >
                검색취소
              </Button>
            </QuickReplyButton>
          </Box>
        );

      case 'input_required':
        return !isUser && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="body2" component="i" sx={{ color: 'text.secondary' }} >{message.placeholder}</Typography>
          </Box>
        );

      case 'address_confirm':
        return !isUser && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
              (00000) 서울특별시 강남구 테헤란로 123 201호
            </Typography>
            <QuickReplyButton replies={message.replies} onReply={onQuickReply} />
          </Box>
        );

      case 'dialog_action':
        return !isUser && (
          <QuickReplyButton>
            {message.hasCancel && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onNext('CANCEL', '')}
              >
                취소
              </Button>
            )}
            <Button
              variant="outlined" 
              size="small"
              onClick={() => setActiveDialog(message.dialogType)}
            >
              {message.actionText}
            </Button>
          </QuickReplyButton>
        );

      case 'final_step':
        return !isUser && (
          <QuickReplyButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onNext('RESTART', '')}
            >
              {message.actionText}
            </Button>
          </QuickReplyButton>
        );
        
      default:
        return null;
    }
  };

  const renderSpecialContent = () => {
    switch (message.type) {

      case 'address_selection':
        return !isUser && (
          <RenderSpecialBox>
            <Box className="check-list">
              {message.addresses?.map((address, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedResults.includes(address)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedResults([address]);
                        } else {
                          setSelectedResults([]);
                        }
                      }}
                    />
                  }
                  label={address}
                />
              ))}
            </Box>
            <Box className="button-box">
              <Button
                variant="contained"
                size="small"
                disabled={selectedResults.length === 0}
                onClick={() => onNext(message.nextId, `${selectedResults[0]}을 선택할게요.`)}
              >
                다음
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedResults([]);
                  onNext(message.searchNextId, '주소를 검색할게요.');
                }}
              >
                주소검색
              </Button>
            </Box>
          </RenderSpecialBox>
        );
        
      case 'address_results':
        return !isUser && (
          <RenderSpecialBox>
            <Box className="check-list">
              {message.searchResults?.map((result, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedResults.includes(result)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedResults([result]);
                        } else {
                          setSelectedResults([]);
                        }
                      }}
                    />
                  }
                  label={result}
                />
              ))}
            </Box>
            <Box className="button-box">
              <Button
                variant="contained"
                size="small"
                disabled={selectedResults.length === 0}
                onClick={() => onNext(message.nextId, `${selectedResults[0]}을 선택할게요.`)}
              >
                다음
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onNext('SEARCH_ADDRESS_GUIDE', '')}
              >
                다시검색
              </Button>
            </Box>
          </RenderSpecialBox>
        );
        
      case 'contract_form':
        return !isUser && (
          <RenderSpecialBox>
            <Typography variant="subtitle2" fontWeight="bold">
              📄 {message.formType}
            </Typography>
            <Box className="media-box">
              <img src="/images/img_contract_01.jpg" alt="주택임대차표준계약서1" />
              <img src="/images/img_contract_02.jpg" alt="주택임대차표준계약서2" />
            </Box>
            <Box className="button-box">
              <Button
                variant="contained"
                size="small"
                onClick={() => onNext(message.nextId, '')}
              >
                계약서 확인 완료
              </Button>
            </Box>   
          </RenderSpecialBox>
        );
        
      default:
        return null;
    }
  };

  return (
    <MessageItemBox>
      <ChatBubbleWBox className={isUser ? 'user': 'aibot'}>
        <Box className="chat-bubble">
          <Typography variant="body2">
            {message.text}
          </Typography>
          {renderInnerContent()}
        </Box>
        <Typography className="chat-date" variant="caption">
          {formatTimestamp(message.timestamp, '12h')}
        </Typography>
      </ChatBubbleWBox>
      {renderSpecialContent()}
      {activeDialog === 'contract_info' && (
        <ContractInfoDialog
          open={true}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
      )}
      {activeDialog === 'special_terms' && (
        <SpecialTermsDialog
          open={true}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
      )}
      {activeDialog === 'confirmation_document' && (
        <ConfirmationDocumentDialog
          open={true}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
      )}
    </MessageItemBox>
  );
};

export default MessageItem;