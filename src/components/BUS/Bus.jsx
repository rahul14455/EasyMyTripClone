import React from "react";
import "./Bus.css";
import Offers from "../Offers";
import { useNavigate } from "react-router-dom";
import { useBusMainContext } from "../../Context/Bus/BusMainContext";
import BusPopup from "../BUS/Popups/BusPopup";
import BusNoPopup from "../BUS/Popups/BusNoPopup";
import "../BUS/DatesPopup/DateNoPopup";
import "../BUS/DatesPopup/DatePopup";

import toast from "react-hot-toast";
import { BusCity, busData } from "../Services/apiBus";
import DateNoPopup from "../BUS/DatesPopup/DateNoPopup";
import DatePopup from "../BUS/DatesPopup/DatePopup";
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
    day,
    departureDate,
  } = useBusMainContext();

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/BusBooking");
  };

  function handleMainSearch() {
    if (from !== to) {
      const searchParams = new URLSearchParams();
      searchParams.append("source");
      searchParams.append("destination");
      searchParams.append("destination");
      searchParams.append("date", `${day}`);
      searchParams.append("arrival");
      navigate({
        pathname: "/BusBooking",
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

  console.log({ from, to, day });

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
                <div
                  style={{
                    position: "absolute",
                    width: "365px",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    top: "8px",
                    left: "176px",
                  }}
                >
                  <BusPopup destination="from" />
                </div>
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
                <div
                  style={{
                    position: "absolute",
                    width: "365px",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    top: "8px",
                    left: "526px",
                  }}
                >
                  <BusPopup destination="to" />
                </div>
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
