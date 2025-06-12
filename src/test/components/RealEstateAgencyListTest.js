import React, { useState, useEffect, useMemo } from 'react';
import { Box, List, ListItem, IconButton, Checkbox, Typography, Button, CircularProgress, styled } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { fetchAgencyList } from '../../services/agencyService';

const AgencyList = styled(List)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  marginTop: '40px',
  '& > li': {
    gap: 8,
    padding: '16px 16px 16px 4px',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    '&.isRightBtn': {
      paddingRight: '48px'
    }
  },
  '& > li:not(:first-of-type)': {
    marginTop: 8
  },
}));

const renderAgencyItem = (type, agency) => {
  switch (type) {
    case 'agencyTypeA':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.primary' }}>
          <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: 500 }}>{agency.officeName}</Typography>
          <Typography variant="body2">{agency.officeAddress}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">{agency.telNumber}</Typography>
            <Button variant="outlined" size="small" sx={{ minWidth: 0, padding: '2px 4px', fontWeight: 400,   lineHeight: 1 }}>복사</Button>
          </Box>
        </Box>
      );
    case 'agencyTypeB':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.primary' }}>
          <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: 500 }}>{agency.officeName}</Typography>
          <Typography variant="body2">대표 : {agency.ceoName}</Typography>
          <Typography variant="body2">소재지 : {agency.officeAddress}</Typography>
          <Typography variant="body2">등록번호 : {agency.regNumber}</Typography>
        </Box>
      );
    default:
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.primary' }}>
          <Typography variant="body1" sx={{ marginBottom: '4px', fontWeight: 500 }}>{agency.officeName}</Typography>
          <Typography variant="body2">{agency.officeAddress}</Typography>
          <Typography variant="body2">{agency.telNumber}</Typography>
        </Box>
      );
  }
};

const filterAgencies = (data, province, district, keyword) => {
  return data.filter(agency => {
    if (province && province !== '시도 전체' && agency.officeAddress && !agency.officeAddress.includes(province)) return false;
    if (district && district !== '시군구 전체' && agency.officeAddress && !agency.officeAddress.includes(district)) return false;
    if (
      keyword &&
      !(
        agency.officeName.includes(keyword) ||
        agency.ceoName.includes(keyword) ||
        agency.telNumber.includes(keyword) ||
        agency.officeAddress.includes(keyword)
      )
    ) {
      return false;
    }
    return true;
  });
};

const RealEstateAgencyListTest = ({
  type = 'default',
  province = '',
  district = '',
  keyword = ''
}) => {
    // [추가] API 연동을 위한 상태 관리
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(10);

  // [추가] API 데이터를 비동기적으로 가져오는 로직
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAgencyList();
        setAgencies(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // [개선] 데이터나 필터 조건이 바뀔 때만 필터링을 다시 실행하도록 useMemo로 최적화
  const filteredData = useMemo(() => {
    return filterAgencies(agencies, province, district, keyword);
  }, [agencies, province, district, keyword]);

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  // [추가] 로딩 및 에러 상태에 대한 UI
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'error.main' }}>
        데이터를 불러오는 중 오류가 발생했습니다. ({error.message})
      </Box>
    );
  }

  return (
    <>
      {filteredData.length === 0 ? (
        <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'text.secondary' }}>
          검색 결과가 없습니다
        </Box>
      ) : (
        <>
          <AgencyList>
            {filteredData.slice(0, visibleCount).map((agency) => (
              <ListItem
                key={agency.id}
                secondaryAction={
                  type === 'agencyTypeA'
                    ? (
                      <IconButton edge="end" aria-label="map">
                        <MapOutlinedIcon />
                      </IconButton>
                    )
                    : null
                }
                className={ type === 'agencyTypeA' ? 'isRightBtn' : '' }
              >
                <Checkbox size="small" />
                {renderAgencyItem(type, agency)}
              </ListItem>
            ))}
          </AgencyList>
          {filteredData.length > visibleCount && (
            <Button onClick={loadMore} variant="text" fullWidth sx={{ mt: 4, fontWeight: '500' }}><AddRoundedIcon sx={{ fontSize: '1rem' }} /> 10개 더보기</Button>
          )}
        </>
      )}
    </>
  );
};

export default RealEstateAgencyListTest;