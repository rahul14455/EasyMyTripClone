import React from "react";
import { format } from "date-fns";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import { useLocation, useNavigate } from "react-router-dom";

const BusRecord = () => {
  const { from, to, departureDate } = useBusMainContext();

  const formattedDate = departureDate
    ? format(new Date(departureDate), "EEEE, dd MMM yyyy")
    : "Invalid Date";

  const navigate = useNavigate();

  // Modified BusPayment function to ensure all parameters are passed
  const BusPayment = (
    fare,
    arrivalTime,
    departureTime,
    source,
    destination,
    name,
    type,
    selectedSeats,
    totalFare // Retrieve total fare
  ) => {
    console.log({
      fare,
      arrivalTime,
      departureTime,
      source,
      destination,
      name,
      type,
      selectedSeats,
      totalFare,
    });

    navigate("/BusPayment", {
      state: {
        fare,
        arrivalTime,
        departureTime,
        source,
        destination,
        name,
        type,
        selectedSeats,
        totalFare, // Pass total fare
      },
    });
  };

  const location = useLocation();
  const {
    fare,
    arrivalTime,
    departureTime,
    source,
    destination,
    name,
    type,
    selectedSeats,
    totalFare, // Retrieve total fare
  } = location.state || {};

  return (
    <div className="cross-dip">
      <div className="train-seat-booking-container">
        <div className="train-card-full">
          <h2 className="card-title">Bus Details</h2>
          <div className="train-info-container">
            {/* Left section: Bus name and type */}
            <div className="train-left">
              <div className="train-name">
                <span>{name && <span>{name}</span>}</span>
                <span className="duration-travel"> {type} </span>
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
                  <span className="date-train">{formattedDate}</span>
                </div>
                <div className="duration-block"></div>
                <div className="time-block arrival">
                  <span className="time-dept">{arrivalTime}</span>
                  <span className="rail-station">{destination}</span>
                  <span className="date-train">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Travellers Details */}
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

      {/* Display selected seats and price summary */}
      <div className="price-summary-card">
        <h4>Price Summary</h4>
        <p>Passenger x{selectedSeats?.length}</p>
        <p>Travel Fare</p>
        <div className="total">₹ {totalFare}</div>

        <button
          className="continue-booking-button"
          onClick={() =>
            BusPayment(
              fare,
              arrivalTime,
              departureTime,
              source,
              destination,
              name,
              type,
              selectedSeats,
              totalFare
            )
          }
        >
          Continue Booking
        </button>
      </div>
    </div>
  );
};

export default BusRecord;
