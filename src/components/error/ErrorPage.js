import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography, Button, styled } from '@mui/material';

const ErrorWrap = styled(Stack)(({ theme }) => ({
  height: 'calc(100vh - 80px)',
  padding: '40px',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiTypography-root': {
    wordBreak: 'keep-all'
  }
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16
}));

const ButtonWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  marginTop: 40,
  '& .MuiButton-root': {
    whiteSpace: 'nowrap',
  }
}));

const ErrorPage = ({
  onClick1,
  onClick2,
  btn1 = '메인',
  btn2 = '이전페이지',
  title,
  message,
  icon,
  iconColor = 'primary'
}) => {
  const navigate = useNavigate();
  const handleOnClick1 = onClick1 || (() => navigate('/'));
  const handleOnClick2 = onClick2 || (() => navigate(-1));

  return (
    <ErrorWrap>
      {icon && (
        <IconBox>
          {React.cloneElement(icon, {
            color: iconColor,
            sx: {
              fontSize: 80,
              ...icon.props.sx,
            },
          })}
        </IconBox>
      )}
      {title && <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>}
      {message && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{message}</Typography>}
      <ButtonWrap>
        {onClick2 !== false && <Button variant="outlined" size="large" onClick={handleOnClick2} fullWidth>{btn2}</Button>}
        {onClick1 !== false && <Button variant="contained" size="large" onClick={handleOnClick1} fullWidth>{btn1}</Button>}
      </ButtonWrap>
    </ErrorWrap>
  );
};

ErrorPage.propTypes = {
  onClick1: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClick2: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  btn1: PropTypes.string,
  btn2: PropTypes.string,
  title: PropTypes.node,
  message: PropTypes.node,
  icon: PropTypes.node,
  iconColor: PropTypes.string
};

export default ErrorPage;