import React from "react";
import { Box, Typography, Checkbox, Button, FormControlLabel, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material";
import { FloatingBox, FloatingButton } from '../ui/FloatingButton';

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

function StepTerms({
  checkedTerms, allChecked, onTermCheck, onAllCheck,
  onNext, onCancel, canNext,
  termDialog, setTermDialog
}) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>스윗싸인 서비스 이용을 위한 약관 동의가 필요해요.</Typography>
      <FormControlLabel
        control={
          <Checkbox checked={allChecked} onChange={onAllCheck} />
        }
        label="전체 동의"
        sx={{ mb: 2, fontWeight: 600 }}
      />
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1}>
        {TERMS.map(term => (
          <Box key={term.key} display="flex" alignItems="center">
            <Checkbox
              checked={!!checkedTerms[term.key]}
              onChange={() => onTermCheck(term.key)}
            />
            <Button
              variant="text"
              onClick={() => setTermDialog({ open: true, term })}
              sx={{ textAlign: "left", minWidth: 0, color: "text.primary" }}
            >
              {term.label}
            </Button>
          </Box>
        ))}
      </Stack>
      <Dialog open={termDialog.open} onClose={() => setTermDialog({ open: false, term: null })} fullWidth>
        <DialogTitle>{termDialog.term?.label}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" whiteSpace="pre-line">
            {termDialog.term?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermDialog({ open: false, term: null })}>닫기</Button>
        </DialogActions>
      </Dialog>
      <FloatingBox>
        <FloatingButton label="취소" onClick={onCancel} />
        <FloatingButton variant="contained" label="다음" onClick={onNext} disabled={!canNext} />
      </FloatingBox>
    </>
  );
}

export default StepTerms;