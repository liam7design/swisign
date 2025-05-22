import React, { useContext } from 'react';
import {
  Drawer, 
  IconButton, 
  Typography,
  Box,
  Button,
  styled
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { ChevronRight } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import Banner from '../components/ui/Banner';
import RenderMenu from '../components/ui/RenderMenu';
import GradientOverlay from '../components/ui/GradientOverlay';
import MenuData from '../data/MenuData.json';

const MenuDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative'
  }
}));

const MenuTopBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  minHeight: '56px',
  padding: '0 16px',
  borderBottom: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.background.default,
  boxSizing: 'border-box'
}));

const MenuContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'calc(100% - 24px)',
  padding: '12px 0',
  overflowY: 'auto'
}));

const Menu = ({ open, onClose }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <MenuDrawer anchor="left" open={open} onClose={onClose}>
      <MenuTopBox>
        <Typography variant="h2" sx={{ flexGrow: 1, fontSize: '1.125rem', fontWeight: 500 }}>SWISIGN</Typography>
        {user &&
          <IconButton color="inherit" aria-label="Settings" href="/Settings"><SettingsOutlinedIcon /></IconButton>
        }
        <IconButton edge="end" color="inherit" aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </MenuTopBox>
      <MenuTopBox>
        {user ? (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user.name}님</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12 }}>(최근 로그인 2025.05.11)</Typography>
            <Button 
              variant="outlined"
              size="small"
              onClick={logout}
              sx={{ ml: 'auto', lineHeight: 'unset' }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Button 
            variant="outlined"
            href="/login"
            endIcon={<ChevronRight color="primary" fontSize="small" />}
            sx={{ p: 0, border: 'unset', '&:hover': { background: 'transparent;'} }}
            disableRipple
          >
            로그인 하세요
          </Button>
        )}
      </MenuTopBox>
      <GradientOverlay pos="top" />
      <MenuContent>
        <RenderMenu
          data={MenuData}
          onClose={onClose}
        />
      </MenuContent>
      <GradientOverlay pos="bottom" />
      <Box sx={{ padding: '24px 16px' }}>
        <Banner />
      </Box>
    </MenuDrawer>
  );
};

export default Menu;