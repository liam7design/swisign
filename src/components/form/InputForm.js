import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';

import ClearIcon from '@mui/icons-material/Clear';

function InputForm({
  label,
  value,
  onChange,
  error,
  helperText,
  autoFocus,
  use = 'text', // 기본값은 일반 텍스트 입력
  name,
  ...rest
}) {
  const [show, setShow] = useState(false);

  const isPassword = use === 'password';
  const inputType = isPassword ? (show ? 'text' : 'password') : 'text';

  // x버튼 클릭 시 name을 유지한 채로 value만 ''로 변경
  const handleClear = () => {
    if (onChange) {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <TextField
      label={label}
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      autoFocus={autoFocus}
      fullWidth
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