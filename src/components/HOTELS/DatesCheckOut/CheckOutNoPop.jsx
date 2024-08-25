import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

const CheckOutNoPop = () => {
  const [checkOutDate, setCheckOutDate] = useState();
  const [day, setDay] = useState();

  const handleDateOutChange = (date) => {
    setCheckOutDate(date);
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
    setDay(days[day]);
  };
  return (
    <div>
      <ReactDatePicker
        selected={checkOutDate}
        onChange={handleDateOutChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select check-out date"
      />
      {checkOutDate && <span>{day}</span>}
    </div>
  );
};

export default CheckOutNoPop;
