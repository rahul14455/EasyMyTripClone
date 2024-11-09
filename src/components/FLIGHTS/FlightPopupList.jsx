import React from "react";
import { PiAirplaneTakeoff } from "react-icons/pi";
import { useFlightsMainContext } from "../../Context/Flights/FlightsMainContext";
import "../FLIGHTS/FlightApiCall/FlightPopup.css";
const FlightPopupList = ({ destination, item }) => {
  const { chooseCity } = useFlightsMainContext();

  return (
    <div
      className="flightPopupListItem"
      onClick={(e) => chooseCity(item.city, e, destination)}
    >
      <div className="flightPopupInfo">
        <PiAirplaneTakeoff className="" />
        <p className="">
          {item.city}, {item.country}
        </p>
      </div>
      <div className="">{item.iata_code}</div>
    </div>
  );
};

export default FlightPopupList;
