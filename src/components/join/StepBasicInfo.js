import React from "react";
import { Box, Typography, Button, IconButton, Divider, Stack, Link } from "@mui/material";
import { KakaoIcon, NaverIcon, GoogleIcon, AppleIcon } from '../../assets/icons/SvgIcons';
import InputForm from '../form/InputForm';

const snsIconButtonStyle = {
  width: '48px',
  height: '48px',
  borderRadius: 2
};

const StepBasicInfo = ({
  form, 
  setForm, 
  showPw, 
  setShowPw,
  selectedTypes, 
  canNext, 
  onJoinComplete
}) => {
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 스타일
  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>스윗싸인은 계정의 실제 이름과 비밀번호로 사용이 가능하세요.</Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>로그인 ID</Typography>
          <InputForm
            placeholder="로그인 ID"
            name="id"
            value={form.id}
            onChange={handleFormChange}
            size="small"
            autoFocus
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>이름</Typography>
          <InputForm
            placeholder="이름"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>비밀번호</Typography>
          <InputForm
            use="password"
            placeholder="비밀번호"
            name="pw"
            value={form.pw}
            onChange={handleFormChange}
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>비밀번호 확인</Typography>
          <InputForm
            use="password"
            placeholder="비밀번호 확인"
            name="pw2"
            value={form.pw2}
            onChange={handleFormChange}
            size="small"
          />
        </Box>
        {selectedTypes.includes("agent") &&
          <Box>
            <Typography variant="subtitle2" sx={inputTitleSx}>중개인번호</Typography>
            <InputForm
              placeholder="중개인번호"
              name="agentNo"
              value={form.agentNo}
              onChange={handleFormChange}
              size="small"
            />
          </Box>
        }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={!canNext}
          onClick={onJoinComplete}
        >
          회원가입 완료
        </Button>
      </Stack>
      <Divider sx={{ mt: 5, mb: 3, fontSize: 14, color: 'text.secondary' }}>간편회원가입</Divider>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton
          aria-label="카카오계정으로 회원가입"
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
          aria-label="네이버계정으로 회원가입"
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
          aria-label="구글계정으로 회원가입"
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
          aria-label="애플계정으로 회원가입"
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
        <Typography variant="body2" color="text.primary">이미 계정이 있으신가요?</Typography>
        <Link href="/login" underline="hover" variant="body2">
          로그인
        </Link>
      </Stack>
    </>
  );
}

export default StepBasicInfo;