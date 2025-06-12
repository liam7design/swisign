import React, { useState } from 'react';
import { Box, Paper, Typography, Avatar, Card, CardContent, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import QuickReplyCard from './QuickReplyCard';
import AddressCard from './AddressCard';
import { formatTimestamp } from './utils/formatTimestamp';

const MessageItem = ({ message, currentUser, onQuickReply, onNext, onUserInput }) => {
  const isUser = message.sender.id === currentUser.id;
  const [inputValue, setInputValue] = useState('');
  const [selectedResults, setSelectedResults] = useState([]);

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onUserInput(inputValue, message.nextId);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const renderSpecialContent = () => {
    switch (message.type) {
      case 'quick_reply':
        return !isUser && <QuickReplyCard replies={message.replies} onReply={onQuickReply} />;
        
      case 'address_selection':
        return !isUser && <AddressCard node={message} onNext={onNext} />;
        
      case 'address_guide':
        return !isUser && (
          <Card elevation={0} sx={{ backgroundColor: '#F0F4F8', borderRadius: '12px', mt: 1, maxWidth: '280px' }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                {message.guide.title}
              </Typography>
              {message.guide.examples.map((example, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">{example.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{example.example}</Typography>
                </Box>
              ))}
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => onNext('ADDRESS_SEARCH_INPUT', '')}
              >
                검색취소
              </Button>
            </CardContent>
          </Card>
        );
        
      case 'address_results':
        return !isUser && (
          <Card elevation={0} sx={{ backgroundColor: '#EFEFEF', borderRadius: '12px', mt: 1, maxWidth: '280px' }}>
            <CardContent>
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
                  sx={{ display: 'block', mb: 1 }}
                />
              ))}
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  disabled={selectedResults.length === 0}
                  onClick={() => onNext(message.nextId, `${selectedResults[0]}을 선택할게요.`)}
                  sx={{ backgroundColor: '#010101' }}
                >
                  다음
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onNext(message.reshearchId, '주소를 다시 입력해 주세요.')}
                >
                  다시검색
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
        
      case 'input_required':
        return !isUser && (
          <Box sx={{ mt: 1, maxWidth: '280px' }}>
            <TextField
              fullWidth
              size="small"
              placeholder={message.placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ backgroundColor: 'white', borderRadius: '8px' }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleInputSubmit}
              disabled={!inputValue.trim()}
              sx={{ mt: 1, backgroundColor: '#010101' }}
            >
              입력완료
            </Button>
          </Box>
        );
        
      case 'address_confirm':
        return !isUser && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ 
              backgroundColor: '#F0F4F8', 
              p: 1, 
              borderRadius: '8px', 
              mb: 1,
              fontFamily: 'monospace'
            }}>
              서울특별시 강남구 테헤란로 123 201호
            </Typography>
            <QuickReplyCard replies={message.replies} onReply={onQuickReply} />
          </Box>
        );
        
      case 'contract_form':
        return !isUser && (
          <Card elevation={0} sx={{ backgroundColor: '#F0F4F8', borderRadius: '12px', mt: 1, maxWidth: '280px' }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold">
                📄 {message.formType}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, mb: 2 }}>
                계약서 양식을 검토하세요
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => onNext(message.nextId, '')}
                sx={{ backgroundColor: '#010101' }}
              >
                계약서 확인
              </Button>
            </CardContent>
          </Card>
        );
        
      case 'dialog_action':
        return !isUser && (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              onClick={() => onNext(message.nextId, message.autoText)}
              sx={{ backgroundColor: '#010101', mr: 1 }}
            >
              {message.actionText}
            </Button>
            {message.hasCancel && (
              <Button variant="outlined" size="small">
                취소
              </Button>
            )}
          </Box>
        );
        
      case 'final_step':
        return !isUser && (
          <Button
            variant="contained"
            onClick={() => onNext('RESTART', '')}
            sx={{ mt: 1, backgroundColor: '#010101' }}
          >
            {message.actionText}
          </Button>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: 1 }}>
        <Avatar src={message.sender.profileImage} alt={message.sender.name} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography variant="caption" sx={{ 
            color: 'text.secondary', 
            display: 'block', 
            textAlign: isUser ? 'right' : 'left', 
            mb: 0.5 
          }}>
            {message.sender.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, flexDirection: isUser ? 'row-reverse' : 'row' }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: isUser ? '20px 2px 20px 20px' : '2px 20px 20px 20px',
                backgroundColor: isUser ? '#010101' : '#EFEFEF',
                color: isUser ? '#FFFFFF' : '#000000',
                maxWidth: '280px'
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {message.text}
              </Typography>
              {renderSpecialContent()}
            </Paper>
            <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
              {formatTimestamp(message.timestamp, '12h')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageItem;