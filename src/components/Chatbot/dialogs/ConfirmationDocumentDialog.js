import React from 'react';
import { Box, Typography, } from '@mui/material';
import FullpageDialog from '../../ui/FullpageDialog';

const ConfirmationDocumentDialog = ({ open, onClose, onSubmit }) => {
  const handleSubmit = () => {
    // 작성 완료된 데이터를 인자로 전달할 수 있습니다.
    onSubmit({ doc: '작성 완료된 확인서 데이터' });
  };

  return (
    <FullpageDialog
      open={open}
      onClose={onClose}
      title="중개대상물 확인서 작성"
      btn1="완료"
      onClick1={handleSubmit}
      onClick2={onClose}
    >
      <Box>
        <Typography>
          중개대상물 확인서 폼이 여기에 표시됩니다.
        </Typography>
        {/* 실제 구현에서는 여기에 확인서 폼 컴포넌트가 들어갑니다. */}
      </Box>
    </FullpageDialog>
  );
};

export default ConfirmationDocumentDialog;
