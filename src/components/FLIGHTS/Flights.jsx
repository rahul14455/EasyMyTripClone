import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Flights.css";
import { useOffersContext } from "../../Context/OffersContext";
import FlightPopup from "./FlightApiCall/FlightPopup";
import FlightsNoPopup from "./FlightApiCall/FlightsNoPopup";
import { useFlightsMainContext } from "../../Context/Flights/FlightsMainContext";
import FlightDateNoPopup from "./FlightDate/FlightDateNoPopup";
import FlightDatePopup from "./FlightDate/FlightDatePopup";
import TravellerClassNoPopup from "./Traveller&Class/TravellerClassNoPopup";
import TravellerClassPopupOpen from "./Traveller&Class/TravellerClassPopupOpen";
import OfferComponent from "../OfferComponent";
import Navbar from "../NAVBAR/Navbar";
import { useNavigate } from "react-router-dom";
import Offers from "../Offers";

const Flights = () => {
  const { handleFilterChange } = useOffersContext();
  const {
    isFromPopupOpen,
    isToPopupOpen,
    handleFrom,
    handleTo,
    handleClickOut,
    destinaionref,
    toHandleClickout,
    toref,
    isDatePopupOpen,
    travellersVisible,
  } = useFlightsMainContext();

  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [handleClickOut]);

  useEffect(() => {
    document.addEventListener("click", toHandleClickout);
    return () => {
      document.removeEventListener("click", toHandleClickout);
    };
  }, [toHandleClickout]);
  const navigate = useNavigate();

  function HandleGo() {
    navigate("/FlightBooking");
  }

  return (
    <div className="Flight-MainSection">
      {/* <p className="caption">Search Lowest Price</p> */}
      <div className="Flight-ticket-Box">
        <div className="search-container">
          <div className="flight from" onClick={handleFrom} ref={destinaionref}>
            <span className="label">
              <FaPlaneDeparture /> FROM
            </span>
            {!isFromPopupOpen && <FlightsNoPopup destination="from" />}
            {isFromPopupOpen && (
              <FlightPopup destination="from" from="from" setFrom="setFrom" />
            )}
          </div>

          <div className="flight to" onClick={handleTo} ref={toref}>
            <span className="label">
              <FaPlaneArrival /> TO
            </span>
            {!isToPopupOpen && <FlightsNoPopup destination="to" />}
            {isToPopupOpen && <FlightPopup destination="to" />}
          </div>

          {/* Date picker component should be here */}

          <div className="datepicker">
            <span className="label">
              <FaCalendarAlt /> DEPARTURE DATE
            </span>
            {!isDatePopupOpen && <FlightDateNoPopup />}
            {isDatePopupOpen && <FlightDatePopup />}
          </div>

          {/* Travellers & class dropdown component should be here */}
          <div className="travellers">
            <span className="label">TRAVELLERS & CLASS</span>
            {!travellersVisible && <TravellerClassNoPopup />}
            {travellersVisible && <TravellerClassPopupOpen />}
          </div>
        </div>
        <button className="search-button" onClick={HandleGo}>
          SEARCH
        </button>
      </div>
      <div className="offer-caption">
        <h2>Exclusive Offers</h2>
        <ul>
          <li onClick={() => handleFilterChange("ALL")}>BestOffer</li>
          <li onClick={() => handleFilterChange("FLIGHTS")}>Flight</li>
          <li onClick={() => handleFilterChange("HOTELS")}>Hotel</li>
          <li onClick={() => handleFilterChange("CABS")}>Cab</li>
        </ul>
      </div>
      <div>
        <Offers />
      </div>
    </div>
  );
};

export default Flights;
