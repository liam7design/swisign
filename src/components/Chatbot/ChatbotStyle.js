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
export const MessageItemBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'column', 
  gap: theme.spacing(1.5),
  marginBottom: 40,
}));

export const ChatBubbleWBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end', 
  gap: theme.spacing(1),
  '& .chat-bubble': {
    maxWidth: '280px',
    padding: theme.spacing(1.5, 2),
    color: '#101010',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    borderRadius: '0 24px 24px 24px',
    backgroundColor: '#f0f0f0'
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

export const RenderSpecialBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  padding: theme.spacing(2.5, 2), 
  border: '1px solid #dbdbdb',
  borderRadius: '8px',
  '& .media-box': {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      maxWidth: '100%'
    }
  },
  '& .check-list': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(-0.5),
    '& .MuiFormControlLabel-root': {
      marginRight: 0,
      '& .MuiCheckbox-root': {
        padding: '8px'
      },
      '& .MuiTypography-root': {
        fontSize: '0.875rem'
      }
    }
  },
  '& .button-box': {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    '& .MuiButton-root': {
      minWidth: '80px',
      minHeight: '34px',
      padding: '8px 14px',
      lineHeight: 'normal',
      borderColor: theme.palette.primary.main,
      '&:hover': {
        color: '#ffffff',
        backgroundColor: theme.palette.text.primary,
      }
    }
  },
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


// QuickReplyButton.js
export const QuickReplyButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  '& .MuiButton-root': {
    minWidth: '58px',
    minHeight: '34px',
    padding: '8px 14px',
    lineHeight: 'normal',
    borderColor: theme.palette.primary.main,
    borderRadius: '20px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: theme.palette.text.primary,
    }
  }
}));