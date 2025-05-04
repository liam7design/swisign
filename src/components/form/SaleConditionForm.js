import React, { useState, useEffect } from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  styled
} from '@mui/material';
import { LocalizationProvider, DatePicker  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  width: '100%',
  alignItems: 'center',
  '& > *': {
    flex: 1,
    minWidth: 0,
  },
}));

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: 48,
  '& > *': {
    flex: 1,
    maxWidth: 'none',
    height: 48,
    fontSize: 16,
    whiteSpace: 'nowrap'
  },
}));

const NumberTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 48,
    boxSizing: 'border-box',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
    paddingTop: 12.5,
    paddingBottom: 12.5,
    textAlign: 'right'
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

const EndAdornment = styled('span')({
  paddingLeft: '8px',
  fontSize: 14,
  whiteSpace: 'nowrap'
});

const PhotoUploadGrid = ({ onChange }) => {
  const [condition, setCondition] = useState('전세');
  const [deposit, setDeposit] = useState('');
  const [rent, setRent] = useState('');
  const [hasMgmtFee, setHasMgmtFee] = useState(false);
  const [mgmtFee, setMgmtFee] = useState('');
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
        hasMgmtFee,
        mgmtFee,
        parking,
        parkingFee,
        loanAvailable,
        moveInDate,
        etc
      });
    }
  }, [condition, deposit, rent, hasMgmtFee, mgmtFee, parking, parkingFee, loanAvailable, moveInDate, etc, onChange]);

  return (
    <>
      {/* 거래조건 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>거래조건</Typography>
        <FormBox>
          <CustomToggleButtonGroup
            value={condition}
            exclusive
            onChange={(_, val) => val && setCondition(val)}
            aria-label="거래조건"
          >
            <ToggleButton value="전세">전세</ToggleButton>
            <ToggleButton value="월세">월세</ToggleButton>
          </CustomToggleButtonGroup>
        </FormBox>
      </Box>

      {/* 보증금/월세 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>보증금/월세</Typography>
        <FormBox>
          <NumberTextField
            type="number"
            value={deposit}
            onChange={e => setDeposit(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
          />
          /
          <NumberTextField
            type="number"
            value={rent}
            onChange={e => setRent(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            disabled={condition === '전세'}
          />
        </FormBox>
      </Box>

      {/* 관리비 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>관리비</Typography>
        <FormBox>
          <CustomToggleButtonGroup
            value={hasMgmtFee ? '있음' : '없음'}
            exclusive
            onChange={(_, val) => setHasMgmtFee(val === '있음')}
            fullWidth
          >
            <ToggleButton value="없음">없음</ToggleButton>
            <ToggleButton value="있음">있음</ToggleButton>
          </CustomToggleButtonGroup>
          <NumberTextField
            type="number"
            value={mgmtFee}
            onChange={e => setMgmtFee(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            disabled={!hasMgmtFee}
          />
        </FormBox>
      </Box>

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
          <NumberTextField
            type="number"
            value={parkingFee}
            onChange={e => setParkingFee(e.target.value.replace(/[^0-9]/g, ''))}
            InputProps={{ endAdornment: <EndAdornment>만원</EndAdornment> }}
            sx={{ width: 140 }}
            disabled={parking !== '가능'}
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

export default PhotoUploadGrid;