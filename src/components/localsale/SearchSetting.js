import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, Stack, Divider, Chip, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 전세(보증)금 value 배열 생성
const JEONSE_VALUES = [
  ...Array.from({ length: 11 }, (_, i) => i * 1000),        // 0, 1000, ..., 10000 (0~1억, 1000만 단위)
  ...Array.from({ length: 10 }, (_, i) => 12000 + i * 2000) // 12000, 14000, ..., 30000 (1.2억~3억, 2000만 단위)
];
const getJeonseIndex = (val) => JEONSE_VALUES.indexOf(val);
const JEONSE_MARKS = [
  { value: getJeonseIndex(0), label: '0' },
  { value: getJeonseIndex(5000), label: '5천' },
  { value: getJeonseIndex(10000), label: '1억' },
  { value: getJeonseIndex(20000), label: '2억' },
  { value: getJeonseIndex(30000), label: '3억' }
];

// 월세 value 배열 (0~100: 5만 단위, 110~300: 10만 단위)
const MONTHLY_VALUES = [
  ...Array.from({ length: 21 }, (_, i) => i * 5),      // 0, 5, ..., 100
  ...Array.from({ length: 20 }, (_, i) => 110 + i * 10) // 110, 120, ..., 300
];
const getMonthlyIndex = (val) => MONTHLY_VALUES.indexOf(val);
const MONTHLY_MARKS = [
  { value: getMonthlyIndex(0), label: '0' },
  { value: getMonthlyIndex(50), label: '50' },
  { value: getMonthlyIndex(100), label: '100' },
  { value: getMonthlyIndex(200), label: '200' },
  { value: getMonthlyIndex(300), label: '300' }
];

const HOUSING_TYPES = ['아파트', '오피스텔', '빌라주택', '원룸투룸', '상가업무토지'];
const SALE_TYPES = ['전체', '매매', '전세', '월세'];
const AREA_TYPES = ['전체', '10평이하', '10평대', '20평대', '30평대', '40평대', '50평대', '60평이상'];
const AREA_ORDER = AREA_TYPES.reduce((acc, cur, idx) => ({ ...acc, [cur]: idx }), {});

// 금액 표기 함수 (한국 관행)
const formatMoney = (value) => {
  if (value === 0) return '0원';
  if (value >= 10000) {
    const eok = Math.floor(value / 10000);
    const chun = value % 10000;
    if (chun === 0) return `${eok}억원`;
    else return `${eok}억${chun / 1000 === 1 ? '' : chun / 1000}${chun ? '천만원' : ''}`;
  }
  if (value >= 1000) {
    return value === 1000 ? '1천만원' : `${value / 1000}천만원`;
  }
  return `${value}만원`;
}

const SearchSetting = ({ onClose, onSearch }) => {
  // 항상 초기값으로 시작
  const [housingType, setHousingType] = useState('아파트');
  const [saleType, setSaleType] = useState('전체');
  const [selectedAreas, setSelectedAreas] = useState(['전체']);
  const [jeonseRange, setJeonseRange] = useState([0, JEONSE_VALUES.length - 1]);
  const [monthlyRange, setMonthlyRange] = useState([0, MONTHLY_VALUES.length - 1]);

  // 면적 선택 핸들러
  const handleAreaChange = (clickedArea) => {
    if (clickedArea === '전체') {
      setSelectedAreas(prev => prev.includes('전체') ? [] : ['전체']);
      return;
    }
    setSelectedAreas(prev => {
      const currentAreas = prev.filter(a => a !== '전체');
      const clickedIndex = AREA_ORDER[clickedArea];
      if (currentAreas.length === 0) return [clickedArea];
      if (currentAreas.length === 1) {
        const currentIndex = AREA_ORDER[currentAreas[0]];
        if (clickedIndex > currentIndex) {
          return AREA_TYPES.slice(currentIndex, clickedIndex + 1);
        }
        return [clickedArea];
      }
      return [clickedArea];
    });
  };

  // 전세(보증)금 슬라이더 핸들러 (최소 1구간 차이)
  const handleJeonseChange = (_, idxRange) => {
    let [min, max] = idxRange;
    if (max - min < 1) {
      if (min === jeonseRange[0]) max = min + 1;
      else min = max - 1;
    }
    setJeonseRange([min, max]);
  };

  // 월세 슬라이더 핸들러 (최소 1구간 차이)
  const handleMonthlyChange = (_, idxRange) => {
    let [min, max] = idxRange;
    if (max - min < 1) {
      if (min === monthlyRange[0]) max = min + 1;
      else min = max - 1;
    }
    setMonthlyRange([min, max]);
  };

  // 초기화
  const handleReset = () => {
    setHousingType('아파트');
    setSaleType('전체');
    setSelectedAreas(['전체']);
    setJeonseRange([0, JEONSE_VALUES.length - 1]);
    setMonthlyRange([0, MONTHLY_VALUES.length - 1]);
  };

  // 검색 버튼 클릭 시
  const handleSearch = () => {
    onSearch({
      housingType,
      saleType,
      selectedAreas,
      jeonse: [JEONSE_VALUES[jeonseRange[0]], JEONSE_VALUES[jeonseRange[1]]],
      monthly: [MONTHLY_VALUES[monthlyRange[0]], MONTHLY_VALUES[monthlyRange[1]]]
    });
  };

  // Chip 표시 로직
  const selectedChips = [
    housingType && <Chip key="housing" label={`주거형태: ${housingType}`} color="primary" />,
    saleType && <Chip key="sale" label={`주택유형: ${saleType}`} color="primary" />,
    selectedAreas && (
      <Chip
        key="area"
        label={
          selectedAreas.includes('전체') 
            ? '면적: 전체'
            : (() => {
              const indices = selectedAreas.map(a => AREA_ORDER[a]);
              const min = Math.min(...indices);
              const max = Math.max(...indices);
              return min === max 
                ? `면적: ${AREA_TYPES[min]}` 
                : `면적: ${AREA_TYPES[min]} ~ ${AREA_TYPES[max]}`;
            })()
        }
        color="primary"
      />
    ),
    (jeonseRange[0] !== 0 || jeonseRange[1] !== JEONSE_VALUES.length - 1)
      ? <Chip
          key="jeonse"
          label={`전세(보증)금: ${formatMoney(JEONSE_VALUES[jeonseRange[0]])} ~ ${formatMoney(JEONSE_VALUES[jeonseRange[1]])}`}
          color="primary"
        />
      : <Chip key="jeonse" label="전세(보증)금: 전체" color="primary" />,
    (monthlyRange[0] !== 0 || monthlyRange[1] !== MONTHLY_VALUES.length - 1)
      ? <Chip
          key="monthly"
          label={`월세: ${formatMoney(MONTHLY_VALUES[monthlyRange[0]])} ~ ${formatMoney(MONTHLY_VALUES[monthlyRange[1]])}`}
          color="primary"
        />
      : <Chip key="monthly" label="월세: 전체" color="primary" />,
  ].filter(Boolean);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {/* 상단 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">검색 설정</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* 선택값 Chip 표시 */}
      <Box sx={{ mb: 2, minHeight: 40, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedChips.length > 0 ? selectedChips : <Typography variant="body2" color="text.secondary">선택된 조건이 없습니다.</Typography>}
      </Box>

      {/* 본문 컨텐츠 */}
      <Stack spacing={3}>
        {/* 주거형태 */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>주거형태</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
            }}
          >
            {HOUSING_TYPES.map(type => (
              <Button
                key={type}
                variant={housingType === type ? 'contained' : 'outlined'}
                onClick={() => setHousingType(type)}
                fullWidth
              >
                {type}
              </Button>
            ))}
          </Box>
        </Box>
        {/* 주택유형 */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>주택유형</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
            }}
          >
            {SALE_TYPES.map(type => (
              <Button
                key={type}
                variant={saleType === type ? 'contained' : 'outlined'}
                onClick={() => setSaleType(type)}
                fullWidth
              >
                {type}
              </Button>
            ))}
          </Box>
        </Box>
        {/* 면적 */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>면적</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
            }}
          >
            {AREA_TYPES.map(type => (
              <Button
                key={type}
                variant={selectedAreas.includes(type) ? 'contained' : 'outlined'}
                onClick={() => handleAreaChange(type)}
                sx={{
                  backgroundColor: selectedAreas.includes(type)
                    ? 'primary.main'
                    : 'background.paper',
                  color: selectedAreas.includes(type)
                    ? 'primary.contrastText'
                    : 'text.primary',
                  '&:hover': {
                    backgroundColor: selectedAreas.includes(type)
                      ? 'primary.dark'
                      : 'action.hover',
                  }
                }}
                fullWidth
              >
                {type}
              </Button>
            ))}
          </Box>
        </Box>
        {/* 전세(보증)금 슬라이더 (커스텀 구간, 마크 5개) */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>전세(보증)금(만원)</Typography>
          <Slider
            value={jeonseRange}
            min={0}
            max={JEONSE_VALUES.length - 1}
            step={1}
            marks={JEONSE_MARKS}
            onChange={handleJeonseChange}
            valueLabelDisplay="auto"
            valueLabelFormat={idx => formatMoney(JEONSE_VALUES[idx])}
            sx={{ width: 'calc(100% - 16px)', mx: 1 }}
            disableSwap
          />
        </Box>
        {/* 월세 슬라이더 (커스텀 구간, 마크 5개) */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>월세(만원)</Typography>
          <Slider
            value={monthlyRange}
            min={0}
            max={MONTHLY_VALUES.length - 1}
            step={1}
            marks={MONTHLY_MARKS}
            onChange={handleMonthlyChange}
            valueLabelDisplay="auto"
            valueLabelFormat={idx => formatMoney(MONTHLY_VALUES[idx])}
            sx={{ width: 'calc(100% - 16px)', mx: 1 }}
            disableSwap
          />
        </Box>
      </Stack>
      {/* 하단 액션 버튼 */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button variant="outlined" fullWidth onClick={handleReset}>초기화</Button>
        <Button variant="contained" fullWidth onClick={handleSearch}>검색</Button>
      </Box>
    </Box>
  );
};

export default SearchSetting;