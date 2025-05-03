import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Slide,
  Paper,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Stack,
  Chip
} from '@mui/material';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

const BottomSheet = ({
  title,
  data = [],
  value1 = '',
  value2 = '',
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedObj) => {
    onChange(selectedObj);
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'flex-start',  gap: 1, mb: 2 }}>
        <Chip size="small" color="primary" label={value1} sx={{ borderRadius: '0.25rem' }} />
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            mt: 0.25,
            textAlign: 'left',
            color: 'text.primary',
            fontWeight: 500,
            lineHeight: 1.4,
            wordBreak: 'keep-all'
          }}
        >
          {value2 || '선택해주세요'}
        </Typography>
        <IconButton aria-label="선택" sx={{ margin: '-8px -10px 0 auto' }} onClick={() => setOpen(true)}>
          <ViewListOutlinedIcon color="primary" />
        </IconButton>
      </Stack>
      {open && 
        <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, backgroundColor: 'rgba(0,0,0,0.4)' }} />
      }
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: '60vh',
            overflowY: 'auto',
            zIndex: (theme) => theme.zIndex.drawer,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            p: 0
          }}
          elevation={4}
          role="dialog"
          aria-modal="true"
        >
          <Typography variant="h6" component="h2" p={2.5}>{title}</Typography>
          <List sx={{ maxHeight: '40vh', overflowY: 'auto' }} disablePadding>
            {data.map((item, index) => (
              <ListItem
                button="true"
                key={item.id || index}
                onClick={() => handleSelect(item)}
                divider={index < data.length - 1}
                sx={{ px: 2.5, py: 1.25 }}
              >
                <ListItemText
                  primary={item.address}
                  primaryTypographyProps={{
                    variant: 'body1',
                    color: 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Slide>
    </>
  );
}

export default BottomSheet;