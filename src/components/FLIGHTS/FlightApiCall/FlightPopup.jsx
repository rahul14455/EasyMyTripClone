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
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Fetching the list of airports
  const list = flightsByCityName?.data?.airports;

  // Focus on the input field on component mount
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Handle search, filtering, and API call
  useEffect(() => {
    if (list) {
      // If search input is empty, show the full list, otherwise filter the list
      if (!search) {
        setFilteredSuggestions(list); // Display full list when input is empty
      } else {
        const filtered = list.filter((item) => {
          const airportName = item.name?.toLowerCase() || "";
          const airportCity = item.city?.toLowerCase() || "";
          const airportCode = item.code?.toLowerCase() || "";

          return (
            airportName.includes(search.toLowerCase()) ||
            airportCity.includes(search.toLowerCase()) ||
            airportCode.includes(search.toLowerCase())
          );
        });
        setFilteredSuggestions(filtered || []);
      }
    }
  }, [search, list]);

  // Fetch airport data via API when the component mounts
  useEffect(() => {
    flightListWithCityName(cityName);
  }, [cityName]);

  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <div className="flightPopup">
      <div className="flightSearchBox">
        <CiSearch className="flightSearchIcon" />
        <input
          className="flightSearchInput"
          type="text"
          ref={inputRef}
          placeholder={` ${destination.toUpperCase()}`}
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
      <div className="flightPopupList">
        {/* Display filtered suggestions or full list */}
        {filteredSuggestions?.length > 0 ? (
          filteredSuggestions.map((item, index) => (
            <FlightPopupList
              key={index}
              destination={destination}
              item={item}
            />
          ))
        ) : (
          <div className="">No suggestions found</div>
        )}
      </div>
      <div className="flightDummyClass"></div>
    </div>
  );
};

export default FlightPopup;
