import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider, styled } from '@mui/material';
import SubpageLayout from '../layouts/SubpageLayout';

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: '12px 0',
  borderBottom: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
}));

const CustomMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '12px 16px',
  '& > .MuiTypography-root': {
    fontSize: 16,
    fontWeight: 500
  }
}));

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    opacity: 0.2
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      color: '#fff'
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    opacity: 1
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 18,
    height: 18,
    margin: 2
  },
}));

const LoginManagement = () => {
  return (
    <SubpageLayout containerSx={{ p: 0, pt: 0 }}>
      <Typography variant="subtitle2" sx={{ mt: 1.5, padding: '12px 16px 8px', color: '#555', fontWeight: 500 }}>로그인 방식</Typography>
      <CustomMenu>
        <Typography>아이디/비밀번호</Typography>
        <FormControlLabel
          control={<CustomSwitch />}
          sx={{ m: 0 }}
        />
      </CustomMenu>
      <CustomMenu>
        <Typography>Face ID</Typography>
        <FormControlLabel
          control={<CustomSwitch />}
          sx={{ m: 0 }}
        />
      </CustomMenu>
      <CustomMenu>
        <Typography>지문인식</Typography>
        <FormControlLabel
          control={<CustomSwitch />}
          sx={{ m: 0 }}
        />
      </CustomMenu>
      <CustomDivider />
      <Typography variant="subtitle2" sx={{ padding: '12px 16px 8px', color: '#555', fontWeight: 500 }}>자동 로그인</Typography>
      <CustomMenu>
        <Typography>자동로그인 하기</Typography>
        <FormControlLabel
          control={<CustomSwitch />}
          sx={{ m: 0 }}
        />
      </CustomMenu>
    </SubpageLayout>
  )
}

export default LoginManagement;