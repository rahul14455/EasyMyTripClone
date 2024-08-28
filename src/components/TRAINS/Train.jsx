import React, { useState, useEffect } from "react";
import "./Train.css";
import { useTrainMainContext } from "../../Context/Trains/TrainMainContext";
import DateNoPopup from "./DepartureDate/DateNoPopup";
import DatePopup from "./DepartureDate/DatePopup";
import OfferComponent from "../OfferComponent";
import Offers from "../Offers";
import TrainPopup from "../TRAINS/TrainPopups/TrainPopup";
import TrainNoPopup from "./TrainPopups/TrainNoPopup";
import { trainCity } from "../Services/apiTrain";
const Train = ({ destination }) => {
  const {
    departureDate,
    to,
    setTo,
    from,
    setFrom,
    isToPopupOpen,
    setIsToPopupOpen,
    isFromPopupOpen,
    setIsFromPopupOpen,
    isDatePopupOpen,
    setDatePopupOpen,
    destinaionref,
    handleFrom,
  } = useTrainMainContext();

  const handleSearch = () => {
    // Handle the search logic here
  };

  return (
    <div>
      <div className="Train-MainSection">
        <div className="caption-train">
          <img
            src="https://www.easemytrip.com/images/train-img/train-icon.svg"
            alt="irctc"
          />
          <p>Book Train Tickets</p>
        </div>

        <div className="Train-ticket-Box">
          <div className="tsearch">
            <div className="train" onClick={handleFrom} ref={destinaionref}>
              <label className="label" htmlFor="from">
                From
              </label>
              <input
                type="text"
                id="from"
                className="train-input"
                placeholder="Enter departure station"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => {
                  setIsFromPopupOpen(true);
                  setIsToPopupOpen(false);
                }}
              />
              {isFromPopupOpen ? (
                <TrainPopup destination="from" />
              ) : (
                <TrainNoPopup destination="from" />
              )}
            </div>

            <div className="train" onClick={handleFrom} ref={destinaionref}>
              <label className="label" htmlFor="to">
                To
              </label>
              <input
                type="text"
                id="to"
                className="train-input"
                placeholder="Enter destination station"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => {
                  setIsToPopupOpen(true);
                  setIsFromPopupOpen(false);
                }}
              />
              {isToPopupOpen ? (
                <TrainPopup destination="to" />
              ) : (
                <TrainNoPopup destination="to" />
              )}
            </div>

            <div className="datepicker-train">
              <label className="label" htmlFor="departureDate">
                Departure Date
              </label>
              {!isDatePopupOpen && <DateNoPopup />}
              {isDatePopupOpen && <DatePopup />}
            </div>

            <button className="search-button-train" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="bottom-heading">
          <img
            src="https://www.easemytrip.com/images/train-img/IRCTC-logo-nw2.png"
            className="irctc-logo"
            alt="logo"
          />
          <p>IRCTC Authorized Partner</p>
        </div>
      </div>
      <Offers />
    </div>
  );
};

export default Train;
