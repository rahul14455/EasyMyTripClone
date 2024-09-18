import React from "react";
import "../BusRecords/SeatSelection.css";

const SeatSelection = () => {
  return (
    <div class="bus-seat-selection-container">
      {/* <!-- Left Side: Seat Selection Area --> */}
      <div class="seat-selection-area">
        <div class="seat-header">
          <h3>Mumbai, Maharashtra → Pune, Maharashtra</h3>
          <p>GreenValley Bus Services, Non-AC</p>
          <div class="status-indicators">
            <span class="booked">Booked</span>
            <span class="available">Available</span>
            <span class="selected">Selected</span>
          </div>
          <div class="seat-price-wrapper">
            <span>Seat Price</span>
            <span class="seat-price">₹1544</span>
          </div>
        </div>

        <div class="seat-layout-container">
          {/* <!-- Upper Section --> */}
          <div class="upper-section">
            <h4>UPPER</h4>
            <div class="seat-grid upper-grid">
              {/* <!-- Upper Seats --> */}
              <div class="seat">U1</div>
              <div class="seat">U2</div>
              <div class="seat">U3</div>
              {/* <!-- Add more seats here --> */}
            </div>
          </div>

          {/* <!-- Lower Section --> */}
          <div class="lower-section">
            <h4>LOWER</h4>
            <div class="seat-grid lower-grid">
              {/* <!-- Lower Seats --> */}
              <div class="seat">L1</div>
              <div class="seat">L2</div>
              <div class="seat">L3</div>
              {/* <!-- Add more seats here --> */}
            </div>
          </div>
        </div>
      </div>

      <div class="fare-summary">
        <div class="fare-details">
          <p>Boarding Point: 06:00 : Mumbai, Maharashtra</p>
          <p>Dropping Point: 19:00 : Pune, Maharashtra</p>
        </div>
        <div class="seat-summary">
          <p>Base Fare(+): ₹1544</p>
          <p>Selected No. Seats: 0 Seats</p>
          <p>Total Amount: ₹0 (Including All Taxes)</p>
        </div>
        <button class="continue-btn">Continue</button>
      </div>
    </div>
  );
};

export default SeatSelection;
