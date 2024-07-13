import React, { useState } from "react";
import "./Bus.css"; // Assuming you have a CSS file for styles
import OfferComponent from "../OfferComponent";

const Bus = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleSearch = () => {
    // Handle the search logic here
    console.log({ from, to, departureDate });
  };

  return (
    <div>
      <div className="Bus-MainSection">
        <div className="caption-bus">Find Your Bus</div>
        <div className="Bus-ticket-Box">
          <div className="bsearch">
            <div className="bus">
              <label className="label" htmlFor="from">
                From
              </label>
              <input
                type="text"
                id="from"
                className="bus-input"
                placeholder="Enter departure city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="bus">
              <label className="label" htmlFor="to">
                To
              </label>
              <input
                type="text"
                id="to"
                className="bus-input"
                placeholder="Enter destination city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="datepicker-bus">
              <label className="label" htmlFor="departureDate">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                className="date-input"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
            <button className="search-button-bus" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {/* <OfferComponent /> */}
    </div>
  );
};

export default Bus;
