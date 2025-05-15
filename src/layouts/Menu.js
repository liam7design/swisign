import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItemButton, 
  IconButton, 
  Typography,
  Box,
  Button,
  styled
} from '@mui/material';
import Banner from '../components/ui/Banner';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore, ChevronRight } from '@mui/icons-material';

import { AuthContext } from '../context/AuthContext';

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
  height: '100%',
  overflowY: 'auto'
}));

const Menu1Depth = styled(ListItemButton)(({ theme }) => ({
  padding: '16px',
  '& .MuiListItemText-root': {
    margin: 0
  },
  '& .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 500,
  }
}));

const Menu2Depth = styled(MenuItem)(({ theme }) => ({
  padding: '0 16px 0 32px',
  '& .MuiTypography-root': {
    fontSize: '15px'
  }
}));

const MenuListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '0 !important'
}));

const menuItems = [
  { name: '전자계약 작성', path: '/Contract' },
  {
    name: '스윗 정보',
    children: [
      { name: '공지사항', path: '/NoticeList' },
      { name: 'NEWS', path: '/NewsList' },
      { name: '유튜브', path: '/YoutubeList' }
    ]
  },
  {
    name: '임차인',
    children: [
      { name: 'REPORT(MONTH)', path: '/' },
      { name: '전세사기체크', path: '/SafetyCheckList' },
      { name: '주변 시세', path: '/MarketPrice' },
      { name: '등기부등본 조회', path: '/' },
      { name: '중개인 조회', path: '/' }
    ]
  },
  {
    name: '임대인',
    children: [
      { name: '임대관리', path: '/RentalManagement' },
      { name: '매물등록 요청', path: '/SaleRequest' },
      { name: '주변 시세', path: '/MarketPrice' },
    ]
  },
  {
    name: '중개인',
    children: [
      { name: '매물요청 현황', path: '/SaleList' },
      { name: '방문일정 현황', path: '/ScheduleList' },
      { name: '주변 시세', path: '/MarketPrice' },
      { name: '계약관리', path: '/MarketPrice' },
    ]
  },
  {
    name: '미정',
    children: [
      { name: '지도 검색', path: '/MapSearch' },
      { name: '주요 변동정보', path: '/ChangeInfoList' },
      { name: '공인중개사 공제증서 확인', path: '/CertificateCheck' },
      { name: '전자계약서', path: '/Contract' },
      { name: '지역매물', path: '/LocalSaleList' },
      { name: '로그인', path: '/Login' },
    ]
  },
  { name: '테스트', path: '/' },
  { name: '테스트', path: '/' },
  { name: '테스트', path: '/' },
];

const Menu = ({ open, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (menuName, event) => {
    event.stopPropagation();
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const renderMenu = (items) => {
    return items.map((item, index) => (
      <div key={index}>
        <Menu1Depth
          component={!item.children ? Link : 'div'}
          to={!item.children ? item.path : undefined}
          onClick={(event) => {
            if (item.children) {
              handleToggle(item.name, event);
            } else {
              onClose(event);
            }
          }}
        >
          <ListItemText primary={item.name} />
          <MenuListItemIcon>
            {item.children ? (
              openMenus[item.name] ? <ExpandLess color="primary" fontSize="small" /> : <ExpandMore color="primary" fontSize="small" />
            ) : (
              <ChevronRight color="primary" fontSize="small" />
            )}
          </MenuListItemIcon>
        </Menu1Depth>
        {item.children && (
          <Collapse in={openMenus[item.name]} timeout="auto" unmountOnExit>
            <MenuList disablePadding>
              {item.children.map((child, childIndex) => (
                <Menu2Depth
                  key={childIndex}
                  component={Link}
                  to={child.path}
                  onClick={onClose}
                >
                  <ListItemText primary={child.name} />
                  <MenuListItemIcon>
                    <ChevronRight fontSize="small" />
                  </MenuListItemIcon>
                </Menu2Depth>
              ))}
            </MenuList>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <MenuDrawer anchor="left" open={open} onClose={onClose}>
      <MenuTopBox>
        <Typography variant="h2" sx={{ flexGrow: 1, fontSize: '1.125rem', fontWeight: 500 }}>SWISIGN</Typography>
        <IconButton color="inherit" aria-label="Settings" href="/Settings"><SettingsOutlinedIcon /></IconButton>
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
      <Box sx={{ position: 'relative', minHeight: '24px' }}>
        {/* 그라데이션 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -24,
            height: 24,
            // pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
            zIndex: 9
          }}
        />
      </Box>
      <MenuContent>
        <MenuList disablePadding>
          {renderMenu(menuItems)}
        </MenuList>
      </MenuContent>
      <Box sx={{ position: 'relative', padding: '24px 16px' }}>
        {/* 그라데이션 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -24,
            height: 24,
            // pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
            zIndex: 9
          }}
        />
        <Banner />
      </Box>
    </MenuDrawer>
  );
};

export default Menu;