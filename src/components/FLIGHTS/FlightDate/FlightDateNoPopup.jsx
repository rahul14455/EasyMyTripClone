import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import ReactDatePicker from "react-datepicker";
import "../FlightDate/FlightDate.css";

const FlightDateNoPopup = () => {
  const { handleDateChange, dayOfWeek, selectedDate } = useFlightsMainContext();
  return (
    <div>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      {selectedDate && <span>{dayOfWeek}</span>}
    </div>
  );
};

export default FlightDateNoPopup;
