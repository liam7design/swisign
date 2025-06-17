import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  CircularProgress,
  styled
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubpageLayout from '../layouts/SubpageLayout';
import saleRequestData from '../data/SaleRequestData.json';
import BottomSheet from '../components/ui/BottomSheet';
import { FloatingBox } from '../components/ui/FloatingBox';

const ChecklistAccordion = styled(Accordion)(({ theme }) => ({
  border: '1px solid #dbdbdb',
  borderRadius: '8px !important',
  boxShadow: 'unset',
  '& .MuiTypography-root': {
    wordBreak: 'keep-all'
  },
  '&.MuiAccordion-root': {
    margin: 0
  },
  '&.Mui-expanded': {
    margin: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const ChecklistAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  '&.Mui-expanded': {
    minHeight: '48px'
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0
    }
  }
}));

const ChecklistAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '8px 18px',
  borderRadius: '0 0 8px 8px',
  backgroundColor: '#f0f0f0',
  '& .MuiCheckbox-root': {
    padding: '7px'
  },
  '& .MuiTypography-root': {
    fontSize: 15
  },
  '& .MuiFormControlLabel-root': {
    marignRight: 0
  }
}));

const initialChecklist = [
  {
    id: 1,
    title: "등기부등본 확인",
    checked: false,
    details: [
      { id: 1, text: "실제 소유자와 계약 상대방 일치 여부", checked: false },
      { id: 2, text: "근저당, 가압류 등 선순위 권리관계 확인", checked: false },
    ],
  },
  {
    id: 2,
    title: "건축물대장 확인",
    checked: false,
    details: [
      { id: 1, text: "불법·무허가 건축물 여부", checked: false },
      { id: 2, text: "주택 용도 확인", checked: false },
    ],
  },
  {
    id: 3,
    title: "임대인 신분 확인",
    checked: false,
    details: [
      { id: 1, text: "임대인(또는 대리인) 신분증, 위임장 확인", checked: false },
    ],
  },
  {
    id: 4,
    title: "임대인 세금 체납 여부 확인",
    checked: false,
    details: [
      { id: 1, text: "국세/지방세 체납 내역 확인", checked: false },
      { id: 2, text: "완납증명서 요청", checked: false },
    ],
  },
  {
    id: 5,
    title: "전세가율(매매가 대비 전세금 비율) 확인",
    checked: false,
    details: [
      { id: 1, text: "인근 시세 및 전세가율 확인", checked: false },
    ],
  },
  {
    id: 6,
    title: "공인중개사 정상 영업 및 자격 확인",
    checked: false,
    details: [
      { id: 1, text: "개업공인중개사 자격증 확인", checked: false },
      { id: 2, text: "중개사무소 등록 여부 확인", checked: false },
    ],
  },
  {
    id: 7,
    title: "표준 임대차계약서 사용 및 특약 명시",
    checked: false,
    details: [
      { id: 1, text: "표준계약서 활용", checked: false },
      { id: 2, text: "권리보장 특약 명시", checked: false },
    ],
  },
  {
    id: 8,
    title: "계약금 및 잔금 임대인 명의 계좌로 이체",
    checked: false,
    details: [
      { id: 1, text: "임대인(또는 대리인) 명의 계좌로만 송금", checked: false },
    ],
  },
  {
    id: 9,
    title: "전입신고 및 확정일자 받기",
    checked: false,
    details: [
      { id: 1, text: "전입신고", checked: false },
      { id: 2, text: "확정일자 확보", checked: false },
    ],
  },
  {
    id: 10,
    title: "전세보증금 반환보증 가입 여부",
    checked: false,
    details: [
      { id: 1, text: "HUG, SGI 등 보증보험 가입 가능 여부 확인", checked: false },
    ],
  },
  {
    id: 11,
    title: "계약 후 권리관계 재확인",
    checked: false,
    details: [
      { id: 1, text: "잔금 지급 전 등기부등본 등 권리관계 변동 여부 재확인", checked: false },
    ],
  },
  {
    id: 12,
    title: "주택 하자 및 상태 점검",
    checked: false,
    details: [
      { id: 1, text: "입주 전 주택 상태 및 하자 점검", checked: false },
      { id: 2, text: "필요시 보수 요청", checked: false },
    ],
  },
];

const SafetyCheckList = () => {
  const [selectedAddress, setSelectedAddress] = useState(saleRequestData[0]);
  const [checklist, setChecklist] = useState(initialChecklist);
 
  const totalCount = checklist.reduce(
    (sum, item) => sum + 1 + item.details.length,
    0
  );
  const checkedCount = checklist.reduce(
    (sum, item) =>
      sum +
      (item.checked ? 1 : 0) +
      item.details.filter((d) => d.checked).length,
    0
  );
  const score = Math.round((checkedCount / totalCount) * 100);

  const allChecked = checkedCount === totalCount;
  const allIndeterminate = checkedCount > 0 && checkedCount < totalCount;
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setChecklist((prev) =>
      prev.map((item) => ({
        ...item,
        checked,
        details: item.details.map((d) => ({ ...d, checked })),
      }))
    );
  };

  const handleItemCheck = (itemIdx) => (e) => {
    const checked = e.target.checked;
    setChecklist((prev) =>
      prev.map((item, idx) =>
        idx === itemIdx
          ? {
              ...item,
              checked,
              details: item.details.map((d) => ({ ...d, checked })),
            }
          : item
      )
    );
  };

  const handleDetailCheck = (itemIdx, detailIdx) => (e) => {
    const checked = e.target.checked;
    setChecklist((prev) =>
      prev.map((item, idx) =>
        idx === itemIdx
          ? {
              ...item,
              details: item.details.map((d, dIdx) =>
                dIdx === detailIdx ? { ...d, checked } : d
              ),
              checked: item.details.every((d, dIdx) =>
                dIdx === detailIdx ? checked : d.checked
              ),
            }
          : item
      )
    );
  };

  const isItemIndeterminate = (item) => {
    const checkedDetails = item.details.filter((d) => d.checked).length;
    return checkedDetails > 0 && checkedDetails < item.details.length;
  };

  const handleAddressChange = (addressObj) => {
    setSelectedAddress(addressObj);
  };

  const getSafetyLevel = (value) => {
    if (value >= 80)
      return {
        color: "#238901",
        status: "안전",
        comment: "매우 안전한 전세입니다.",
      };
    if (value >= 60)
      return {
        color: "#68a605",
        status: "안전",
        comment: "대체로 안전하지만,\n몇 가지 추가 확인이 필요합니다.",
      };
    if (value >= 40)
      return {
        color: "#bac305",
        status: "보통",
        comment: "주의가 필요합니다.\n반드시 세부 항목을 확인하세요.",
      };
    if (value >= 20)
      return {
        color: "#e09e0d",
        status: "불안",
        comment: "위험도가 높으니\n신중히 검토하세요.",
      };
    return {
      color: "#f13939",
      status: "불안",
      comment: "매우 위험한 전세입니다.",
    };
  }

  const { color, status, comment } = getSafetyLevel(score);

  return (
    <SubpageLayout>
      <BottomSheet
        title="주소 선택"
        data={saleRequestData}
        value1={selectedAddress ? selectedAddress.propertyType : ''}
        value2={selectedAddress ? selectedAddress.address : ''}
        onChange={handleAddressChange}
      />

      <Box sx={{ 
        mt: 4,
        mb: 1,
        padding: '8px 16px',
        border: '1px solid #dbdbdb',
        borderRadius: '8px',
      }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              indeterminate={allIndeterminate}
              onChange={handleAllCheck}
            />
          }
          label="전체 확인"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {checklist.map((item, itemIdx) => (
          <ChecklistAccordion key={item.id} sx={{ mb: 1 }}>
            <ChecklistAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.checked}
                    indeterminate={isItemIndeterminate(item)}
                    onChange={handleItemCheck(itemIdx)}
                    onClick={(e) => e.stopPropagation()}
                  />
                }
                label={
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                }
                onClick={(e) => e.stopPropagation()}
              />
            </ChecklistAccordionSummary>
            <ChecklistAccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {item.details.map((detail, detailIdx) => (
                  <React.Fragment key={detail.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={detail.checked}
                          onChange={handleDetailCheck(itemIdx, detailIdx)}
                        />
                      }
                      label={
                        <Typography variant="body2">{detail.text}</Typography>
                      }
                    />
                  </React.Fragment>
                ))}
              </Box>
            </ChecklistAccordionDetails>
          </ChecklistAccordion>
        ))}
      </Box>
      <FloatingBox direction="column">
        <Box sx={{ position: "relative", display: "inline-flex", width: 110, height: 110, margin: '0 auto' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            sx={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, color: "#f0f0f0" }}
            size={110}
            thickness={4}
          />
          <CircularProgress
            variant="determinate"
            value={score}
            sx={{ color, strokeLinecap: "round" }}
            size={110}
            thickness={4}
          />
          <Box sx={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" component="div" color="textPrimary" sx={{ fontWeight: 600 }}>
              {score}<small>점</small>
            </Typography>
            <Typography variant="body2" component="div" sx={{ color, fontWeight: 700 }}>
              ({status})
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="body1" color="textPrimary"
          sx={{ textAlign: "center", fontWeight: 500, whiteSpace: "pre-line", wordBreak: 'keep-all' }}
        >
          {comment}
        </Typography>
      </FloatingBox>
    </SubpageLayout>
  );
}

export default SafetyCheckList;