import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import FullpageDialog from '../../ui/FullpageDialog';
import { FormBox } from '../../form/FormStyle';

import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

import LessorInfoForm from './forms/LessorInfoForm';
import LesseeInfoForm from './forms/LesseeInfoForm';
import RealtorInfoForm from './forms/RealtorInfoForm';
import ContractDetailsForm from './forms/ContractDetailsForm';
import PaymentDatesForm from './forms/PaymentDatesForm';

const FormSection = ({ title, icon, children }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
      {/* icon prop이 존재할 경우에만 아이콘을 렌더링합니다. */}
      {icon && icon}
      <Typography variant="h6" sx={{ fontSize: 18 }}>{title}</Typography>
    </Box>
    <FormBox>{children}</FormBox>
  </Box>
);

const ContractInfoDialog = ({ open, onClose, onSubmit }) => {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { /* 기본값 설정 */ }
  });

  const onFormSubmit = (data) => {
    // 개발 환경에서만 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log("제출된 폼 데이터:", data);
    }
    onSubmit(data);
    onClose();
  };

  const handleSearchZip = () => {
    setZipcode("12345");
    setAddress("서울특별시 강남구 테헤란로 123");
    setSnackbar({ open: true, message: "임시 우편번호/주소가 입력되었습니다.", severity: "info" });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <FullpageDialog
        open={open}
        onClose={onClose}
        title="계약 정보 입력"
        btn1 = '완료'
        btn1Type="submit" // 1. 버튼 타입을 'submit'으로 지정
        btn1Form="contract-info-form" // 2. form의 id를 연결
        onClick1={onFormSubmit}
        onClick2={onClose}
      >
        <form id="contract-info-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <FormSection title="임대인 정보" icon={<HomeWorkIcon />}>
              <LessorInfoForm control={control} errors={errors} />
            </FormSection>
            <FormSection title="임차인 정보" icon={<PersonIcon />}>
              <LesseeInfoForm 
                control={control} 
                errors={errors}
                zipcode={zipcode}
                setZipcode={setZipcode}
                address={address}
                setAddress={setAddress}
                addressDetail={addressDetail}
                setAddressDetail={setAddressDetail}
                handleSearchZip={handleSearchZip}
              />
            </FormSection>
            <FormSection title="공인중개소 정보" icon={<BusinessIcon />}>
              <RealtorInfoForm control={control} errors={errors} />
            </FormSection>
            <FormSection title="계약내용" icon={<DescriptionOutlinedIcon />}>
              <ContractDetailsForm control={control} errors={errors} />
            </FormSection>
            <FormSection title="지급일" icon={<EventAvailableOutlinedIcon />}>
              <PaymentDatesForm control={control} errors={errors} />
            </FormSection>
          </Box>
        </form>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={1000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ marginBottom: '4px '}}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </FullpageDialog>
    </LocalizationProvider>
  );
};

export default ContractInfoDialog;