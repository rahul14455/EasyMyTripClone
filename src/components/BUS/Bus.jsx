import React from "react";
import "./Bus.css";
import Offers from "../Offers";
import { useNavigate } from "react-router-dom";
import { useBusMainContext } from "../../Context/Bus/BusMainContext";
import BusPopup from "../BUS/Popups/BusPopup";
import BusNoPopup from "../BUS/Popups/BusNoPopup";
import DateNoPopup from "../TRAINS/DepartureDate/DateNoPopup";
import DatePopup from "./DatesPopup/DatePopup";

const Bus = () => {
  const {
    handleFrom,
    destinaionref,
    isFromPopupOpen,
    setIsFromPopupOpen,
    isToPopupOpen,
    setIsToPopupOpen,
    isDatePopupOpen,
    from,
    setFrom,
    to,
    setTo,
  } = useBusMainContext();

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/BusBooking");
  };

  return (
    <div>
      <div className="Bus-MainSection">
        <div className="caption-bus">Find Your Bus</div>
        <div className="Bus-ticket-Box">
          <div className="bsearch">
            <div className="bus" ref={destinaionref}>
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
                onFocus={() => {
                  setIsFromPopupOpen(true);
                  setIsToPopupOpen(false);
                }}
              />
              {isFromPopupOpen ? (
                <BusPopup destination="from" />
              ) : (
                <BusNoPopup destination="from" />
              )}
            </div>

            <div className="bus" ref={destinaionref}>
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
                onFocus={() => {
                  setIsToPopupOpen(true);
                  setIsFromPopupOpen(false);
                }}
              />
              {isToPopupOpen ? (
                <BusPopup destination="to" />
              ) : (
                <BusNoPopup destination="to" />
              )}
            </div>

            <div className="datepicker-bus">
              <label className="label" htmlFor="departureDate">
                Departure Date
              </label>
              {!isDatePopupOpen && <DateNoPopup />}
              {isDatePopupOpen && <DatePopup />}
            </div>

            <button className="search-button-bus" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <Offers />
    </div>
  );
};

export default Bus;
