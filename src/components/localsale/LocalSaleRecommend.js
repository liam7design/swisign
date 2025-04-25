import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Button 
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link, useNavigate } from 'react-router-dom';
import LocalSaleItem from './LocalSaleItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SectionHeader = ({ title, link }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
    <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</Typography>
    <Button variant="text" size="small" endIcon={<AddRoundedIcon />} component={Link} to={link} sx={{ mr: -0.5 }}>더보기</Button>
  </Box>
);

const LocalSaleRecommend = ({ title, link, detailLink, data }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState({});

  // 좋아요 순으로 정렬
  const sortedItems = data.items.sort((a, b) => b.likes - a.likes);
  const displayItems = expanded ? sortedItems.slice(0, 4) : sortedItems.slice(0, 2);

  const handleLikeToggle = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleItemClick = (id) => {
    navigate(`${detailLink}/${id}`);
  };

  return (
    <>
      <SectionHeader title={title} link={link} />
      <Grid container spacing={2}>
        {displayItems.map((item) => (
          <Grid item xs={6} sm={6} key={item.id}>
            <LocalSaleItem
              item={item}
              liked={!!likes[item.id]}
              onLikeToggle={handleLikeToggle}
              onItemClick={handleItemClick}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 1, borderBottom: '1px solid #eeeeee' }}>
        <Button 
          variant="text" 
          onClick={() => setExpanded(!expanded)}
          fullWidth
          disableRipple
          sx={{ mb: 1 }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      </Box>
    </>
  );
};

export default LocalSaleRecommend;