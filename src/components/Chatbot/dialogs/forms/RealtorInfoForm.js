import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputForm from '../../../form/InputForm';

const RealtorInfoForm = ({ control, errors }) => {

  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };
  
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>사무소 명칭</Typography>
        <Controller 
          name="realtorOfficeName" 
          control={control} 
          rules={{ required: '사무소 명칭을 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.realtorOfficeName}
              helperText={errors.realtorOfficeName?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>사무소 소재지</Typography>
        <Controller 
          name="realtorOfficeAddress" 
          control={control} 
          rules={{ required: '사무소 소재지를 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.realtorOfficeAddress}
              helperText={errors.realtorOfficeAddress?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>대표명</Typography>
        <Controller 
          name="realtorRepName" 
          control={control} 
          rules={{ required: '대표명을 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.realtorRepName}
              helperText={errors.realtorRepName?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>등록번호</Typography>
        <Controller 
          name="realtorRegNum" 
          control={control} 
          rules={{ required: '등록번호를 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.realtorRegNum}
              helperText={errors.realtorRegNum?.message}
              size="small"
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default RealtorInfoForm;
