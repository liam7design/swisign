import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MoreMenu = styled(Menu)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    gap: 8,
    fontSize: 14,
    '& .MuiListItemIcon-root': {
      minWidth: 0
    }
  }
}));

const ThreeDotsMenu = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (onEdit) onEdit();
    handleClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <MoreMenu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ fontSize: 14 }} onClick={handleEdit}>
          <ListItemIcon size="small">
            <EditIcon fontSize="small" />
          </ListItemIcon>
          수정
        </MenuItem>
        <MenuItem sx={{ fontSize: 14 }} onClick={handleDelete}>
          <ListItemIcon size="small" sx={{ minWidth: 0 }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          삭제
        </MenuItem>
      </MoreMenu>
    </div>
  );
};

export default ThreeDotsMenu;