import React, { useState, useEffect } from 'react';
import {
  Box,
  ToggleButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import { FormBox, CustomToggleButtonGroup, CustomTextField, EndAdornment } from './FormStyle';
import { LocalizationProvider, DatePicker  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import ManagementFeeDialog from './ManagementFeeDialog';

const SaleConditionForm = ({ onChange }) => {
  const [condition, setCondition] = useState('전세');
  const [deposit, setDeposit] = useState('');
  const [rent, setRent] = useState('');
  const [mgmtFeeDialogOpen, setMgmtFeeDialogOpen] = useState(false);
  const [mgmtFee, setMgmtFee] = useState({ type: null, value: '' });
  const [parking, setParking] = useState('불가능');
  const [parkingFee, setParkingFee] = useState('');
  const [loanAvailable, setLoanAvailable] = useState(false);
  const [moveInDate, setMoveInDate] = useState(null);
  const [etc, setEtc] = useState('');

  useEffect(() => {
    if (onChange) {
      onChange({
        condition,
        deposit,
        rent,
        hasMgmtFee: !!mgmtFee.type,
        mgmtFeeType: mgmtFee.type,
        mgmtFeeValue: mgmtFee.value,
        parking,
        parkingFee,
        loanAvailable,
        moveInDate,
        etc
      });
    }
  }, [condition, deposit, rent, mgmtFee, parking, parkingFee, loanAvailable, moveInDate, etc, onChange]);

  return (
    <>
      {/* 거래방법 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>거래방법</Typography>
        <FormBox>
          <CustomToggleButtonGroup
            value={condition}
            exclusive
            onChange={(_, val) => val && setCondition(val)}
            aria-label="거래방법"
          >
            <ToggleButton value="전세">전세</ToggleButton>
            <ToggleButton value="월세">월세</ToggleButton>
          </CustomToggleButtonGroup>
        </FormBox>
      </Box>

      {/* 보증금(전세금)/월세 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>보증금(전세금)/월세</Typography>
        <FormBox>
          <CustomTextField
            type="number"
            value={deposit}
            onChange={e => setDeposit(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            placeholder='보증금(전세금)'
          />
          /
          <CustomTextField
            type="number"
            value={rent}
            onChange={e => setRent(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            disabled={condition === '전세'}
            placeholder='월세'
          />
        </FormBox>
      </Box>

      {/* 관리비(월 차임) */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>관리비(월 차임)</Typography>
        <FormBox sx={{ flexDirection: 'column', gap: 1 }}>
          <CustomToggleButtonGroup
            value={mgmtFee.type ? '있음' : '없음'}
            exclusive
            onChange={(_, val) => {
              if(val === '있음') {
                setMgmtFeeDialogOpen(true);
              } else {
                setMgmtFee({ type: null, value: '' });
              }
            }}
            fullWidth
          >
            <ToggleButton value="없음">없음</ToggleButton>
            <ToggleButton value="있음">있음</ToggleButton>
          </CustomToggleButtonGroup>
          {mgmtFee.type && (
            <CustomTextField
              type={mgmtFee.type === 'fixed' ? 'number' : 'text'}
              value={mgmtFee.value}
              InputProps={{
                endAdornment: mgmtFee.type === 'fixed'
                  ? <EndAdornment>만원</EndAdornment>
                  : undefined,
                readOnly: true,
              }}
              onClick={() => setMgmtFeeDialogOpen(true)}
              fullWidth
            />
          )}
        </FormBox>
      </Box>
      {/* 다이얼로그 추가 */}
      <ManagementFeeDialog
        open={mgmtFeeDialogOpen}
        onClose={() => setMgmtFeeDialogOpen(false)}
        onConfirm={(value) => setMgmtFee(value)}
        initialValue={{
          type: mgmtFee.type,
          [mgmtFee.type]: mgmtFee.value
        }}
      />

      {/* 주차 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>주차</Typography>
        <FormBox>
          <CustomToggleButtonGroup
            value={parking}
            exclusive
            onChange={(_, val) => setParking(val)}
            fullWidth
          >
            <ToggleButton value="불가능">불가능</ToggleButton>
            <ToggleButton value="가능">가능</ToggleButton>
          </CustomToggleButtonGroup>
          <CustomTextField
            type="number"
            value={parkingFee}
            onChange={e => setParkingFee(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            disabled={parking !== '가능'}
            placeholder='주차비'
          />
        </FormBox>
      </Box>

      {/* 대출가능여부 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>대출가능여부</Typography>
        <FormBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={loanAvailable}
                onChange={e => setLoanAvailable(e.target.checked)}
              />
            }
            label="대출가능"
          />
        </FormBox>
      </Box>

      {/* 입주가능일 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>입주가능일</Typography>
        <FormBox>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            <DatePicker
              value={moveInDate}
              onChange={setMoveInDate}
              inputFormat="yyyy년 MM월 dd일"
              slotProps={{
                calendarHeader: { format: 'yyyy년 M월' },
                textField: {
                  sx: {
                    '& input': {
                      height: 42,
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </FormBox>
      </Box>

      {/* 기타 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>기타</Typography>
        <FormBox>
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="위의 내용과 별도로 추가 정보에 대해서 기입해주세요."
            value={etc}
            onChange={e => setEtc(e.target.value)}
          />
        </FormBox>
      </Box>
    </>
  );
}

export default SaleConditionForm;