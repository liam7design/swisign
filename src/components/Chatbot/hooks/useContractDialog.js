import { useState, useCallback } from 'react';

/**
 * 계약 관련 다이얼로그 상태를 관리하는 훅
 * 챗봇 내에서 계약 정보 입력, 특약사항 선택 등에 사용
 */
const useContractDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  
  const openDialog = useCallback((type = 'contract_info') => {
    setDialogType(type);
    setIsOpen(true);
  }, []);
  
  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setDialogType(null);
  }, []);
  
  return { 
    isOpen, 
    dialogType, 
    openDialog, 
    closeDialog 
  };
};

export default useContractDialog;