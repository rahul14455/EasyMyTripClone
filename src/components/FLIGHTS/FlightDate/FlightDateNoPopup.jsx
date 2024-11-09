import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import "../FlightDate/FlightDate.css";
import { FaCalendarAlt } from "react-icons/fa";

const FlightDateNoPopup = () => {
  const { weekday, year, month, day } = useFlightsMainContext();
  return (
    <div className="flightDateNP">
      <div>
        <span className="flightDateNPDay">{day}</span> {month}'{year}
        {"  "}
        <FaCalendarAlt />
      </div>
      <div>{weekday}</div>
    </div>
  );
};

export default FlightDateNoPopup;
