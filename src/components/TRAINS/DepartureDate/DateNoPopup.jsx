import React, { useState } from "react";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import ReactDatePicker from "react-datepicker";

const DateNoPopup = () => {
  const { dayOfWeek, setDayOfWeek, departureDate, setDepartureDate } =
    useTrainMainContext();

  const handleTrainDateChange = (date) => {
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
        onChange={handleTrainDateChange}
        className="date-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      <div>{departureDate && <span></span>}</div>
    </div>
  );
};

export default DateNoPopup;
