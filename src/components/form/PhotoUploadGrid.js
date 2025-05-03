import React from 'react';
import { Box, IconButton } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  );
}

export default PhotoUploadGrid;