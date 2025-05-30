import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { FloatingBox, FloatingButton } from '../ui/FloatingButton';
import InputForm from '../form/InputForm';

function StepPhone({
  phone, 
  setPhone, 
  sent, 
  handleSendCode,
  code, 
  setCode, 
  codeChecked, 
  handleCodeCheck,
  verified, 
  handleVerifyComplete
}) {

  // 스타일
  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>스윗싸인은 계정으로 사용할 핸드폰 인증이 필요해요.</Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>휴대폰 번호</Typography>
          <Stack direction="row" spacing={1}>
            <InputForm
              placeholder="휴대폰 번호"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
              disabled={sent}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSendCode}
              disabled={sent}
              sx={{ minWidth: 86 }}
            >
              인증요청
            </Button>
          </Stack>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>인증번호</Typography>
          <Stack direction="row" spacing={1}>
            <InputForm
              placeholder="인증번호 6자리를 입력해주세요."
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              disabled={!sent || verified}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCodeCheck}
              disabled={!sent || verified || code.length === 0}
              sx={{ minWidth: 86 }}
            >
              확인
            </Button>
          </Stack>
        </Box>
      </Stack>
      <FloatingBox>
        <FloatingButton variant="contained" label="인증 완료" onClick={handleVerifyComplete} disabled={!codeChecked || verified} />
      </FloatingBox>
    </>
  );
}

export default StepPhone;