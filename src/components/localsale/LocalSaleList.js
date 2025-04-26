import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  Chip
} from '@mui/material';
import propertyData from '../../data/LocalSaleData.json';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TuneIcon from '@mui/icons-material/Tune';
import LocalSaleItem from './LocalSaleItem';
import SearchSetting from './SearchSetting';

// 면적 상수 및 순서
const AREA_TYPES = ['전체', '10평이하', '10평대', '20평대', '30평대', '40평대', '50평대', '60평이상'];
const AREA_ORDER = AREA_TYPES.reduce((acc, cur, idx) => ({ ...acc, [cur]: idx }), {});

// 금액 포맷 함수 (SearchSetting.js와 동일하게 맞춰주세요)
function formatMoney(value) {
  if (value === 0) return '0원';
  if (value >= 10000) {
    const eok = Math.floor(value / 10000);
    const chun = value % 10000;
    if (chun === 0) return `${eok}억원`;
    return `${eok}억${chun / 1000 === 1 ? '' : chun / 1000}천만원`;
  }
  return value >= 1000 ? `${value / 1000}천만원` : `${value}만원`;
}

const LocalSaleList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [likes, setLikes] = useState({});
  const [searchSetting, setSearchSetting] = useState(null);

  const filteredItems = propertyData.items.filter(item => {
    // 검색어: address, propertyType, saleType에 포함되는지 확인
    const term = searchTerm.trim().toLowerCase();
    const matchesTerm =
      !term ||
      item.address.toLowerCase().includes(term) ||
      item.propertyType.toLowerCase().includes(term) ||
      item.saleType.toLowerCase().includes(term);
  
    // 조건 필터링 (searchSetting이 null이면 통과)
    let matchesCondition = true;
    if (searchSetting) {
      // saleType
      if (searchSetting.saleType && searchSetting.saleType !== '전체' && item.saleType !== searchSetting.saleType) {
        matchesCondition = false;
      }
      // housingType (propertyType)
      if (searchSetting.housingType && searchSetting.housingType !== '아파트' && item.propertyType !== searchSetting.housingType) {
        matchesCondition = false;
      }
      // 면적, 전세, 월세 등 추가 조건이 있으면 여기에 추가
    }
  
    return matchesTerm && matchesCondition;
  });

  const handleLikeToggle = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleItemClick = (id) => {
    navigate(`/LocalSaleDetail/${id}`);
  };

  const handleSettingOpen = () => setOpen(true);
  const handleSettingClose = () => setOpen(false);

  // SearchSetting에서 검색 시
  const handleSearchSetting = (settings) => {
    // "초기화 상태"라면 칩 안보이게 null 처리
    const isInitial =
      (!settings.housingType || settings.housingType === '아파트') &&
      (!settings.saleType || settings.saleType === '전체') &&
      (!settings.selectedAreas || settings.selectedAreas.includes('전체')) &&
      (!settings.jeonse || (settings.jeonse[0] === 0 && settings.jeonse[1] === 30000)) &&
      (!settings.monthly || (settings.monthly[0] === 0 && settings.monthly[1] === 300));
    setSearchSetting(isInitial ? null : settings);
    setOpen(false);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  // 칩 표시 로직
  const selectedChips = searchSetting ? [
    searchSetting.housingType && (
      <Chip key="housing" label={`주거형태: ${searchSetting.housingType}`} color="primary" />
    ),
    searchSetting.saleType && (
      <Chip key="sale" label={`주택유형: ${searchSetting.saleType}`} color="primary" />
    ),
    searchSetting.selectedAreas && (
      <Chip
        key="area"
        label={
          searchSetting.selectedAreas.includes('전체')
            ? '면적: 전체'
            : (() => {
                const indices = searchSetting.selectedAreas.map(a => AREA_ORDER[a]);
                const minIndex = Math.min(...indices);
                const maxIndex = Math.max(...indices);
                return minIndex === maxIndex
                  ? `면적: ${AREA_TYPES[minIndex]}`
                  : `면적: ${AREA_TYPES[minIndex]} ~ ${AREA_TYPES[maxIndex]}`;
              })()
        }
        color="primary"
      />
    ),
    searchSetting.jeonse && (
      (searchSetting.jeonse[0] === 0 && searchSetting.jeonse[1] === 30000)
        ? <Chip key="jeonse" label="전세(보증)금: 전체" color="primary" />
        : <Chip
            key="jeonse"
            label={`전세(보증)금: ${formatMoney(searchSetting.jeonse[0])} ~ ${formatMoney(searchSetting.jeonse[1])}`}
            color="primary"
          />
    ),
    searchSetting.monthly && (
      (searchSetting.monthly[0] === 0 && searchSetting.monthly[1] === 300)
        ? <Chip key="monthly" label="월세: 전체" color="primary" />
        : <Chip
            key="monthly"
            label={`월세: ${formatMoney(searchSetting.monthly[0])} ~ ${formatMoney(searchSetting.monthly[1])}`}
            color="primary"
          />
    )
  ].filter(Boolean) : [];

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="검색조건을 설정해 보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<TuneIcon />} onClick={handleSettingOpen} sx={{ whiteSpace: 'nowrap' }}>조건</Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleSettingClose}
          closeAfterTransition={false}
        >
          {/* key를 open마다 변경해 항상 fresh하게 초기화 */}
          <SearchSetting
            key={open ? Date.now() : ''}
            onClose={handleSettingClose}
            onSearch={handleSearchSetting}
          />
        </Dialog>
      </Box>
      {/* 선택값 Chip 표시 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ...(selectedChips.length > 0 && { mt: 2 }) }}>
        {selectedChips.length > 0 ? selectedChips : null}
      </Box>
      {filteredItems.length > 0 ? (
        <>
          <Box sx={{ mt: 5, mb: 5}}>
            <Grid container spacing={2}>
              {filteredItems.slice(0, visibleCount).map((item) => (
                <Grid item xs={6} key={item.id}> 
                  <LocalSaleItem
                    item={item}
                    liked={!!likes[item.id]}
                    onLikeToggle={handleLikeToggle}
                    onItemClick={handleItemClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {visibleCount < filteredItems.length && (
            <Button onClick={loadMore} variant="text" fullWidth sx={{ fontWeight: '500' }}>
              <AddRoundedIcon sx={{ fontSize: '1rem' }} /> 8개 더보기
            </Button>
          )}
        </>
      ) : (
        <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'text.secondary' }}>
          검색 결과가 없습니다
        </Box>
      )}
    </>
  );
};

export default LocalSaleList;