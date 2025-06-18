import React from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputForm from '../../../form/InputForm';

const LesseeInfoForm = ({ 
  control, 
  errors, 
  onAddressSearch,
  zipcode, setZipcode,
  address, setAddress,
  addressDetail, setAddressDetail,
  handleSearchZip,
}) => {

  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>성명</Typography>
        <Controller 
          name="lessorNalesseeNameme" 
          control={control} 
          rules={{ required: '성명을 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lesseeName}
              helperText={errors.lesseeName?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>전화번호</Typography>
        <Controller 
          name="lesseePhone" 
          control={control} 
          rules={{ required: '전화번호를 입력해주세요.' }}
          render={({ field }) => (
            <InputForm
              {...field}
              error={!!errors.lesseePhone}
              helperText={errors.lesseePhone?.message}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>주민번호</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Controller 
            name="lesseeRrn1" 
            control={control} 
            rules={{ required: '주민번호 앞자리를 입력하세요.', pattern: { value: /^\d{6}$/, message: '6자리 숫자를 입력하세요.' } }}
            render={({ field }) => (
              <InputForm
                {...field}
                error={!!errors.lesseeRrn1}
                helperText={errors.lesseeRrn1?.message}
                size="small"
              />
            )}
          />
          <span>-</span>
          <Controller 
            name="lesseeRrn2" 
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
                error={!!errors.lesseeRrn2}
                helperText={errors.lesseeRrn2?.message}
                size="small"
              />
            )}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={inputTitleSx}>주소</Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Controller 
              name="lesseeZipCode" 
              control={control} 
              rules={{ required: '우편번호를 검색해주세요.' }}
              render={({ field }) => (
                <InputForm
                  {...field}
                  value={zipcode}
                  InputProps={{
                    readOnly: true
                  }}
                  error={!!errors.lesseeZipCode}
                  helperText={errors.lesseeZipCode?.message}
                  size="small"
                />
              )}
            />
            <Button
              variant="contained"
              onClick={handleSearchZip}
              sx={{ minWidth: 120 }}
            >
              우편번호 검색
            </Button>
          </Stack>
          <Controller 
            name="lesseeBaseAddress" 
            control={control}
            render={({ field }) => (
              <InputForm
                {...field}
                value={address}
                InputProps={{
                  readOnly: true
                }}
                size="small"
              />
            )}
          />
          <Controller 
            name="lesseeDetailAddress" 
            control={control} 
            rules={{ required: '상세주소를 입력해주세요.' }}
            render={({ field }) => (
              <InputForm
                {...field}
                value={addressDetail}
                onChange={e => setAddressDetail(e.target.value)}
                error={!!errors.lesseeDetailAddress}
                helperText={errors.lesseeDetailAddress?.message}
                size="small"
              />
            )}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default LesseeInfoForm;
