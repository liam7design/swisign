import React, { useState, useContext } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import SubpageLayout from '../layouts/SubpageLayout';
import { AuthContext } from '../context/AuthContext';
import InputForm from '../components/form/InputForm';
import CustomDialog from '../components/ui/CustomDialog';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingButton';

const ChangePassword = () => {
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);

  // 기존 비밀번호
  const [currentPw, setCurrentPw] = useState('');
  const [currentPwError, setCurrentPwError] = useState('');

  // 새 비밀번호
  const [newPw, setNewPw] = useState('');
  const [newPwError, setNewPwError] = useState('');

  // 새 비밀번호 확인
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmPwError, setConfirmPwError] = useState('');

  // 알림창
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  // 1단계: 기존 비밀번호 확인
  const handleCheckCurrentPw = () => {
    if (!currentPw) {
      setCurrentPwError('비밀번호를 입력하세요.');
    } else if (currentPw !== user.pw) {
      setCurrentPwError('비밀번호가 정확하지 않습니다.');
    } else {
      setCurrentPwError('');
      setStep(2);
    }
  };

  // 2단계: 새 비밀번호 유효성 검사
  const validateNewPw = () => {
    let valid = true;
    if (!newPw) {
      setNewPwError('새 비밀번호를 입력하세요.');
      valid = false;
    } else if (newPw.length < 8) {
      setNewPwError('8자 이상 입력하세요.');
      valid = false;
    } else {
      setNewPwError('');
    }

    if (!confirmPw) {
      setConfirmPwError('비밀번호를 다시 입력하세요.');
      valid = false;
    } else if (newPw !== confirmPw) {
      setConfirmPwError('비밀번호가 일치하지 않습니다. 다시 확인하셔서 입력해 주세요.');
      valid = false;
    } else {
      setConfirmPwError('');
    }
    return valid;
  };

  // 2단계: 확인 버튼 클릭
  const handleChangePw = () => {
    if (validateNewPw()) {
      // 실제로는 API 호출 후 성공 시 처리
      setDialogOpen(true);
    }
  };

  // 2단계: 취소 버튼 클릭
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 알림창 확인 버튼 클릭
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate(-1); // 이전 페이지로 이동
  };

  // 스타일
  const inputTitleSx = {
    mb: 1, 
    color: '#555'
  };

  return (
    <SubpageLayout>
      {step === 1 && (
        <>
          <Typography variant="subtitle2" sx={inputTitleSx}>기존 비밀번호를 입력해 주세요.</Typography>
          <InputForm
            use="password"
            placeholder="기존 비밀번호"
            name="currentPw"
            value={currentPw}
            onChange={e => setCurrentPw(e.target.value)}
            error={currentPwError}
            autoFocus
          />
          <FloatingBox>
            <FloatingButton variant="contained" label="확인" onClick={handleCheckCurrentPw} />
          </FloatingBox>
        </>
      )}
      {step === 2 && (
        <>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" sx={inputTitleSx}>새로 사용하실 비밀번호를 입력해 주세요.</Typography>
              <InputForm
                use="password"
                placeholder="새 비밀번호"
                name="newPw"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                error={newPwError}
                autoFocus
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={inputTitleSx}>새로 사용하실 비밀번호를 다시 한번 입력해 주세요.</Typography>
              <InputForm
                use="password"
                placeholder="새 비밀번호 확인"
                name="confirmPw"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                error={confirmPwError}
              />
            </Box>
          </Stack>
          <FloatingBox>
            <FloatingButton label="취소" onClick={handleCancel} />
            <FloatingButton variant="contained" label="확인" onClick={handleChangePw} />
          </FloatingBox>
        </>
      )}
      <CustomDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onClick1={handleDialogClose}
        title="비밀번호 변경 완료"
        message="비밀번호가 성공적으로 변경되었습니다."
        icon={<TaskAltIcon color="success" sx={{ fontSize: 48 }} />}
        btn1="확인"
      />
    </SubpageLayout>
  );
}

export default ChangePassword;
