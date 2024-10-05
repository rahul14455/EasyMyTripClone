import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../Records/FlightSeatBooking.css";

const FlightSeatBooking = () => {
  const { from, to, departureDate } = useFlightsMainContext();
  const location = useLocation();

  const {
    _id,
    departureTime,
    source,
    duration,
    arrivalTime,
    destination,
    ticketPrice,
    date,
  } = location.state || {};

  const formattedDate = departureDate
    ? format(new Date(departureDate), "EEEE, dd MMM yyyy")
    : "Invalid Date";

  console.log(formattedDate);
  const navigate = useNavigate();

  const Payment = () => {
    navigate("/FlightPayment", {
      state: {
        ticketPrice,
        _id, // Include flightID
        date, // Include date
      },
    });
  };

  return (
    <div className="cross-dip">
      <div className="train-seat-booking-container">
        <div className="train-card-full">
          <h2 className="card-title">Flight Details</h2>
          <div className="train-info-container">
            <div className="train-left">
              <div className="train-name">
                <span>{_id && <span>{_id}</span>}</span>
              </div>
            </div>
            <div className="train-right">
              <div className="train-route">
                <span className="station-name">{from}</span>
                <span className="train-arrow">→</span>
                <span className="station-name">{to}</span>
              </div>
              <div className="train-journey-info">
                <div className="time-block departure">
                  <span className="time-dept">{departureTime}</span>
                  <span className="rail-station">{source}</span>
                </div>
                <div className="duration-block">
                  <span className="duration-travel">{duration} hr</span>
                </div>
                <div className="time-block arrival">
                  <span className="time-dept">{arrivalTime}</span>
                  <span className="rail-station">{destination}</span>
                  <span className="rail-station">{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="travellers-card">
          <h2 className="card-title">Travellers Details</h2>
          <div className="card-content">
            <h5>First Name & (Middle name, if any)</h5>
            <input type="text" className="input-field" />
            <h5>Last Name</h5>
            <input type="text" className="input-field" />
          </div>
        </div>
      </div>

      <div className="price-summary-card">
        <h4>Price Summary</h4>
        <p>Passenger x1</p>
        <p>Travel Fare</p>
        <div className="total">₹ {ticketPrice}</div>

        <button
          className="continue-booking-button"
          onClick={Payment} // Call the updated Payment function
        >
          Continue Booking
        </button>
      </div>
    </div>
  );
};

export default FlightSeatBooking;
