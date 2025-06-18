import React from "react";
import { Box, Typography, Card, CardContent, CardActionArea, Stack } from "@mui/material";
import { FloatingBox, FloatingButton } from '../ui/FloatingBox';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';

const USER_TYPES = [
  {
    key: "tenant",
    icon: <PersonIcon fontSize="large" color="primary" />,
    title: "임차인",
    desc: "등기부등본 등 주요정보 변동 알림 및 리포트 제공으로 안전정보 제공"
  },
  {
    key: "landlord",
    icon: <HomeWorkIcon fontSize="large" color="primary" />,
    title: "임대인",
    desc: "임대물건에 대한 중개 요청 및 임대현황에 대한 정보 등 다양한 편익 제공"
  },
  {
    key: "agent",
    icon: <BusinessIcon fontSize="large" color="primary" />,
    title: "중개인",
    desc: "임대물건에 대한 방문일정 확인 및 전자계약을 통한 비대면 계약 등의 편익 제공"
  }
];

const StepUserType = ({ selectedTypes, onSelect, onNext, canNext }) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>가입자 유형을 선택해주세요.</Typography>
      <Stack spacing={2}>
        {USER_TYPES.map(type => (
          <Card
            key={type.key}
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderWidth: selectedTypes.includes(type.key) ? 1 : 1,
              borderColor: selectedTypes.includes(type.key) ? "primary.main" : "grey.300",
              transition: "all 0.2s"
            }}
          >
            <CardActionArea onClick={() => onSelect(type.key)} disableRipple>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box mr={2}>{type.icon}</Box>
                <Box>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }} gutterBottom>{type.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{type.desc}</Typography>
                </Box>
                <Box flexGrow={1} />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      <FloatingBox>
        <FloatingButton variant="contained" label="다음" onClick={onNext} disabled={!canNext} />
      </FloatingBox>
    </>
  );
}

export default StepUserType;