import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import CustomDialog from '../ui/CustomDialog';

const DateTimeDialog = ({ 
  open, 
  onClose,
  title,
  dateTitle,
  timeTitle
}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      onClick1={onClose}
      title={title}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <Stack direction="column" spacing={2} mt={1}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#555', textAlign: 'left' }}>{dateTitle}</Typography>
            <DatePicker
              placeholder="날짜 선택"
              value={date}
              onChange={setDate}
              views={['year', 'month', 'day']}
              format="yyyy년 MM월 dd일"
              slotProps={{
                toolbar: { hidden: true }, 
                calendarHeader: { format: 'yyyy년 M월' },
                textField: { 
                  fullWidth: true, 
                  size: 'small',
                  onChange: () => {}, // 직접 입력 방지
                  InputProps: { readOnly: true }, // 직접 입력 방지
                }
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#555', textAlign: 'left' }}>{timeTitle}</Typography>
            <TimePicker
              placeholder="시간 선택"
              value={time}
              onChange={setTime}
              format="a hh시 mm분"
              slotProps={{
                textField: { 
                  fullWidth: true, 
                  size: 'small',
                  onChange: () => {}, // 직접 입력 방지
                  InputProps: { readOnly: true }, // 직접 입력 방지
                }
              }}
            />
          </Box>
        </Stack>
      </LocalizationProvider>
    </CustomDialog>
  );
};

export default DateTimeDialog;