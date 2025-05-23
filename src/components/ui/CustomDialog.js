import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, styled } from '@mui/material';

const DialogBox = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: 'calc(360px - 32px)',
    margin: 16,
    padding: 24,
    boxSizing: 'border-box'
  },
  '& .MuiDialogTitle-root': {
    marginTop: 12,
    padding: 0,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 'inherit',
    wordBreak: 'keep-all',
    '& + .MuiDialogContent-root': {
      padding: '12px 0',
      textAlign: 'center',
      wordBreak: 'keep-all'
    }
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 0,
    '& .MuiButtonBase-root': {
      width: '100%'
    }
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 4
}));

const CustomDialog = ({
  open,
  onClose,
  onClick1,
  onClick2,
  btn1 = '확인',
  btn2 = '취소',
  title,
  message,
  icon,
  disabled,
  children
}) => {
  return (
    <DialogBox
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      {icon && <IconBox>{icon}</IconBox>}
      <DialogTitle id="custom-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {message ? <DialogContentText>{message}</DialogContentText> : children}
      </DialogContent>
      <DialogActions>
        {onClick2 && <Button variant="outlined" onClick={onClick2} fullWidth>{btn2}</Button>}
        <Button variant="contained" onClick={onClick1} disabled={!!disabled} autoFocus fullWidth>
          {btn1}
        </Button>
      </DialogActions>
    </DialogBox>
  );
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick1: PropTypes.func.isRequired,
  onClick2: PropTypes.func,
  btn1: PropTypes.string,
  btn2: PropTypes.string,
  title: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  icon: PropTypes.node,
  disabled: PropTypes.func,
};

export default CustomDialog;