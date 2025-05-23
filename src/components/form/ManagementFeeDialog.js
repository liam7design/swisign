import React, { useState, useEffect } from 'react';
import { ToggleButton } from '@mui/material';
import { FormBox, CustomToggleButtonGroup, CustomTextField, EndAdornment } from './FormStyle';
import CustomDialog from '../ui/CustomDialog';

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
    <CustomDialog
      open={open}
      onClose={onClose}
      onClick1={handleConfirm}
      disabled={
        (feeType === 'fixed' && !fixedFee) ||
        (feeType === 'variable' && !variableFee)
      }
      onClick2={onClose}
      title="관리비 설정"
    >
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
    </CustomDialog>
  );
};

export default ManagementFeeDialog;