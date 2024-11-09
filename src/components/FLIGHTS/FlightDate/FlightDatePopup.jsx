import React from "react";
import ReactDatePicker from "react-datepicker";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";

const FlightDatePopup = () => {
  const { selectedDate, handleDateChange, handleDateClose } =
    useFlightsMainContext();
  return (
    <div onClick={handleDateClose}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default FlightDatePopup;
