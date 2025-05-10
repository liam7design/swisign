import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const CustomDialog = ({
  open,
  onClose,
  onClick1,
  onClick2,
  btn1 = '확인',
  btn2 = '취소',
  title,
  message
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      <DialogTitle id="custom-dialog-title" sx={{ padding: '20px 24px 16px', fontSize: 18 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="custom-dialog-description" sx={{ color: 'text.primary', fontSize: 14 }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px 20px' }}>
        {onClick2 &&
          <Button variant="outlined" size="small" onClick={onClick2}>{btn2}</Button>
        }
        <Button variant="contained" size="small" onClick={onClick1} autoFocus>
          {btn1}
        </Button>
      </DialogActions>
    </Dialog>
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
};

export default CustomDialog;