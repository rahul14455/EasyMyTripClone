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
import { useNavigate } from "react-router-dom";
import Offers from "../Offers";
import toast from "react-hot-toast";

const Flights = () => {
  const { handleFilterChange, type } = useOffersContext();
  const {
    isFromPopupOpen,
    isToPopupOpen,
    isDatePopupOpen,
    travellersVisible,
    fromIndex,
    toIndex,
    travelClass,
    destinaionref,
    toref,
    year,
    month,
    weekday,
    day,
    number,
    fromIata_Code,
    toIata_Code,
    handleTo,
    handleClickOutside,
    handleFrom,
    handleDeparture,
    handleClass,
    dateref,
    classref,
  } = useFlightsMainContext();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const navigate = useNavigate();

  function handleMainSearch() {
    if (fromIndex !== toIndex) {
      const searchParams = new URLSearchParams();
      searchParams.append("source", fromIata_Code);
      searchParams.append("destination", toIata_Code);
      searchParams.append("day", weekday);
      searchParams.append("date", `${month}/${day}/${year}`);
      searchParams.append("passenger", travelClass);
      searchParams.append("number", number);
      navigate({
        pathname: "/FlightBooking",
        search: `?${searchParams.toString()}`,
      });
    } else {
      toast.dismiss();
      toast.error(
        "Cannot proceed further until the source and destination are different. Please correct it.",
        { style: { border: "1px solid black" } }
      );
    }
  }

  return (
    <div className="flightMainSection">
      <div className="flightSearchSection">
        <div className="flightSelection">
          <div className="flightFrom" onClick={handleFrom} ref={destinaionref}>
            <span className="flightLabelFTDT">
              <FaPlaneDeparture /> FROM
            </span>
            {!isFromPopupOpen && <FlightsNoPopup destination="from" />}
            {isFromPopupOpen && <FlightPopup destination="from" />}
          </div>

          <div className="flightTo" onClick={handleTo} ref={toref}>
            <span className="flightLabelFTDT">
              <FaPlaneArrival /> TO
            </span>
            {!isToPopupOpen && <FlightsNoPopup destination="to" />}
            {isToPopupOpen && <FlightPopup destination="to" />}
          </div>

          <div className="flightDate" onClick={handleDeparture} ref={dateref}>
            <span className="flightLabelFTDT">
              <FaCalendarAlt /> DEPARTURE DATE
            </span>
            {!isDatePopupOpen && <FlightDateNoPopup />}
            {isDatePopupOpen && <FlightDatePopup />}
          </div>

          <div className="flightTravel" onClick={handleClass} ref={classref}>
            <span className="flightLabelFTDT">TRAVELLERS & CLASS</span>
            {!travellersVisible && <TravellerClassNoPopup />}
            {travellersVisible && <TravellerClassPopupOpen />}
          </div>
        </div>
        <button className="flightSearchButton" onClick={handleMainSearch}>
          SEARCH
        </button>
      </div>
      <div className="offersOption">
        <h2>Exclusive Offers</h2>
        <ul>
          <li
            className={`${type === "ALL" ? "offerActive" : ""} `}
            onClick={() => handleFilterChange("ALL")}
          >
            BestOffer
          </li>
          <li
            className={`${type === "FLIGHTS" ? "offerActive" : ""} `}
            onClick={() => handleFilterChange("FLIGHTS")}
          >
            Flight
          </li>
          <li
            className={`${type === "HOTELS" ? "offerActive" : ""} `}
            onClick={() => handleFilterChange("HOTELS")}
          >
            Hotel
          </li>
          <li
            className={`${type === "CABS" ? "offerActive" : ""} `}
            onClick={() => handleFilterChange("CABS")}
          >
            Cab
          </li>
        </ul>
      </div>
      <div className="offersList">
        <Offers />
      </div>
    </div>
  );
};

export default Flights;
