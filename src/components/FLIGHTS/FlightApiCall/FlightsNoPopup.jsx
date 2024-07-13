import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";

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
    <div>
      <h1>{city}</h1>
      <span>
        {iataCode}, {name} {country}
      </span>
    </div>
  );
};

export default FlightsNoPopup;
