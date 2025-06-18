import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputForm from '../../../form/InputForm';

const LessorInfoForm = ({ control, errors }) => {
  
  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>성명</Typography>
        <Controller 
          name="lessorName" 
          control={control} 
          rules={{ required: '성명을 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lessorName}
              helperText={errors.lessorName?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>전화번호</Typography>
        <Controller 
          name="lessorPhone" 
          control={control} 
          rules={{ required: '전화번호를 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lessorPhone}
              helperText={errors.lessorPhone?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>주민번호</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Controller 
            name="lessorRrn1" 
            control={control} 
            rules={{ required: '주민번호 앞자리를 입력하세요.', pattern: { value: /^\d{6}$/, message: '6자리 숫자를 입력하세요.' } }}
            render={({ field }) => (
              <InputForm
                {...field}
                error={!!errors.lessorRrn1}
                helperText={errors.lessorRrn1?.message}
                size="small"
              />
            )}
          />
          <span>-</span>
          <Controller 
            name="lessorRrn2" 
            control={control} 
            rules={{ required: '주민번호 뒷자리를 입력하세요.', pattern: { value: /^\d{7}$/, message: '7자리 숫자를 입력하세요.' } }}
            render={({ field }) => (
              <InputForm
                {...field}
                type="password"
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,7}$/.test(val)) field.onChange(val);
                }}
                error={!!errors.lessorRrn2}
                helperText={errors.lessorRrn2?.message}
                size="small"
              />
            )}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>입금은행</Typography>
        <Controller 
          name="lessorBank" 
          control={control} 
          rules={{ required: '은행명을 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lessorBank}
              helperText={errors.lessorBank?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>계좌번호</Typography>
        <Controller 
          name="lessorAccount" 
          control={control} 
          rules={{ required: '계좌번호를 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lessorAccount}
              helperText={errors.lessorAccount?.message}
              size="small"
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default LessorInfoForm;