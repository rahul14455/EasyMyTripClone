import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import { flightListWithCityName } from "../../Services/apiFlights";
import useFlightListWithCityName from "./useFlightListWithCityName";
import FlightPopupList from "../FlightPopupList";
import "../FlightApiCall/FlightPopup.css"; // Import your CSS file here

const FlightPopup = ({ destination, from, setFrom }) => {
  const { inputRef, search, setSearch, cityName, setCityName } =
    useFlightsMainContext();
  const { flightsByCityName } = useFlightListWithCityName();
  const list = flightsByCityName?.data.airports;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (search) setCityName(search);
    if (!search) setCityName(null);
    flightListWithCityName(cityName);
  }, [search, setCityName, cityName]);

  return (
    <div
      className="flight-popup "
      style={{ left: destination === "to" ? "260px" : "-0px" }}
    >
      <div className="searchbox">
        <CiSearch />
        <input
          type="text"
          ref={inputRef}
          placeholder={`Search ${destination}`}
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 0 && /^[a-zA-Z\s]*$/.test(value)) {
              setSearch(value);
            } else {
              setSearch("");
            }
          }}
        />
      </div>
      <div className="flight-list">
        {list?.map((item, index) => (
          <FlightPopupList key={index} destination={destination} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FlightPopup;
