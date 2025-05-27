import React, { useState } from 'react';
import { Stack, FormControl, Select, MenuItem, OutlinedInput, IconButton, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import regionData from '../../data/regionData.json';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: grey[400],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.dark,
  },
}));

const RealEstateAgencySearch = ({ onSearch }) => {
  const [province, setProvince] = useState('시도 전체');
  const [district, setDistrict] = useState('시군구 전체');
  const [keyword, setKeyword] = useState('');

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict('시군구 전체');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const provinceList = regionData.map(item => item.name);

  const selectedProvince = regionData.find(item => item.name === province);
  const districtList = selectedProvince ? selectedProvince.districts : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      province,
      district,
      keyword,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={1}>
        <FormControl fullWidth size="small">
          <CustomSelect
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            inputProps={{ 'aria-label': '시도선택' }}
          >
            {provinceList.map((p, idx) => (
              <MenuItem key={idx} value={p}>
                {p}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
        <FormControl fullWidth size="small" disabled={province === '시도 전체'}>
          <CustomSelect
            value={district}
            onChange={handleDistrictChange}
            displayEmpty
            inputProps={{ 'aria-label': '시군구선택' }}
          >
            {districtList.map((d, idx) => (
              <MenuItem key={idx} value={d}>
                {d}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={1}>
        <FormControl fullWidth size="small" variant="outlined">
          <CustomOutlinedInput
            placeholder="부동산중개소명으로 검색하세요."
            value={keyword}
            onChange={handleKeywordChange}
            name="keyword"
            endAdornment={
              <IconButton
                type="submit"
                edge="end"
                color="primary"
                aria-label="검색"
              >
                <SearchRoundedIcon fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
      </Stack>
    </form>
  );
};

export default RealEstateAgencySearch;