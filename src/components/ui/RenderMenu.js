import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuList, MenuItem, ListItemText, Collapse, ListItemIcon, ListItemButton, Typography, styled } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronRight } from '@mui/icons-material';

const Menu1Depth = styled(ListItemButton)(({ theme }) => ({
  padding: '12px 16px',
  '& .MuiListItemText-root': {
    margin: 0
  },
  '& .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 500,
  },
  
  '&:hover': {
    backgroundColor: 'unset',
  },
  '&.Mui-selected': {
    backgroundColor: 'unset',
    '&:hover': {
      backgroundColor: 'unset',
    }
  }
}));

const Menu2Depth = styled(MenuItem)(({ theme }) => ({
  padding: '11px 16px 11px 32px',
  minHeight: 'auto',
  '& .MuiTypography-root': {
    fontSize: '15px'
  },
  '&:hover': {
    backgroundColor: 'unset',
  },
}));

const MenuListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '0 !important'
}));

const RenderMenu = ({
  data,
  onClose,
}) => {
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (menuName, event) => {
    event.stopPropagation();
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <MenuList disablePadding>
      {data.map((item) =>
        item.children ? (
          <div key={item.name}>
            <Menu1Depth
              onClick={(e) => handleToggle(item.name, e)}
              selected={!!openMenus[item.name]}
              disableRipple
            >
              <ListItemText primary={<Typography>{item.name}</Typography>} />
              {openMenus[item.name] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Menu1Depth>
            <Collapse in={!!openMenus[item.name]} timeout="auto" unmountOnExit>
              <MenuList disablePadding>
                {item.children.map((child) => (
                  <Menu2Depth
                    component={Link}
                    to={child.path}
                    key={child.name}
                    onClick={onClose}
                    disableRipple
                  >
                    <ListItemText primary={<Typography>{child.name}</Typography>} />
                    <MenuListItemIcon>
                      <ChevronRight fontSize="small" />
                    </MenuListItemIcon>
                  </Menu2Depth>
                ))}
              </MenuList>
            </Collapse>
          </div>
        ) : (
          <Menu1Depth
            component={Link}
            to={item.path}
            key={item.name}
            onClick={onClose}
            disableRipple
          >
            <ListItemText primary={<Typography>{item.name}</Typography>} />
            <ChevronRight fontSize="small" />
          </Menu1Depth>
        )
      )}
    </MenuList>
  );
};

export default RenderMenu;