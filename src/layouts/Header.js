import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import { LikedIconOff, LikedIconOn } from '../assets/icons/SvgIcons';
import Menu from './Menu';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '0.063rem solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.background.default,
  boxShadow: 0,
}));

const HeaderTitle = styled(Typography)({
  flexGrow: 1, 
  fontSize: '1.125rem', 
  fontWeight: '500',
});

const Header = ({
  title,
  showBackButton = false,
  showCloseButton = false,
  showDetailButton = false,
  enableDrawer = false,
  customBackPath
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [likes, setLikes] = useState(false);
  const navigate = useNavigate();

  // 이벤트 객체가 없는 경우도 안전하게 처리
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleBack = () => {
    if (customBackPath) {
      navigate(customBackPath);
    } else {
      navigate(-1);
    }
  };

  const onLikeToggle = () => {
    setLikes(!likes);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ boxShadow: 0, color: 'text.primary' }}>
        <StyledToolbar>
          {!showBackButton && !showCloseButton && enableDrawer && (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
              <HeaderTitle variant="h2" sx={{ paddingLeft: '2.5rem'}}>{title}</HeaderTitle>
              <IconButton color="inherit" aria-label="login"><PersonOutlineIcon /></IconButton>
              <IconButton edge="end" color="inherit" aria-label="send"><SendOutlinedIcon /></IconButton>
            </>
          )}
          {showBackButton && !showDetailButton && (
            <>
              <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}><ArrowBackIcon /></IconButton>
              <HeaderTitle variant="h2" sx={{ paddingLeft: '0.25rem', textAlign: 'left' }} >{title}</HeaderTitle>
            </>
          )}
          {showBackButton && showDetailButton && (
            <>
              <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}><ArrowBackIcon /></IconButton>
              <HeaderTitle variant="h2" sx={{ paddingLeft: '0.25rem', textAlign: 'left' }} >{title}</HeaderTitle>
              <IconButton color="inherit" aria-label="Share"><ShareIcon /></IconButton>
              <IconButton edge="end" aria-label="like" onClick={onLikeToggle}>
                {likes ? <LikedIconOn stroke="black" /> : <LikedIconOff stroke="black" />}
              </IconButton>
            </>
          )}
          {showCloseButton && (
            <>
              <HeaderTitle variant="h2" sx={{ textAlign: 'left' }} >{title}</HeaderTitle>
              <IconButton edge="end" color="inherit" aria-label="close" onClick={handleBack}><CloseIcon /></IconButton>
            </> 
          )}
        </StyledToolbar>
      </AppBar>

      {enableDrawer && (
        <Menu open={drawerOpen} onClose={toggleDrawer(false)} />
      )}
      <Toolbar />
    </>
  );
};

export default Header;