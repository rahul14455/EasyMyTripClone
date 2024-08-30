import React from "react";
import ReactDatePicker from "react-datepicker";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
const DateNoPopup = () => {
  const { departureDate, setDepartureDate, dayOfWeek, setDayOfWeek } =
    useBusMainContext();
  const handleBusDateChange = (date) => {
    setDepartureDate(date);
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
        selected={departureDate}
        onChange={handleBusDateChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      <div>{departureDate && <span></span>}</div>
    </div>
  );
};

export default DateNoPopup;
