import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const setHoursAndMinutes = (date, hours, minutes) => {
  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
};

const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  const getMinTime = (date) => {
    const now = new Date();
    return isToday(date) ? setHoursAndMinutes(now, now.getHours(), now.getMinutes()) : setHoursAndMinutes(new Date(), 0, 0);
  };

  const handleTimeInputChange = (date) => {
    if (!date) return;
    const minTime = getMinTime(date);
    setStartDate(isToday(date) && date < minTime ? minTime : date);
  };

  const maxTime = setHoursAndMinutes(new Date(), 23, 59);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 3);

  const filterTime = (time) => {
    return isToday(startDate) ? time >= getMinTime(startDate) : true;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>with 'showTimeInput'</h3>
      <DatePicker
        selected={startDate}
        onChange={handleTimeInputChange}
        showTimeInput
        minDate={new Date()}
        maxDate={maxDate}
        minTime={getMinTime(startDate)}
        maxTime={maxTime}
        placeholderText="Please Set Date Time"
        timeInputLabel="Time:"
        dateFormat="dd MMMM yyyy hh:mm a"
        filterTime={filterTime}
      />
      <h3>with 'showTimeSelect'</h3>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeIntervals={15}
        minDate={new Date()}
        maxDate={maxDate}
        minTime={getMinTime(startDate)}
        maxTime={maxTime}
        placeholderText="Please Set Date Time"
        timeInputLabel="Time:"
        dateFormat="dd MMMM yyyy hh:mm a"
        filterTime={filterTime}
      />
    </div>
  );
};

export default CustomDatePicker;
