import React, { useState, useRef, useContext } from 'react';
import { Box, Typography, Button, Stack, Avatar, IconButton, ToggleButtonGroup, ToggleButton, Divider, styled } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import SubpageLayout from '../layouts/SubpageLayout';
import { AuthContext } from '../context/AuthContext';
import InputForm from '../components/form/InputForm';
import CustomDialog from '../components/ui/CustomDialog';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingBox';

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: '24px 0',
  borderBottom: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
}));

const PrivacyManagement = () => {
  const { user } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [emailChecked, setEmailChecked] = useState(false); // eslint-disable-line no-unused-vars
  const [image, setImage] = useState(user.photo || null);
  const inputFileRef = useRef(null);

  const typeMap = {
    userType1: '임차인',
    userType2: '임대인',
    userType3: '중개인',
  };
  
  const defaultJoinTypes = user.type ? [typeMap[user.type]] : [];
  
  const [joinTypes, setJoinTypes] = useState(defaultJoinTypes);

  const [form, setForm] = useState({
    name: user.name || '',
    nickname: user.nickname || '',
    id: user.id || '',
    email: user.email || '',
  });

  const handleJoinTypeChange = (event, newTypes) => {
    setJoinTypes(newTypes);
  };

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailChecked(false);
    }
  };

  const handleEmailCheck = () => {
    // 실제 중복확인 API 연동 필요
    if (form.email) {
      alert(`이메일 ${form.email} 중복확인 완료`);
      setEmailChecked(true);
    } else {
      alert('이메일을 입력해주세요.');
    }
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    navigate(-1);
  };

  // 수정 버튼 클릭
  const handleChangePrivacy = () => {
    setDialogOpen(true);
  };

  // 알림창 확인 버튼 클릭
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate(-1);
  };

  // 스타일
  const inputTitleSx = {
    mb: 0.5, 
    color: '#555'
  };

  const readonlySx = {
    '& .MuiInputBase-input.Mui-disabled, & .MuiInputBase-input[readonly]': {
      backgroundColor: '#f5f5f5',
      color: 'rgba(0,0,0,0.87)',
      WebkitTextFillColor: 'rgba(0,0,0,0.87)', // for Safari
    },
  };

  return (
    <SubpageLayout>
      {/* 프로필 사진 등록 UI */}
      <Stack spacing={3} sx={{ alignItems: 'center', mb: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={image}
            sx={{ width: 100, height: 100 }}
          >
            {!image && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              width: 32,
              height: 32,
              '&:hover': { bgcolor: 'grey.300' },
            }}
            aria-label="프로필 사진 등록"
          >
            <CameraAltIcon fontSize="small" />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Box>
      </Stack>
      {/* 프로필 정보 입력 UI */}
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>이름</Typography>
          <InputForm
            placeholder="이름"
            name="name"
            value={form.name}
            onChange={handleChange}
            use="text"
            InputProps={{ readOnly: true }}
            size="small"
            sx={readonlySx}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>닉네임</Typography>
          <InputForm
            placeholder="닉네임"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            use="text"
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>아이디</Typography>
          <InputForm
            placeholder="아이디"
            name="id"
            value={form.id}
            onChange={handleChange}
            use="text"
            InputProps={{ readOnly: true }}
            size="small"
            sx={readonlySx}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={inputTitleSx}>이메일</Typography>
          <InputForm
            placeholder="이메일"
            name="email"
            value={form.email}
            onChange={handleChange}
            use="text"
            size="small"
          />
        </Box>
        <Button
          variant="outlined"
          onClick={handleEmailCheck}
        >
          중복확인
        </Button>
      </Stack>
      <CustomDivider />
      {/* 가입유형 선택 */}
      <Typography variant="subtitle2" sx={inputTitleSx}>가입 유형 선택</Typography>
      <ToggleButtonGroup
        value={joinTypes}
        onChange={handleJoinTypeChange}
        aria-label="가입유형"
        multiple
        fullWidth
        color="primary"
        size="small"
      >
        <ToggleButton value="임차인" aria-label="임차인">
          임차인
        </ToggleButton>
        <ToggleButton value="임대인" aria-label="임대인">
          임대인
        </ToggleButton>
        <ToggleButton value="중개인" aria-label="중개인">
          중개인
        </ToggleButton>
      </ToggleButtonGroup>

      <FloatingBox>
        <FloatingButton label="취소" onClick={handleCancel} />
        <FloatingButton variant="contained" label="확인" onClick={handleChangePrivacy} />
      </FloatingBox>
      <CustomDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onClick1={handleDialogClose}
        title="회원정보 수정 완료"
        message="회원정보 수정이 완료되었습니다."
        icon={<TaskAltIcon color="success" sx={{ fontSize: 48 }} />}
        btn1="확인"
      />
    </SubpageLayout>
  )
}

export default PrivacyManagement;