import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { FloatingBox, FloatingButton } from '../ui/FloatingBox';
import InputForm from '../form/InputForm';
import { FormBox } from '../form/FormStyle';

const HOUSE_TYPES = [
  { value: "self", label: "자가" },
  { value: "jeonse", label: "전세" },
  { value: "wolse", label: "월세" },
  { value: "etc", label: "기타" }
];

function StepExtraInfo({
  houseType, setHouseType,
  zipcode, setZipcode,
  address, setAddress,
  addressDetail, setAddressDetail,
  handleSearchZip,
  canNext,
  onNextLogin
}) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>추가 정보는 마이페이지에서도 정보 입력이 가능해요.</Typography>
      <Box>
        <Typography variant="h6" sx={{mb: 1, fontSize: 18 }}>주택 유형</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
          }}
        >
          {HOUSE_TYPES.map(opt => (
            <Button
              key={opt.value}
              variant={houseType === opt.value ? "contained" : "outlined"}
              onClick={() => setHouseType(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{mb: 0.5, fontSize: 18 }}>주소 등록</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>주소를 등록하시면 등기부등본 변동, 주변시세 등 주요 정보를 정기적으로 받아보실 수 있습니다. (임차인 한정)</Typography>
        <FormBox>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <InputForm
                placeholder="우편번호"
                value={zipcode}
                size="small"
                InputProps={{
                  readOnly: true
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearchZip}
                sx={{ minWidth: 120 }}
              >
                우편번호 검색
              </Button>
            </Stack>
            <InputForm
              placeholder="기본주소"
              value={address}
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
            <InputForm
              placeholder="상세주소 입력"
              value={addressDetail}
              size="small"
              onChange={e => setAddressDetail(e.target.value)}
            />
          </Stack>
        </FormBox>
      </Box>
      <FloatingBox>
        <FloatingButton label="다음에 상세 입력" onClick={() => onNextLogin()} />
        <FloatingButton variant="contained" label="회원가입 완료" onClick={() => onNextLogin()} disabled={!canNext} />
      </FloatingBox>
    </>
  );
}

export default StepExtraInfo;
