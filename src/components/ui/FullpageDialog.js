import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogBox = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    padding: '0 16px',
    fontSize: 18,
    lineHeight: 'inherit',
    wordBreak: 'keep-all',
    borderBottom: '0.063rem solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: (theme.vars || theme).palette.background.default,
    boxSizing: 'border-box',
    '& + .MuiDialogContent-root': {
      padding: '24px 16px',
      wordBreak: 'keep-all'
    }
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    '& .MuiButtonBase-root': {
      width: '100%'
    }
  },
}));

const FullpageDialog = ({
  open,
  onClose,
  onClick1,
  onClick2,
  btn1 = '확인',
  btn2 = '취소',
  btn1Type = 'button', // type props 추가, 기본값 'button'
  btn1Form,             // form id를 받을 props 추가
  title,
  disabled,
  children
}) => {
  return (
    <DialogBox
      fullScreen
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
      aria-labelledby="fullpage-dialog-title"
      aria-describedby="fullpage-dialog-description"
    >
      <DialogTitle id="fullpage-dialog-title">
        {title}
        <IconButton edge="end" color="inherit" aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {onClick2 && <Button variant="outlined" onClick={onClick2} fullWidth>{btn2}</Button>}
        <Button 
          variant="contained"
          type={btn1Type}    // type 적용
          form={btn1Form}    // form id 적용 
          onClick={onClick1} 
          disabled={!!disabled} 
          autoFocus 
          fullWidth
        >
          {btn1}
        </Button>
      </DialogActions>
    </DialogBox>
  );
};

FullpageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick1: PropTypes.func, // 필수가 아님 (type="submit"일 경우)
  onClick2: PropTypes.func,
  btn1: PropTypes.string,
  btn2: PropTypes.string,
  btn1Type: PropTypes.string, // prop type 정의
  btn1Form: PropTypes.string, // prop type 정의
  title: PropTypes.node,
  disabled: PropTypes.bool,
};

export default FullpageDialog;