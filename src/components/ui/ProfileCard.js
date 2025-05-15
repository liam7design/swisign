import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Avatar, Box, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { LikedIconOff, LikedIconOn } from '../../assets/icons/SvgIcons';

const ProfileCard = ({
  title,
  avatar,
  name,
  sale,
  jeonse,
  monthly,
  bookmark,
  onBookmarkToggle,
  likes,
  onLikeToggle,
}) => {
  return (

    <Card variant="outlined" sx={{ borderRadius: 2, borderColor: 'grey.400' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <IconButton edge="end" aria-label="bookmark" onClick={onBookmarkToggle} sx={{ width: '40px', height: '40px', mt: -0.5 }}>
            {bookmark ? <BookmarkIcon color="primary" /> : <BookmarkIcon color="disabled" />}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Avatar
            alt={name}
            src={avatar}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mr: 1, color: 'text.primary', fontSize: '1.125rem' }}>{name}</Typography>
                <IconButton aria-label="phone" sx={{ mr: 2, p: 0 }}><PhoneIcon color="primary" fontSize="small" /></IconButton>
              </Box>
              <IconButton edge="end" aria-label="like" onClick={onLikeToggle} sx={{ ml: 'auto' }}>
                {likes ? <LikedIconOn stroke="black" /> : <LikedIconOff stroke="black" />}
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              매매 <Typography variant="body2" sx={{ color: '#f57c00', fontWeight: '500' }} component="span">{sale}</Typography>,
              전세 <Typography variant="body2" sx={{ color: '#f57c00', fontWeight: '500' }} component="span">{jeonse}</Typography>,
              월세 <Typography variant="body2" sx={{ color: '#f57c00', fontWeight: '500' }} component="span">{monthly}</Typography>
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" fullWidth>계약서 작성</Button>
        <Button variant="contained" size="small" fullWidth>방문 요청</Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
