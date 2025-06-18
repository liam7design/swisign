import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import FullpageDialog from '../../ui/FullpageDialog';

const SpecialTermsDialog = ({ open, onClose, onSubmit }) => {
  // 실제 구현에서는 여기서 특약사항 데이터를 관리하고 선택합니다.
  
  const handleSubmit = () => {
    // 선택된 특약사항 데이터를 인자로 전달할 수 있습니다.
    onSubmit({ term: '선택된 특약사항 내용' }); 
  };

  return (
    <FullpageDialog
      open={open}
      onClose={onClose}
      title="특약사항 선택"
      btn1="완료"
      onClick1={handleSubmit}
      onClick2={onClose}
    >
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          계약에 추가할 특약사항을 모두 선택해주세요.
        </Typography>
        <FormControlLabel control={<Checkbox />} label="임대인은 잔금 지급일까지 저당권 등 권리 제한을 설정하지 않는다." />
        <FormControlLabel control={<Checkbox />} label="현 시설물 상태에서의 계약이며, 수리 및 교체 비용은 임차인이 부담한다." />
        <FormControlLabel control={<Checkbox />} label="반려동물 사육을 금지한다." />
      </Box>
    </FullpageDialog>
  );
};

export default SpecialTermsDialog;
