import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { setDate, add, sub } from 'date-fns';
import InputForm from '../../../form/InputForm';

const formatNumber = (value) => {
  if (!value) return '';
  const num = value.toString().replace(/,/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ContractDetailsForm = ({ control, errors }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    sub(add(new Date(), { years: 2 }), { days: 1 })
  );
  const [value, setValue] = useState(setDate(new Date(), 1));
  
  useEffect(() => {
    // startDate가 유효한 날짜일 경우에만 실행
    if (startDate) {
      // date-fns의 add 함수로 2년 뒤 날짜를 계산
      const newEndDate = sub(add(startDate, { years: 2 }), { days: 1 });
      // 계약 종료일(endDate) 상태를 새로운 날짜로 업데이트
      setEndDate(newEndDate);
    }
  }, [startDate]);

  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>계약 시작일</Typography>
        <Controller 
          name="contractStart" 
          control={control} 
          rules={{ required: '계약 시작일을 선택해주세요.' }}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              format="yyyy년 MM월 dd일"
              slotProps={{
                calendarHeader: { format: 'yyyy년 M월' },
                textField: {
                  error: !!errors.contractStart,
                  helperText: errors.contractStart?.message,
                  fullWidth: true,
                  size: 'small'
                },
              }}
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>계약 종료일</Typography>
        <Controller 
          name="contractEnd" 
          control={control} 
          rules={{ required: '계약 종료일을 선택해주세요.' }}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              format="yyyy년 MM월 dd일"
              slotProps={{
                calendarHeader: { format: 'yyyy년 M월' },
                textField: {
                  error: !!errors.contractEnd,
                  helperText: errors.contractEnd?.message,
                  fullWidth: true,
                  size: 'small'
                },
              }}
            />
          )}
        />
      </Box>
      {[['deposit', '보증(전세)금'], ['monthlyRent', '월 차임'], ['managementFee', '관리비']].map(([name, label]) => (
        <Box key={name}>
          <Typography variant="subtitle2" sx={inputTitleSx}>{label}</Typography>
          <Controller 
            name={name}
            control={control} 
            rules={{ required: `${label}을(를) 입력해주세요.` }}
            render={({ field }) => (
              <InputForm
                {...field}
                onChange={e => field.onChange(formatNumber(e.target.value))}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment>}}
                inputProps={{ style: { textAlign: 'right' } }}
                size="small"
              />
            )}
          />
        </Box>
      ))}
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>월 차임 지급일</Typography>
        <Controller 
          name="rentPaymentDay" 
          control={control} 
          rules={{ required: '지급일을 선택해주세요.' }}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              format="매월 dd일"
              slotProps={{
                calendarHeader: { format: 'yyyy년 M월' },
                textField: {
                  error: !!errors.rentPaymentDay,
                  helperText: errors.rentPaymentDay?.message,
                  fullWidth: true,
                  size: 'small'
                },
              }}
              views={["day"]}
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default ContractDetailsForm;
