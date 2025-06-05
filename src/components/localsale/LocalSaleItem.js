import React from 'react';
import { Card, Box, CardActionArea, CardMedia, CardContent, Typography, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LikedIconOff, LikedIconOn } from '../../assets/icons/SvgIcons';

const LocalSaleItemCard = styled(Card)(({ theme }) => ({
  width: '100%', 
  height: '100%', 
  borderRadius: 8, 
  borderColor: 'grey.200',
  boxSizing: 'border-box'
}));

const ItemTit = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: (theme.vars || theme).palette.text.primary,
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const ItemCont = styled(Typography)({
  marginTop: 2,
  color: '#555555',
});

const LocalSaleItem = ({
  item,
  liked,
  onLikeToggle,
  onItemClick,
}) => {
  return (
    <LocalSaleItemCard variant="outlined">
      <Box sx={{ position: 'relative' }}>
        <CardActionArea 
          disableRipple 
          onClick={() => onItemClick(item.id)}
          sx={{ height: '100%'}}
          >
          <CardMedia
            component="img"
            image={item.image[0]}
            alt={item.propertyType}
            sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', cursor: 'pointer' }}
          />
          <CardContent sx={{ height: '100%', pt: 1.5, pb: 2 }}>
            <ItemTit variant="h6" noWrap>{item.saleType} {item.price}</ItemTit>
            <ItemCont variant="body2" noWrap>{item.size} - {item.floor}</ItemCont>
            <ItemCont variant="body2" noWrap>{item.address}</ItemCont>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4, mt: 1.5 }}>
              {item.conditions.map((condition, index) => (
                <Chip 
                  key={index} 
                  label={condition} 
                  size="small"
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, padding: 0, color: 'white', backgroundColor: 'transparent' }}
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(item.id);
          }}
          disableRipple
        >
          {liked ? <LikedIconOn stroke="white" /> : <LikedIconOff stroke="white" />}
        </IconButton>
      </Box>
    </LocalSaleItemCard>
  );
};

export default LocalSaleItem;