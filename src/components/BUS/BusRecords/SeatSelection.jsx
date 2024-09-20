import React, { useState, useEffect } from "react";
import "../BusRecords/SeatSelection.css";
import { useLocation } from "react-router-dom";

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();

  // Provide fallback for seats in case state is undefined
  const {
    seats = [],
    fare,
    arrivalTime,
    departureTime,
    source,
    destination,
  } = location.state || {};

  useEffect(() => {
    // Log the location state to ensure data is being passed correctly
    console.log("Location State: ", location.state);
  }, [location.state]);

  // Lower deck seats (S1 to S20) and Upper deck seats (S21 to S40)
  const lowerDeckSeats = Array.from(
    { length: seats / 2 },
    (_, index) => `S${index + 1}` // S1 to S20
  );
  const upperDeckSeats = Array.from(
    { length: seats / 2 },
    (_, index) => `S${index + 21}` // S21 to S40
  );

  // Example of booked seats, ensure this comes from the actual booking data
  const bookedSeats = ["S5", "S15", "S25", "S35"];

  const handleSeatClick = (seat) => {
    // Prevent selecting booked seats
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatClass = (seat) => {
    if (bookedSeats.includes(seat)) return "seat booked";
    if (selectedSeats.includes(seat)) return "seat selected";
    return "seat available";
  };

  const calculateFare = () => selectedSeats.length * fare;

  return (
    <div className="bus-seat-selection-container">
      <div className="seat-layout-container">
        <h3>Select Your Seat</h3>

        {/* Lower Deck */}
        <div className="deck-title">Lower Deck</div>
        <div className="seat-grid lower-deck">
          {lowerDeckSeats.map((seat) => (
            <div
              key={seat}
              className={getSeatClass(seat)}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          ))}
        </div>

        {/* Upper Deck */}
        <div className="deck-title">Upper Deck</div>
        <div className="seat-grid upper-deck">
          {upperDeckSeats.map((seat) => (
            <div
              key={seat}
              className={getSeatClass(seat)}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          ))}
        </div>
      </div>

      <div className="boarding-summary">
        <div className="details">
          <p>
            <strong>Boarding Point:</strong> {arrivalTime} : {source}
          </p>
          <p>
            <strong>Dropping Point:</strong> {departureTime}: {destination}
          </p>
        </div>
        <div className="fare-summary">
          <p>
            <strong>Base Fare(+):</strong> ₹{fare}
          </p>
          <p>
            <strong>Selected No. Seats:</strong> {selectedSeats.length} Seats
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{calculateFare()} (Including All
            Taxes)
          </p>
        </div>
        <button
          className="continue-btn"
          onClick={() => alert("Proceed to checkout")}
          disabled={selectedSeats.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BusSeatSelection;
