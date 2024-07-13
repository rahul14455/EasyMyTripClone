import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useHotelMainContext } from "../../../../Context/Hotels/HotelMainContext";

const CheckInNoPopup = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const { setDayOfWeek, dayOfWeek } = useHotelMainContext();
  const handleDateInChange = (date) => {
    setCheckInDate(date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date).getDay();
    setDayOfWeek(days[day]);
  };
  return (
    <div>
      <ReactDatePicker
        selected={checkInDate}
        onChange={handleDateInChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select check-in date"
      />
      {checkInDate && <span>{dayOfWeek}</span>}
    </div>
  );
};

export default CheckInNoPopup;
