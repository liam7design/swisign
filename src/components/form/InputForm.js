import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';

import ClearIcon from '@mui/icons-material/Clear';

function InputForm({
  label,
  placeholder, // placeholder prop 추가
  value,
  onChange,
  error,
  helperText,
  autoFocus,
  use = 'text',
  name,
  ...rest
}) {
  const [show, setShow] = useState(false);

  const isPassword = use === 'password';
  const inputType = isPassword ? (show ? 'text' : 'password') : 'text';

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder || label} // placeholder가 없으면 label을 placeholder로 사용
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      autoFocus={autoFocus}
      fullWidth
      // placeholder가 있거나, 값이 있을 때 label을 항상 축소 상태로 유지
      InputLabelProps={{
        shrink: !!placeholder || !!value,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <IconButton
                aria-label={`clear ${label}`}
                onClick={handleClear}
                edge="end"
                tabIndex={-1}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            {isPassword && (
              <IconButton
                aria-label={`toggle ${label} visibility`}
                onClick={() => setShow(s => !s)}
                edge="end"
                tabIndex={-1}
              >
                {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export default InputForm;