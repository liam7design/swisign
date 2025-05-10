import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButton
} from '@mui/material';
import { FormBox, CustomToggleButtonGroup, CustomTextField, EndAdornment } from './FormStyle';

const ManagementFeeDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  initialValue 
}) => {
  const [feeType, setFeeType] = useState(initialValue?.type || 'fixed');
  const [fixedFee, setFixedFee] = useState(initialValue?.type === 'fixed' ? initialValue.value : '');
  const [variableFee, setVariableFee] = useState(initialValue?.type === 'variable' ? initialValue.value : '');

  useEffect(() => {
    setFeeType(initialValue?.type || 'fixed');
    setFixedFee(initialValue?.type === 'fixed' ? initialValue.value : '');
    setVariableFee(initialValue?.type === 'variable' ? initialValue.value : '');
  }, [initialValue, open]);

  const handleConfirm = () => {
    const value = feeType === 'fixed'
      ? { type: 'fixed', value: fixedFee }
      : { type: 'variable', value: variableFee };
    onConfirm(value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ padding: '20px 24px 16px', fontSize: 18 }}>관리비 설정</DialogTitle>
      <DialogContent>
        <FormBox>
          <CustomToggleButtonGroup
            value={feeType}
            exclusive
            onChange={(_, val) => val && setFeeType(val)}
            aria-label="관리비 타입"
            fullWidth
          >
            <ToggleButton value="fixed">고정</ToggleButton>
            <ToggleButton value="variable">변동</ToggleButton>
          </CustomToggleButtonGroup>
        </FormBox>
        <FormBox sx={{ mt: 1 }}>
          {feeType === 'fixed' ? (
            <CustomTextField
              type="number"
              value={fixedFee}
              onChange={e => setFixedFee(e.target.value.replace(/[^0-9]/g, ''))}
              InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
              sx={{ width: 160 }}
              placeholder="관리비 입력"
              autoFocus
            />
          ) : (
            <CustomTextField
              type="text"
              value={variableFee}
              onChange={e => setVariableFee(e.target.value)}
              sx={{ width: 160 }}
              placeholder="예: 세대별 사용량 비례, 세대수 비례"
              autoFocus
            />
          )}
        </FormBox>
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px 20px' }}>
        <Button variant="outlined" size="small" onClick={onClose}>취소</Button>
        <Button 
          variant="contained" 
          size="small"
          onClick={handleConfirm}
          disabled={
            (feeType === 'fixed' && !fixedFee) ||
            (feeType === 'variable' && !variableFee)
          }
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManagementFeeDialog;