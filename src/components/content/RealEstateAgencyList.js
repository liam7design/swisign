import React, { useState } from 'react';
import { Box, List, ListItem, IconButton, Checkbox, Typography, Button, styled } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RealEstateAgencyData from '../../data/RealEstateAgencyData.json';

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
    // 시도 전체면 무시
    if (province && province !== '시도 전체' && agency.officeAddress && !agency.officeAddress.includes(province)) return false;
    // 시군구 전체면 무시
    if (district && district !== '시군구 전체' && agency.officeAddress && !agency.officeAddress.includes(district)) return false;
    // 키워드는 그대로
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

const RealEstateAgencyList = ({
  type = 'default',
  province = '',
  district = '',
  keyword = ''
}) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const filteredData = filterAgencies(RealEstateAgencyData, province, district, keyword);

  const loadMore = () => setVisibleCount((prev) => prev + 10);

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
              <>
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
              </>
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

export default RealEstateAgencyList;