import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import SaleConditionForm from '../form/SaleConditionForm';
import PhotoUploadGrid from '../form/PhotoUploadGrid';

const BoardDetail = ({ data, type, showYoutube = false, showSource = false }) => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const boardItem = data.find((item) => item.id === parseInt(id));
  const [state, setState] = useState('request');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  if (!boardItem) {
    return <Box>해당 게시물을 찾을 수 없습니다.</Box>;
  }

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

  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {
    case "sale":
      return (
        <>
          <Typography variant="h6" sx={{ mb: 1.5, fontSize: 18 }}>매물정보</Typography> 
          <List sx={{ marginBottom: '2rem', padding: '0', borderTop: `1px solid ${grey[300]}` }}>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소</Typography>
              <Typography variant="body2">서울특별시 강동구 천호동</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소_지번</Typography>
              <Typography variant="body2">50-22</Typography>
              <IconButton aria-label="map" sx={{ marginLeft: 'auto', p: 0 }}>
                <MapOutlinedIcon />
              </IconButton>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>주소_도로명</Typography>
              <Typography variant="body2">서울특별시 강동구 천중로43길 48(천호동)</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>층/호/면적</Typography>
              <Typography variant="body2">2층 / 201호 / 14.8</Typography>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>진행상태</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  value={state}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="request">요청</MenuItem>
                  <MenuItem value="register">등록</MenuItem>
                  <MenuItem value="inProgress">진행</MenuItem>
                  <MenuItem value="complete">완료</MenuItem>
                  <MenuItem value="cancel">취소</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem sx={{ minHeight: '2.5rem', padding: '0.5rem 0.25rem', borderBottom: `1px solid ${grey[300]}` }}>
              <Typography variant="body2" sx={{ flex: '0 0 6rem', color: grey[800] }}>등록일시</Typography>
              <Typography variant="body2">2024.10.03</Typography>
            </ListItem>
          </List>
          <SaleConditionForm />
          <PhotoUploadGrid
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            maxCount={10}
          />
        </>
      );
    default:
      return (
        <>
          <Typography component="h3" sx={{ 
            fontSize: '1.75rem',
            fontWeight: 'medium',
            lineHeight: 1.3,
          }}>{boardItem.title}</Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 3,
            color: 'grey.600',
            fontSize: '0.875rem',
          }}>
            <Box component="p" sx={{ m: 0 }}>등록일: {boardItem.date}</Box>
            <Box component="p" sx={{ m: 0 }}>조회수: {boardItem.views}</Box>
          </Box>
          <Box sx={{ 
            mt: 4, 
            mb: 4, 
            pt: 4, 
            pb: 4, 
            borderTop: 1, 
            borderBottom: 1, 
            borderColor: 'grey.200',
            color: 'grey.900',
            fontSize: '1.125rem',
            fontWeight: 'regular',
            lineHeight: 1.5,
          }}>
            {showYoutube && (
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                <iframe
                  title={boardItem.title}
                  src={`https://www.youtube.com/embed/${boardItem.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                ></iframe>
              </Box>
            )}
            <Box>{boardItem.content}</Box>
            {showSource && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 3,
                color: 'grey.600',
                fontSize: '0.875rem',
              }}>[ 출처 : {boardItem.source} ]</Box>
            )}
          </Box>
          <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>닫기</Button>
        </>
      );
  }
};

export default BoardDetail;