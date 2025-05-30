import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SubpageLayout from '../layouts/SubpageLayout';
import StepUserType from "../components/join/StepUserType";
import StepTerms from "../components/join/StepTerms";
import StepPhone from "../components/join/StepPhone";
import StepBasicInfo from "../components/join/StepBasicInfo";
import StepExtraInfo from "../components/join/StepExtraInfo";
import DotStepper from "../components/join/DotStepper";

const steps = [
  "유형선택",
  "약관동의",
  "휴대폰인증",
  "기본정보입력",
  "추가정보"
];

function Join() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  // 1step
  const [selectedTypes, setSelectedTypes] = useState([]);
  // 2step
  const [checkedTerms, setCheckedTerms] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [termDialog, setTermDialog] = useState({ open: false, term: null });
  // 3step
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeChecked, setCodeChecked] = useState(false);
  const [verified, setVerified] = useState(false);
  // 4step
  const [form, setForm] = useState({ id: "", name: "", pw: "", pw2: "", agentNo: "" });
  const [showPw, setShowPw] = useState(false);
  // 추가입력
  const [houseType, setHouseType] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  // 피드백
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // 1step
  const handleTypeClick = (key) => {
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // 2step
  const handleTermCheck = (key) => {
    setCheckedTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleAllCheck = () => {
    const newVal = !allChecked;
    setAllChecked(newVal);
    setCheckedTerms(
      ["terms", "privacy", "promo"].reduce((acc, t) => ({ ...acc, [t]: newVal }), {})
    );
  };
  React.useEffect(() => {
    setAllChecked(
      ["terms", "privacy", "promo"].every((t) => checkedTerms[t])
    );
  }, [checkedTerms]);

  // 3step
  const handleSendCode = () => {
    if (!/^\d{10,11}$/.test(phone)) {
      setSnackbar({ open: true, message: "올바른 휴대폰 번호를 입력하세요.", severity: "error" });
      return;
    }
    setSent(true);
    setSnackbar({ open: true, message: "인증번호가 발송되었습니다. (테스트코드: 123456)", severity: "success" });
  };
  const handleCodeCheck = () => {
    if (code === "123456") {
      setCodeChecked(true);
      setSnackbar({ open: true, message: "인증번호가 확인되었습니다.", severity: "success" });
    } else {
      setCodeChecked(false);
      setSnackbar({ open: true, message: "인증번호가 올바르지 않습니다.", severity: "error" });
    }
  };
  const handleVerifyComplete = () => {
    setVerified(true);
    // setSnackbar({ open: true, message: "인증이 완료되었습니다.", severity: "success" });
    setTimeout(() => setActiveStep(3), 500);
  };

  // 4step
  // setForm은 StepBasicInfo에서 사용

  // 추가입력
  const handleSearchZip = () => {
    setZipcode("12345");
    setAddress("서울특별시 강남구 테헤란로 123");
    setSnackbar({ open: true, message: "임시 우편번호/주소가 입력되었습니다.", severity: "info" });
  };

  // step 이동
  const canNext = () => {
    switch (activeStep) {
      case 0:
        return selectedTypes.length > 0;
      case 1:
        return ["terms", "privacy"].every(t => checkedTerms[t]);
      case 2:
        return codeChecked;
      case 3:
        return (
          form.id.length >= 4 &&
          form.name.length >= 2 &&
          form.pw.length >= 6 &&
          form.pw === form.pw2 &&
          (!selectedTypes.includes("agent") || form.agentNo.length > 0)
        );
      case 4:
        return houseType && zipcode && address && addressDetail.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleJoinComplete = () => {
    setActiveStep(4);
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  // customBackPath 핸들러
  const handleBack = () => {
    if (activeStep === 0) {
      // 첫 단계: 이전페이지로 이동
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/"); // history가 없으면 홈으로
      }
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <SubpageLayout 
      customTitle={steps[activeStep]}
      customBackPath={handleBack}
      rightElement={<DotStepper count={steps.length} active={activeStep} />}
    >
      {activeStep === 0 && (
        <StepUserType
          selectedTypes={selectedTypes}
          onSelect={handleTypeClick}
          onNext={handleNext}
          canNext={canNext()}
        />
      )}
      {activeStep === 1 && (
        <StepTerms
          checkedTerms={checkedTerms}
          allChecked={allChecked}
          onTermCheck={handleTermCheck}
          onAllCheck={handleAllCheck}
          onNext={handleNext}
          onCancel={handleCancel}
          canNext={canNext()}
          termDialog={termDialog}
          setTermDialog={setTermDialog}
        />
      )}
      {activeStep === 2 && (
        <StepPhone
          phone={phone}
          setPhone={setPhone}
          sent={sent}
          handleSendCode={handleSendCode}
          code={code}
          setCode={setCode}
          codeChecked={codeChecked}
          handleCodeCheck={handleCodeCheck}
          verified={verified}
          handleVerifyComplete={handleVerifyComplete}
        />
      )}
      {activeStep === 3 && (
        <StepBasicInfo
          form={form}
          setForm={setForm}
          showPw={showPw}
          setShowPw={setShowPw}
          selectedTypes={selectedTypes}
          canNext={canNext()}
          onJoinComplete={handleJoinComplete}
        />
      )}
      {activeStep === 4 && (
        <StepExtraInfo
          houseType={houseType}
          setHouseType={setHouseType}
          zipcode={zipcode}
          setZipcode={setZipcode}
          address={address}
          setAddress={setAddress}
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
          handleSearchZip={handleSearchZip}
          canNext={canNext()}
          onNextLogin={handleToLogin}
        />
      )}
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
    </SubpageLayout>
  );
}

export default Join;
