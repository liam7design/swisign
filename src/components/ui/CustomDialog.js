import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const CustomDialog = ({
  open,
  onClose,
  onClick,
  title,
  message
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
    >
      <DialogTitle sx={{ padding: '20px 24px 16px', fontSize: 18 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary', fontSize: 14 }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px 20px' }}>
        <Button variant="contained" size="small" onClick={onClick} autoFocus>확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;