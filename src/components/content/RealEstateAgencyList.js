import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Checkbox, Typography, Button, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import RealEstateAgencyData from '../../data/RealEstateAgencyData.json';

const AgencyList = styled(List)(({ theme }) => ({
  padding: '0',
  '& > li': {
    gap: '0.5rem',
    paddingLeft: '0.25rem',
    border: `1px solid ${grey[300]}`,
    borderRadius: '0.25rem',
  },
  '& > li:not(:first-child)': {
    marginTop: '0.5rem'
  },
}));

const renderAgencyItem = (type, agency) => {
  switch (type) {
    case 'agencyTypeA':
      return (
        <ListItemText 
          primary={agency.officeName} 
          secondary={
            <>
              <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                {agency.officeAddress}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {agency.telNumber}
                <Button variant="text" sx={{ minWidth: '0', marginLeft: '0.75rem', padding: '0', fontSize: '0.813rem', lineHeight: 'inherit' }}>복사</Button>
              </Box>
            </>
          }
        />
      );
    case 'agencyTypeB':
      return (
        <>
          <ListItemText
            primary={agency.officeName} 
            secondary={
              <>
                <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                  대표 : {agency.ceoName}
                </Typography>
                <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                  소재지 : {agency.officeAddress}
                </Typography>
                <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                  등록번호 : {agency.regNumber}
                </Typography>
              </>
            }
          />
        </>
      );
    default:
      return (
        <ListItemText 
          primary={agency.officeName} 
          secondary={
            <>
              <Typography variant="body2" sx={{ margin: '0.125rem 0', color: 'text.primary' }}>
                {agency.officeAddress}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {agency.telNumber}
              </Box>
            </>
          }
        />
      );
  }
};

const RealEstateAgencyList = ({ type }) => {
  return (
    <AgencyList>
      {RealEstateAgencyData.map((agency) => (
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
        >
          <Checkbox size="small" />
          {renderAgencyItem(type, agency)}
        </ListItem>
      ))}
    </AgencyList>
  );
};

export default RealEstateAgencyList;