import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import "../FlightApiCall/FlightNoPopup.css";

const FlightsNoPopup = ({ destination }) => {
  const {
    fromCity,
    fromName,
    fromCountry,
    fromIata_Code,
    toCity,
    toCountry,
    toIata_Code,
    toName,
  } = useFlightsMainContext();
  let city, iataCode, name, country;
  if (destination === "from") {
    city = fromCity;
    iataCode = fromIata_Code;
    name = fromName;
    country = fromCountry;
  }
  if (destination === "to") {
    city = toCity;
    iataCode = toIata_Code;
    name = toName;
    country = toCountry;
  }
  return (
    <div
      style={{
        // border: "2px solid red",
        padding: "2px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <h1
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {city}
      </h1>
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        [{iataCode}] {name} {country}
      </div>
    </div>
  );
};

export default FlightsNoPopup;
