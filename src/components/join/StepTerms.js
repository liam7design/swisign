import React, { useState } from "react";
import { Box, Typography, Checkbox, Button, FormControlLabel, Divider, Stack } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FloatingBox, FloatingButton } from '../ui/FloatingBox';
import FullpageDialog from '../ui/FullpageDialog';
import CustomDialog from '../ui/CustomDialog';

const TERMS = [
  {
    key: "terms",
    label: "[필수] 이용약관",
    required: true,
    content: "여기에 이용약관 전체 내용이 들어갑니다."
  },
  {
    key: "privacy",
    label: "[필수] 개인정보수집및이용동의",
    required: true,
    content: "여기에 개인정보수집 및 이용 동의 전체 내용이 들어갑니다."
  },
  {
    key: "promo",
    label: "[선택] 프로모션정보수신동의",
    required: false,
    content: "여기에 프로모션 정보 수신 동의 전체 내용이 들어갑니다."
  }
];

const StepTerms = ({
  checkedTerms, 
  allChecked, 
  onTermCheck, 
  onAllCheck,
  onNext, 
  onCancel, 
  canNext,
  termDialog, 
  setTermDialog
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTermDialog({ open: false, term: null });
  };

  const handleAgree = () => {
    if (termDialog.term && !checkedTerms[termDialog.term.key]) {
      onTermCheck(termDialog.term.key); // 체크박스 체크
    }
    setTermDialog({ open: false, term: null }); // 다이얼로그 닫기
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>스윗싸인 서비스 이용을 위한 약관 동의가 필요해요.</Typography>
      <FormControlLabel
        control={
          <Checkbox checked={allChecked} onChange={onAllCheck} />
        }
        label="전체 동의"
        sx={{ 
          mb: 2, 
          '& .MuiFormControlLabel-label': {
            fontSize: 16, 
            fontWeight: 500
          }
        }}
      />
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1} sx={{ marginLeft: '-11px' }}>
        {TERMS.map(term => (
          <Box key={term.key} display="flex" alignItems="center">
            <Checkbox
              checked={!!checkedTerms[term.key]}
              onChange={() => onTermCheck(term.key)}
            />
            <Button
              fullWidth
              variant="text"
              onClick={() => setTermDialog({ open: true, term })}
              endIcon={<ChevronRightIcon color="primary" fontSize="small" />}
              disableRipple
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 0,
                padding: 0,
                color: "text.primary",
                fontSize: 16,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              {term.label}
            </Button>
          </Box>
        ))}
      </Stack>
      <FullpageDialog
        open={termDialog.open}
        onClose={() => setTermDialog({ open: false, term: null })}
        onClick1={handleAgree}
        title={termDialog.term?.label}
        btn1="동의 완료"
        onClick2={
          termDialog.term?.key === "promo"
            ? () => setDialogOpen(true)
            : undefined
        }
        btn2={
          termDialog.term?.key === "promo"
            ? "동의 취소"
            : undefined
        }
      >
        <Typography variant="body2" whiteSpace="pre-line">
          {termDialog.term?.content}
        </Typography>
      </FullpageDialog>
      <CustomDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onClick1={handleDialogClose}
        title="프로모션 정보 수신 미동의"
        message="스윗싸인에서 제공하는 다양한 이벤트 참여를 제공할 목적으로 이용하며, 수신을 원하실 경우 마이페이지에서 동의해 주시면 원할한 서비스 아용이 가능합니다."
      />
      <FloatingBox>
        <FloatingButton label="취소" onClick={onCancel} />
        <FloatingButton variant="contained" label="다음" onClick={onNext} disabled={!canNext} />
      </FloatingBox>
    </>
  );
}

export default StepTerms;