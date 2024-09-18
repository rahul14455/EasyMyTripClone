import React, { useState } from "react";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import BusPopup from "../Popups/BusPopup";
import BusNoPopup from "../Popups/BusNoPopup";
import "../BusBooking/BusBooking.css";
import { busData, BusCity } from "../../Services/apiBus";
import { useSearchParams } from "react-router-dom";
import BusTicket from "../Tickets/BusTicket";

import DateNoPopup from "../DatesPopup/DateNoPopup";
import DatePopup from "../DatesPopup/DatePopup";
const BusBooking = () => {
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

  const [searchparams] = useSearchParams();
  const source = searchparams.get("source");
  const destination = searchparams.get("destination");

  const [price, setPrice] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSearch = () => {};

  console.log(from);
  console.log(to);

  const handleChange = (event) => {
    const selectedPrice = event.target.value;
    setPrice(selectedPrice);
    const filterCondition = {
      price: { $lte: selectedPrice },
    };

    // You can use this filterCondition to update your query or perform other actions
    console.log("Filter Condition:", filterCondition);
  };
  return (
    <div>
      <div className="Bus-Booking-Section">
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
      <div className="Bus-center">
        <div className="Bus-side-pannel">
          <span>Filter By</span>

          <div className="journey-coach">
            <h3>Journey Coach Filter</h3>

            <div className="journey-price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> Below - ₹ 600 </label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> ₹ 601 - ₹ 1200</label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> 1201 - ₹ 1600</label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> above - ₹ 1600</label>
            </div>
          </div>

          <div className="departure-coach">
            <h3>Departure From New Delhi</h3>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "6:00" });
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "7:00", $lte: "11:00" });
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "17:00" });
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "18:00", $lte: "12:00" });
                }}
              />
              <label> Night 6pm - 12am</label>
            </div>
          </div>

          <div className="arrival-coach">
            <h3>Arrival From New Delhi</h3>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "6:00" });
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "7:00", $lte: "11:00" });
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "17:00" });
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "18:00", $lte: "12:00" });
                }}
              />
              <label> Night 6pm - 12am</label>
            </div>
          </div>
        </div>
        <BusTicket
          source={source}
          destination={destination}
          // weekday={selectday}
          setDeparture={setDeparture}
          setArrival={setArrival}
          price={price}
        />
      </div>
    </div>
  );
};

export default BusBooking;
