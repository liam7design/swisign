import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  styled
} from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import SubpageLayout from '../layouts/SubpageLayout';
import CustomDialog from '../components/ui/CustomDialog';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingBox';
import SaleConditionForm from '../components/form/SaleConditionForm';
import BuildingData from '../data/BuildingData.json';
import saleRequestData from '../data/SaleRequestData.json';
import BottomSheet from '../components/ui/BottomSheet';

// 스타일 컴포넌트 및 유틸 함수
const PropertyInfoAccordion = styled(Accordion)(({ theme }) => ({
  border: '1px solid #dbdbdb',
  borderRadius: '8px !important',
  boxShadow: 'unset',
  '&.Mui-expanded': {
    margin: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const PropertyInfoAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0
    }
  }
}));

const PropertyInfoAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '16px',
  borderRadius: '0 0 8px 8px',
  backgroundColor: '#f0f0f0'
}));

const GuideMsg = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100]
}));

// YYYY.MM.DD → Date 객체 변환
const parseDate = (str) => {
  const [y, m, d] = str.split('.').map(Number);
  return new Date(y, m - 1, d);
};

// 계약기간 표시 함수
const renderPeriod = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  const end = parseDate(endDate);
  const today = new Date();
  if (end < today) return '계약종료';
  return `${startDate} ~ ${endDate}`;
};

const ListUnit = ({ title, content, selectItem, onClick, selected }) => (
  <ListItem
    sx={{
      minHeight: '2.5rem',
      padding: '0.5rem 0.25rem',
      borderBottom: `1px solid ${grey[300]}`
    }}
  >
    <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>
      {title}
    </Typography>
    <Typography variant="body2">{content}</Typography>
    {selectItem && (
      <Button
        variant={selected ? 'contained' : 'outlined'}
        size="small"
        sx={{ marginLeft: 'auto', lineHeight: 'inherit', minWidth: '3rem' }}
        onClick={onClick}
      >
        선택
      </Button>
    )}
  </ListItem>
);

const RentalManagement = () => {
  const [state, setState] = useState('initial');
  const [selectedList, setSelectedList] = useState([]); // [{ buildingIdx, infoIdx }, ...]
  const [dialogOpen, setDialogOpen] = useState(false);

  // 주소/아코디언 관련 상태 및 핸들러
  const [selectedAddress, setSelectedAddress] = useState(saleRequestData[0]);
  const [selectedUnit, setSelectedUnit] = useState(null); // eslint-disable-line no-unused-vars
  const [expanded, setExpanded] = useState([false, false]);

  const handleAddressChange = (addressObj) => {
    setSelectedAddress(addressObj);
    setSelectedUnit(null);
    setExpanded(Array(addressObj?.units?.length || 0).fill(false));
  };

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded((prev) => {
      const newState = [...prev];
      newState[index] = isExpanded;
      return newState;
    });
  };

  // 선택/해제 핸들러
  const handleSelect = (buildingIdx, infoIdx) => {
    const idx = selectedList.findIndex(
      (item) => item.buildingIdx === buildingIdx && item.infoIdx === infoIdx
    );
    if (idx > -1) {
      setSelectedList(selectedList.filter((_, i) => i !== idx));
    } else {
      setSelectedList([...selectedList, { buildingIdx, infoIdx }]);
    }
  };

  // 선택된 매물 정보 추출 (여러 개)
  const selectedInfos = selectedList
    .map(({ buildingIdx, infoIdx }) => {
      const building = BuildingData[buildingIdx];
      const info = building?.buildingInfo?.[infoIdx];
      return building && info ? { building, info } : null;
    })
    .filter(Boolean);

  return (
    <SubpageLayout customTitle={state === 'SaleInfo' ? '임대등록' : '임대관리'}>
      {state === 'initial' && (
        <>
          {/* 매물 선택 바텀시트 및 아코디언 */}
          <BottomSheet
            title="매물 선택"
            data={saleRequestData}
            value1={selectedAddress ? selectedAddress.propertyType : ''}
            value2={selectedAddress ? selectedAddress.address : ''}
            onChange={handleAddressChange}
          />
          {selectedAddress && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} fullWidth>
              {selectedAddress.units.map((unit, idx) => (
                <PropertyInfoAccordion
                  key={idx}
                  expanded={expanded[idx]}
                  onChange={handleChange(idx)}
                >
                  <PropertyInfoAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${idx}-content`}
                    id={`panel${idx}-header`}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip label={unit.type} color="primary" size="small" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {unit.floor}/{unit.unit}({unit.area})
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2">
                        {unit.deposit}/{unit.rent}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">
                          {unit.lessee}({unit.contact})
                        </Typography>
                        <IconButton aria-label="phone" sx={{ p: 0.5 }}>
                          <PhoneIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {renderPeriod(unit.startDate, unit.endDate)}
                      </Typography>
                    </Box>
                  </PropertyInfoAccordionSummary>
                  <PropertyInfoAccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="subtitle2">월세</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {unit.rent}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="subtitle2">관리비</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {unit.fee}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="subtitle2">입금일</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {unit.depositDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="subtitle2">입금여부</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: unit.depositCompleted
                              ? 'success.main'
                              : 'error.main'
                          }}
                        >
                          {unit.depositCompleted ? '입금완료' : '미입금'}
                        </Typography>
                      </Box>
                    </Box>
                  </PropertyInfoAccordionDetails>
                </PropertyInfoAccordion>
              ))}
            </Box>
          )}
          {/* 안내 메시지 */}
          <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'text.secondary' }}>
            등록된 임대물건이 없습니다.
          </Box>
          <Button variant="outlined" fullWidth onClick={() => setState('loaded')}>
            건축물 등록
          </Button>
        </>
      )}

      {state === 'loaded' && (
        <>
          <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>
            매물 선택
          </Typography>
          {BuildingData.map((building, buildingIdx) => (
            <List
              key={buildingIdx}
              sx={{
                marginBottom: '1rem',
                padding: '0',
                borderTop: `1px solid ${grey[300]}`
              }}
            >
              <ListUnit title="문서확인번호" content={building.documentNumber} />
              <ListUnit title="고유번호" content={building.uniqueNumber} />
              {building.units.map((units, unitsIndex) => (
                <ListUnit
                  key={unitsIndex}
                  title="호수[매수]"
                  content={`${units.unit}호 / ${units.households}가구 / ${units.families}세대`}
                />
              ))}
              <ListUnit title="주소" content={building.address} />
              <ListUnit title="주소_지번" content={building.lotNumber} />
              <ListUnit title="주소_도로명" content={building.roadName} />
              {building.buildingInfo.map((info, infoIdx) => {
                const isSelected = selectedList.some(
                  (item) =>
                    item.buildingIdx === buildingIdx && item.infoIdx === infoIdx
                );
                return (
                  <ListUnit
                    key={infoIdx}
                    title="층/호/면적"
                    content={`${info.floor}층 / ${info.unit}호 / ${info.area}m²`}
                    selectItem={true}
                    selected={isSelected}
                    onClick={() => handleSelect(buildingIdx, infoIdx)}
                  />
                );
              })}
              <ListUnit title="발급일" content={building.issueDate} />
              <ListUnit title="발급기관" content={building.issuingAuthority} />
            </List>
          ))}
          <GuideMsg variant="outlined">
            <ErrorIcon fontSize="small" />
            <Typography variant="body2">
              임대할 호수선택해주세요. (중복선택 가능)
            </Typography>
          </GuideMsg>
          <FloatingBox>
            <FloatingButton label="등록 취소" onClick={() => setState('initial')} />
            <FloatingButton variant="contained" label="다음" onClick={() => setState('SaleInfo')} />
          </FloatingBox>
        </>
      )}

      {state === 'SaleInfo' && (
        <>
          <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>
            매물등록 추가 정보
          </Typography>
          {selectedInfos.length > 0 ? (
            selectedInfos.map(({ building, info }, idx) => (
              <List
                key={idx}
                sx={{
                  marginBottom: '1rem',
                  padding: '0',
                  borderTop: `1px solid ${grey[300]}`
                }}
              >
                <ListUnit title="주소_도로명" content={building.roadName} />
                <ListUnit
                  title="층/호/면적"
                  content={`${info.floor}층 / ${info.unit}호 / ${info.area}m²`}
                />
              </List>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ p: 2, textAlign: 'center', color: grey[500] }}
            >
              선택된 매물이 없습니다.
            </Typography>
          )}
          <SaleConditionForm />
          <FloatingBox>
            <FloatingButton label="이전" onClick={() => setState('loaded')} />
            <FloatingButton variant="contained" label="완료" onClick={() => setDialogOpen(true)} />
          </FloatingBox>
          <CustomDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            btn1="예"
            onClick1={() => setDialogOpen(false)}
            btn2="아니오"
            onClick2={() => setDialogOpen(false)}
            title="임대물건이 등록되었습니다."
            message="해당 임대물건을 매물등록 요청하시겠습니까?"
          />
        </>
      )}
    </SubpageLayout>
  );
};

export default RentalManagement;