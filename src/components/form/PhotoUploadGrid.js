import React from 'react';
import { Box, IconButton, Typography, Card, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const GuideMsg = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100],
}));

const PhotoUploadGrid = ({
  photos = [],
  onAddPhoto,
  onRemovePhoto,
  maxCount = 10
}) => {
  const showAddButton = photos.length < maxCount;
  const items = [...photos];
  if (showAddButton) items.push({ isAddButton: true });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 0.5, fontSize: 18 }}>사진 첨부</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>임대물건에 대한 사진을 첨부하고 빠른 계약 진행하세요.</Typography>
      <GuideMsg variant="outlined" sx={{ mb: 2 }}>
        <ErrorIcon fontSize="small" />
        <Typography variant="body2">최대 {maxCount}개까지 등록 가능합니다.</Typography>
      </GuideMsg>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1
      }}>
        {items.map((item, idx) =>
          item.isAddButton ? (
            <Box
              key={`add-btn-${idx}`}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'calc(25% - 6px)',
                aspectRatio: '1 / 1',
                border: '1px dashed #000',
                borderRadius: 1,
                background: '#fafafa',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onClick={onAddPhoto}
            >
              <CameraAltOutlinedIcon color="primary" fontSize="large" />
            </Box>
          ) : (
            <Box
              key={item.id || idx}
              sx={{
                position: 'relative',
                width: 'calc(25% - 6px)',
                aspectRatio: '1 / 1',
                borderRadius: 1,
                border: '1px solid #eee',
                background: '#f5f5f5',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <img
                src={item.url}
                alt={`사진${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              {onRemovePhoto && (
                <IconButton
                  size="small"
                  onClick={() => onRemovePhoto(item, idx)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    color: 'rgba(255,255,255,1)',
                    background: 'rgba(0,0,0,0.5)',
                    transform: 'translate(-50%, -50%)',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.5)',
                    }
                  }}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}

export default PhotoUploadGrid;