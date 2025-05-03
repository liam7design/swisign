import React, { useState } from 'react';
import { Typography, Box, List, ListItem, Button, Card, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import SubpageLayout from '../layouts/SubpageLayout';
import ContentBox from '../layouts/ContentBox';
import BottomSheet from '../components/ui/BottomSheet';
import CustomDialog from '../components/ui/CustomDialog';
import GuideMessage from '../components/ui/GuideMessage';
import FloatingButton from '../components/ui/FloatingButton';
import SaleConditionForm from '../components/form/SaleConditionForm';
import PhotoUploadGrid from '../components/form/PhotoUploadGrid';
import RealEstateAgencyList from '../components/content/RealEstateAgencyList';
import saleRequestData from '../data/SaleRequestData.json';

const GuideMsg = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100],
}));

// YYYY.MM.DD → Date 객체 변환
const parseDate = (str) => {
  const [y, m, d] = str.split('.').map(Number);
  return new Date(y, m - 1, d);
}

// 계약기간 표시 함수
const renderPeriod = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  const end = parseDate(endDate);
  const today = new Date();
  if (end < today) return "계약종료";
  return `${startDate} ~ ${endDate}`;
}

// 2개월(60일) 이상 남았는지 체크
const isOverTwoMonths = (endDate) => {
  const end = parseDate(endDate);
  const today = new Date();
  const diff = end - today;
  const diffDays = diff / (1000 * 60 * 60 * 24);
  return diffDays >= 60;
}

const ListUnit = ({ title, content, selectItem, onClick }) => {
  return (
    <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
      <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>{title}</Typography>
      <Typography variant="body2" sx={{ wordBreak: 'keep-all' }}>{content}</Typography>
      { selectItem && 
        <Button variant="outlined" size="small" sx={{ marginLeft: 'auto', lineHeight: 'inherit', minWidth: '3rem' }} onClick={onClick}>선택</Button>
      }
    </ListItem>
  )
}

const SaleRequest = () => {
  const [state, setState] = useState('SaleOption');
  const [selectedAddress, setSelectedAddress] = useState(saleRequestData[0]);
  const [selectedUnit, setSelectedUnit] = useState(null); //eslint-disable-line no-unused-vars
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleAddressChange = (addressObj) => {
    setSelectedAddress(addressObj);
    setSelectedUnit(null);
  };

  const handleUnitSelect = (unit) => {
    const today = new Date();
    // 이미 계약 종료된 경우 선택 허용
    if (parseDate(unit.endDate) < today) {
      setSelectedUnit(unit);
      setState('SaleInfo');
      return;
    }
    // 2개월 이상 남은 경우 안내 팝업
    if (isOverTwoMonths(unit.endDate)) {
      setDialogOpen(true);
      return;
    }
    // 2개월 미만 남았으면 선택 허용
    setSelectedUnit(unit);
    setState('SaleInfo');
  };

  // 파일 선택 핸들러
  const handleAddPhoto = () => {
    // 실제 구현에서는 input type="file" 사용!
    // 여기선 임시로 랜덤 이미지 추가
    if (photos.length >= 10) return;
    const nextId = photos.length + 1;
    setPhotos([
      ...photos,
      {
        id: nextId,
        url: `/images/img_localsale_${nextId}.jpg`
      }
    ]);
  };

  const handleRemovePhoto = (photo, idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const SaleInfoButtons = [
    {
      label: "이전",
      variant: "outlined",
      onClick: () => setState('SaleOption')
    },
    {
      label: "다음", 
      variant: "contained",
      onClick: () => setState('SalePhoto')
    }
  ];

  const SalePhotoButtons = [
    {
      label: "이전",
      variant: "outlined",
      onClick: () => setState('SaleInfo')
    },
    {
      label: "다음", 
      variant: "contained",
      onClick: () => setState('SaleAgency')
    }
  ];

  const SaleAgencyButtons = [
    {
      label: "매물등록 요청", 
      variant: "contained",
      onClick: () => setState('SaleOption')
    }
  ];

  return (
    <SubpageLayout>
      {/* 임대매물 선택 */}
      {state === 'SaleOption' && (
        <>
          <ContentBox variant="flex">
            <ContentBox.Top>
              <BottomSheet
                title="매물 선택"
                data={saleRequestData}
                value1={selectedAddress ? selectedAddress.propertyType : ''}
                value2={selectedAddress ? selectedAddress.address : ''}
                onChange={handleAddressChange}
              />
              {selectedAddress && (
                <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
                  {selectedAddress.units.map((unit) => (
                    <ListItem
                      key={unit.id}
                      sx={{
                        px: 2.5,
                        py: 2,
                        borderRadius: 2,
                        border: '1px solid #dbdbdb'
                      }}
                    >
                      <Box sx={{ mr: 2 }}>
                        <Typography variant="subtitle2">     
                          {unit.floor}/{unit.unit}({unit.area})
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.25, color: 'text.secondary'}}>
                          {renderPeriod(unit.startDate, unit.endDate)}
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small" onClick={() => handleUnitSelect(unit)} sx={{ minWidth: '48px', ml: 'auto', mr: -1 }}>선택</Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </ContentBox.Top>
            <ContentBox.Bottom>
              <GuideMessage
                title="주택임대차보호법 제6조 1항"
                message="임대인이 임대차기간이 끝나기 6개월 전부터 2개월 전까지의 기간에 임차인에게 갱신거절을 통지하지 않는 경우에는 동일조건으로 다시 임대 한 것으로 본다."
              />
            </ContentBox.Bottom>
          </ContentBox>
          <CustomDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onClick={() => setDialogOpen(false)}
            title="매물등록불가"
            message="계약기간이 2개월 이상 남아있어 매물등록을 할 수 없습니다."
          />
        </>
      )}
      {/* 매물 등록 프로세스 */}
      {state !== 'SaleOption' && (
        <ContentBox variant="block">
          <ContentBox.Content>
            {/* 선택매물 기본정보 */}
            <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>
              {state === 'SaleInfo' ? '매물등록 대상' : '부동산중개소 매물등록 요청'}
            </Typography>
            <List sx={{ marginBottom: '1rem', padding: '0', borderTop: `1px solid ${grey[300]}` }}>
              <ListUnit title="주소" content={selectedAddress.address} />
              <ListUnit
                title="층/호/면적"
                content={
                  selectedUnit
                    ? `${selectedUnit.floor}층 / ${selectedUnit.unit}호 / ${selectedUnit.area}m²`
                    : ''
                }
              />
            </List>

            {/* 정보 입력 */}
            {state === 'SaleInfo' && (
              <>
                <SaleConditionForm />
                <Box sx={{ height: 76 }} />
                <FloatingButton buttons={SaleInfoButtons} />
              </>
            )}
            {/* 사진 첨부 */}
            {state === 'SalePhoto' && (
              <>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 0.5, fontSize: 18 }}>사진 첨부</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>임대물건에 대한 사진을 첨부하고 빠른 계약 진행하세요.</Typography>
                  <GuideMsg variant="outlined" sx={{ mb: 2 }}>
                    <ErrorIcon fontSize="small" />
                    <Typography variant="body2">최대 10개까지 등록 가능합니다.</Typography>
                  </GuideMsg>
                  <PhotoUploadGrid
                    photos={photos}
                    onAddPhoto={handleAddPhoto}
                    onRemovePhoto={handleRemovePhoto}
                    maxCount={10}
                  />
                </Box>
                <Box sx={{ height: 76 }} />
                <FloatingButton buttons={SalePhotoButtons} />
              </>
            )}
            {/* 부동산중개소 선택 */}
            {state === 'SaleAgency' && (
              <>
                <Box sx={{ mt: 4 }}>
                  <GuideMsg variant="outlined" sx={{ mb: 2 }}>
                    <ErrorIcon fontSize="small" />
                    <Typography variant="body2">주변 검색으로 부동산중개소를 선택해주세요.</Typography>
                  </GuideMsg>
                  <Button variant="outlined" fullWidth sx={{ mb: 2 }}>주변 검색</Button>
                  <RealEstateAgencyList />
                </Box>
                <Box sx={{ height: 76 }} />
                <FloatingButton buttons={SaleAgencyButtons} />
              </>
            )}
          </ContentBox.Content>
        </ContentBox>
      )}
    </SubpageLayout>
  );
}

export default SaleRequest;