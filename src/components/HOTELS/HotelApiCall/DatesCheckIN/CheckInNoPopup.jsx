import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useHotelMainContext } from "../../../../Context/Hotels/HotelMainContext";

const CheckInNoPopup = () => {
  const { setDayOfWeek, dayOfWeek, selectedOutDate, setSelectedOutDate } =
    useHotelMainContext();
  const handleDateInChange = (date) => {
    setSelectedOutDate(date);
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
        selected={selectedOutDate}
        onChange={handleDateInChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select check-in date"
      />
      {/* {selectedOutDate && <span>{dayOfWeek}</span>} */}
    </div>
  );
};

export default CheckInNoPopup;
