import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../Records/FlightSeatBooking.css";

const FlightSeatBooking = () => {
  const { from, to, departureDate } = useFlightsMainContext();
  const location = useLocation();

  // Access the state object from location
  const {
    flightID,
    departureTime,
    source,
    duration,
    arrivalTime,
    destination,
    ticketPrice,
  } = location.state || {};

  // Ensure departureDate is either a valid Date or format it properly
  const formattedDate = departureDate
    ? format(new Date(departureDate), "EEEE, dd MMM yyyy")
    : "Invalid Date";

  const navigate = useNavigate();

  const Payment = (ticketPrice) => {
    navigate("/FlightPayment", {
      state: {
        ticketPrice,
      },
    });
  };

  return (
    <div className="cross-dip">
      <div className="train-seat-booking-container">
        <div className="train-card-full">
          <h2 className="card-title">Flight Details</h2>
          <div className="train-info-container">
            {/* Left section: Flight ID */}
            <div className="train-left">
              <div className="train-name">
                <span>{flightID && <span>{flightID}</span>}</span>
              </div>
            </div>

            {/* Right section: Route and Timings */}
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
          onClick={() => Payment(ticketPrice)}
        >
          Continue Booking
        </button>
      </div>
    </div>
  );
};

export default FlightSeatBooking;
