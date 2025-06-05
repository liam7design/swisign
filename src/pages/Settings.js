import React, { useContext } from 'react';
import { Box, Button, Typography, Switch, FormControlLabel, Divider, Avatar, styled } from '@mui/material';
import SubpageLayout from '../layouts/SubpageLayout';
import RenderMenu from '../components/ui/RenderMenu';
import { AuthContext } from '../context/AuthContext';

const UserInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: 16,
}));

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

const SettingMenu1 = [
  { "name": "로그인 관리", "path": "/login-management" },
  { "name": "비밀번호 변경", "path": "/password-management" }
]
const SettingMenu2 = [
  { "name": "약관 및 개인정보 처리방침" },
  { "name": "권한관리" },
  { "name": "오픈소스 라이센스" }
]

const Settings = () => {
  const { user } = useContext(AuthContext);

  return (
    <SubpageLayout containerSx={{ p: 0, pt: 0 }}>
      {user &&
        <UserInfoBox>
          <Avatar
            alt={user.name}
            src={user.photo}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>{user.nickname}</Typography>
          </Box>
          <Button href="/privacy-management" variant="outlined" size="small" sx={{ ml: 'auto', fontSize: '12px', lineHeight: 1.2 }}>개인정보변경</Button>
        </UserInfoBox>
      }
      <CustomDivider sx={{ mt: 0 }} />
      <CustomMenu>
        <Typography>알림관리</Typography>
        <FormControlLabel
          control={<CustomSwitch defaultChecked />}
          sx={{ m: 0 }}
        />
      </CustomMenu>
      <RenderMenu data={SettingMenu1} />
      <CustomDivider />
      <CustomMenu>
        <Typography>앱버전</Typography>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1 
        }}>
          <Typography variant="body2" sx={{ color: '#999' }}>12.05 버전</Typography>
          <Button variant="outlined" size="small" sx={{ fontSize: '12px', lineHeight: 1.2 }}>업데이트</Button>
        </Box>
      </CustomMenu>
      <RenderMenu data={SettingMenu2} />
    </SubpageLayout>
  )
}

export default Settings;