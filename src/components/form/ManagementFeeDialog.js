import React, { useState, useEffect } from 'react';
import { ToggleButton } from '@mui/material';
import { FormBox, CustomToggleButtonGroup, CustomTextField, EndAdornment } from './FormStyle';
import CustomDialog from '../ui/CustomDialog';

// PropTypes 추가 (타입 안전성 보강)
import PropTypes from 'prop-types';

const ManagementFeeDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  initialValue
}) => {
  // 입력값 유효성 검증을 위한 상태
  const [feeType, setFeeType] = useState(initialValue?.type === 'variable' ? 'variable' : 'fixed');
  const [fixedFee, setFixedFee] = useState(
    initialValue?.type === 'fixed' && typeof initialValue.value === 'string'
      ? initialValue.value
      : ''
  );
  const [variableFee, setVariableFee] = useState(
    initialValue?.type === 'variable' && typeof initialValue.value === 'string'
      ? initialValue.value
      : ''
  );
  const [error, setError] = useState('');

  // 상태 동기화
  useEffect(() => {
    setFeeType(initialValue?.type === 'variable' ? 'variable' : 'fixed');
    setFixedFee(
      initialValue?.type === 'fixed' && typeof initialValue.value === 'string'
        ? initialValue.value
        : ''
    );
    setVariableFee(
      initialValue?.type === 'variable' && typeof initialValue.value === 'string'
        ? initialValue.value
        : ''
    );
    setError('');
  }, [initialValue, open]);

  // 입력값 검증 함수
  const validate = () => {
    if (feeType === 'fixed') {
      if (!fixedFee || isNaN(fixedFee) || Number(fixedFee) <= 0) {
        setError('고정 관리비는 1 이상의 숫자를 입력하세요.');
        return false;
      }
    } else if (feeType === 'variable') {
      if (!variableFee || variableFee.trim().length < 2) {
        setError('변동 관리비 설명을 2자 이상 입력하세요.');
        return false;
      }
    }
    setError('');
    return true;
  };

   // 확인 버튼 클릭 시
   const handleConfirm = () => {
    if (!validate()) return;
    const value =
      feeType === 'fixed'
        ? { type: 'fixed', value: fixedFee }
        : { type: 'variable', value: variableFee };
    onConfirm(value);
    onClose();
  };

  // 입력값 변경 핸들러
  const handleFixedFeeChange = (e) => {
    setFixedFee(e.target.value.replace(/[^0-9]/g, ''));
    setError('');
  };
  const handleVariableFeeChange = (e) => {
    setVariableFee(e.target.value);
    setError('');
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
            onChange={handleFixedFeeChange}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 160 }}
            placeholder="관리비 입력"
            autoFocus={feeType === 'fixed'}
            error={!!error && feeType === 'fixed'}
            helperText={feeType === 'fixed' ? error : ''}
          />
        ) : (
          <CustomTextField
            type="text"
            value={variableFee}
            onChange={handleVariableFeeChange}
            sx={{ width: 160 }}
            placeholder="예: 세대별 사용량 비례, 세대수 비례"
            autoFocus={feeType === 'variable'}
            error={!!error && feeType === 'variable'}
            helperText={feeType === 'variable' ? error : ''}
          />
        )}
      </FormBox>
    </CustomDialog>
  );
};

export default ManagementFeeDialog;