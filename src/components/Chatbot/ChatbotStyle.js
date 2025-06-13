import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// ChatHeadrer.ks
export const ChatHeaderWrap = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e5e5e5',
  zIndex: 999,
  '& .MuiAvatar-root': {
    width: 32, 
    height: 32,
  },
}));

// MessageItem.js
export const MessageItemWrap = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'flex-end', 
  gap: theme.spacing(1),
  marginBottom: 32,
  '& .chat-bubble': {
    maxWidth: '280px',
    padding: theme.spacing(2, 2.5),
    color: '#101010',
    borderRadius: '0 24px 24px 24px',
    backgroundColor: '#f0f0f0'
  },
  '& .chat-text': {
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap'
  },
  '& .chat-date' : {
    color: '#a0a0a0',
    flexShrink: 0
  },
  '&.user': {
    flexDirection: 'row-reverse',
    '& .chat-bubble': {
      color: '#ffffff',
      borderRadius: '24px 0 24px 24px',
      backgroundColor: '#101010'
    }
  }
}));

// MessageInput.js
export const MessageInputBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: '#ffffff',
  backgroundColor: '#101010',
  borderTop: '1px solid #e5e5e5',
  zIndex: 999,
  '& .MuiAvatar-root': {
    width: 32, 
    height: 32
  },
  '& .MuiFormControl-root [class*="MuiOutlinedInput"]': {
    padding: 0,
    border: 'none',
    color: '#ffffff',
  },
  '& .MuiButtonBase-root': {
    padding: 0,
    color: '#ffffff',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-disabled': {
      color: '#505050'
    }
  }
}));