import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuList, MenuItem, ListItemText, Collapse, ListItemIcon, ListItemButton, Typography, styled } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronRight } from '@mui/icons-material';

const Menu1Depth = styled(ListItemButton)(({ theme }) => ({
  padding: '16px',
  '& .MuiListItemText-root': {
    margin: 0
  },
  '& .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 500,
  }
}));

const Menu2Depth = styled(MenuItem)(({ theme }) => ({
  padding: '0 16px 0 32px',
  '& .MuiTypography-root': {
    fontSize: '15px'
  }
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
          <React.Fragment key={item.name}>
            <Menu1Depth
              onClick={(e) => handleToggle(item.name, e)}
              selected={!!openMenus[item.name]}
            >
              <ListItemText primary={<Typography>{item.name}</Typography>} />
              {openMenus[item.name] ? <ExpandLess /> : <ExpandMore />}
            </Menu1Depth>
            <Collapse in={!!openMenus[item.name]} timeout="auto" unmountOnExit>
              <MenuList disablePadding>
                {item.children.map((child) => (
                  <Menu2Depth
                    component={Link}
                    to={child.path}
                    key={child.name}
                    onClick={onClose}
                  >
                    <ListItemText primary={<Typography>{child.name}</Typography>} />
                    <MenuListItemIcon>
                      <ChevronRight fontSize="small" />
                    </MenuListItemIcon>
                  </Menu2Depth>
                ))}
              </MenuList>
            </Collapse>
          </React.Fragment>
        ) : (
          <Menu1Depth
            component={Link}
            to={item.path}
            key={item.name}
            onClick={onClose}
          >
            <ListItemText primary={<Typography>{item.name}</Typography>} />
            <ChevronRight />
          </Menu1Depth>
        )
      )}
    </MenuList>
  );
};

export default RenderMenu;