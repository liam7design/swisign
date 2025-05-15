import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  IconButton,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { KakaoIcon, NaverIcon, GoogleIcon, AppleIcon } from '../assets/icons/SvgIcons';
import { AuthContext } from '../context/AuthContext';
import userData from '../data/UserData.json';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  // 유효성 검사 함수
  const validate = () => {
    let valid = true;
    let newErrors = { username: '', password: '' };

    if (!form.username.trim()) {
      newErrors.username = '아이디를 입력하세요.';
      valid = false;
    }
    if (!form.password) {
      newErrors.password = '비밀번호를 입력하세요.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  // 로그인 버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const foundUser = userData.find(user => 
        user.id === form.username && 
        user.pw === form.password
      );
      
      if (foundUser) {
        login(foundUser);
        navigate('/');
      } else {
        setErrors({ 
          username: ' ', 
          password: '아이디 또는 비밀번호가 틀렸습니다' 
        });
      }
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const snsIconButtonStyle = {
    width: '48px',
    height: '48px',
    borderRadius: 2
  };

  return (
    <main>
      <Container sx={{ maxWidth: 480, pt: 6, pb: { xs: 4, sm: 6 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src="/logo_swisign.png" alt="로고" width={120} height={100} />
        </Box>
        <Typography variant="h5" align="center" sx={{ mb: 4, fontWeight: 500 }}>
          안전한 계약관리, 스윗싸인
        </Typography>
        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={1}>
            <TextField
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
              autoComplete="username"
            />
            <TextField
              label="비밀번호"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ height: 56, mt: 1, fontSize: 18, fontWeight: 500 }}
              fullWidth
            >
              로그인
            </Button>
          </Stack>
        </form>
        <Divider sx={{ mt: 5, mb: 3, fontSize: 14, color: 'text.secondary' }}>간편로그인</Divider>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <IconButton
            aria-label="카카오계정으로 로그인"
            sx={{ 
              ...snsIconButtonStyle, 
              backgroundColor: '#FEE500',
              '&:hover': { backgroundColor: '#FEE500' }
            }}
            // onClick={...}
          >
            <KakaoIcon />
          </IconButton>
          <IconButton
            aria-label="네이버계정으로 로그인"
            sx={{ 
              ...snsIconButtonStyle, 
              backgroundColor: '#03C75A',
              '&:hover': { backgroundColor: '#03C75A' }
            }}
            // onClick={...}
          >
            <NaverIcon />
          </IconButton>
          <IconButton
            aria-label="구글계정으로 로그인"
            sx={{ 
              ...snsIconButtonStyle, 
              backgroundColor: '#FFFFFF',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
              '&:hover': { backgroundColor: '#FFFFFF' }
            }}
            // onClick={...}
          >
            <GoogleIcon />
          </IconButton>
          <IconButton
            aria-label="애플계정으로 로그인"
            sx={{ 
              ...snsIconButtonStyle, 
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#000000' }
            }}
            // onClick={...}
          >
            <AppleIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
          <Link href="#" underline="hover" variant="body2">
            회원가입
          </Link>
          <Typography variant="body2" color="text.secondary">|</Typography>
          <Link href="#" underline="hover" variant="body2">
            아이디/비밀번호찾기
          </Link>
        </Stack>
      </Container>
    </main>
  );
}

export default Login;