import { Box, ToggleButtonGroup, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  width: '100%',
  alignItems: 'center',
  '& > *': {
    flex: 1,
    minWidth: 0,
  },
}));

export const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  '& .MuiToggleButton-root': {
    flex: 1,
    maxWidth: 'none',
    height: 42,
    fontSize: 15,
    whiteSpace: 'nowrap',
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

export const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 42,
    boxSizing: 'border-box',
  },
  '& input': {
    paddingTop: 9.5,
    paddingBottom: 9.5,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
    paddingTop: 9.5,
    paddingBottom: 9.5,
    textAlign: 'right'
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

export const EndAdornment = styled('span')({
  paddingLeft: '8px',
  fontSize: 15,
  whiteSpace: 'nowrap'
});