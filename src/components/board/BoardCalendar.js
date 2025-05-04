import React from 'react';
import { LocalizationProvider, DateCalendar  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

const BoardCalendar = ({ selectedDate, setSelectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <DateCalendar 
        views={['year', 'month', 'day']}
        value={selectedDate}
        slotProps={{
          calendarHeader: { format: 'yyyy년 M월' },
        }}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </LocalizationProvider>
  );
};

export default BoardCalendar;