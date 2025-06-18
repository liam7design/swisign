import React from 'react';
import { Stack, Box, Typography, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import InputForm from '../../../form/InputForm';

const formatNumber = (value) => {
  if (!value) return '';
  const num = value.toString().replace(/,/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PaymentDatesForm = ({ control, errors }) => {
  
  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <Stack spacing={2}>
      {[['downPayment', '계약금'], ['interimPayment', '중도금'], ['finalPayment', '잔금']].map(([name, label]) => (
        <React.Fragment key={name}>
          <Box>
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
          {name !== 'downPayment' && (
            <Box>
              <Typography variant="subtitle2" sx={inputTitleSx}>{label} 지급일</Typography>
              <Controller 
                name={`${name}Day`} 
                control={control} 
                rules={{ required: `${label} 지급일을 선택해주세요.` }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="yyyy년 MM월 dd일"
                    slotProps={{
                      calendarHeader: { format: 'yyyy년 M월' },
                      textField: {
                        error: !!errors[`${name}Day`],
                        helperText: errors[`${name}Day`]?.message,
                        fullWidth: true,
                        size: 'small'
                      },
                    }}
                  />
                )}
              />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default PaymentDatesForm;
