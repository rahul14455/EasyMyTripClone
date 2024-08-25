import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";

const CheckOutNoPop = () => {
  const { selectedInDate, handleDateChange, dayOfWeek } = useHotelMainContext();
  return (
    <div>
      <div className="date-picker">
        <ReactDatePicker
          selected={selectedInDate}
          onChange={handleDateChange}
          className="date-input"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
      </div>
      {/* {selectedInDate && <span>{dayOfWeek}</span>} */}
    </div>
  );
};

export default CheckOutNoPop;
