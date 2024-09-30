import React from "react";
import { PiAirplaneTakeoff } from "react-icons/pi";
import { useFlightsMainContext } from "../../Context/Flights/FlightsMainContext";
import "../FLIGHTS/FlightApiCall/FlightPopup.css";
const FlightPopupList = ({ destination, item }) => {
  const { chooseCity } = useFlightsMainContext();

  return (
    <div
      className="popup-list-item"
      onClick={(e) => chooseCity(item.city, e, destination)}
    >
      <div className="flight-info">
        <PiAirplaneTakeoff className="airplane-icon" />
        <p className="city-country">
          {item.city}, {item.country}
        </p>
      </div>
      <div className="iata-code">{item.iata_code}</div>
    </div>
  );
};

export default FlightPopupList;
