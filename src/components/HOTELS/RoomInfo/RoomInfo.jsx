import React from "react";
import "../RoomInfo/Roominfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";

const RoomInfo = () => {
  const location = useLocation();
  const { cityName } = useHotelMainContext();
  const navigate = useNavigate();

  const {
    hotel_id,
    hotelName,
    selectedInDate,
    selectedOutDate,
    roomDetails,
    travelers,
    roomPrice,
    roomImage,
  } = location.state || {};

  function GoPayment() {
    navigate("/HotelPayment", {
      state: {
        hotel_id,
        selectedInDate,
        selectedOutDate,
        roomPrice,
      },
    });
  }

  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="cross-dip">
      <div className="train-seat-booking-container">
        <div className="train-card-full">
          <h2 className="card-title">Hotel Details</h2>
          <div className="train-info-container">
            <div className="train-left">
              <div className="train-name">
                {hotelName && <span>{hotelName}</span>}
              </div>
            </div>
            <div className="train-right">
              <div className="train-route">
                <span className="station-name">{cityName}</span>
                <span className="station-name">
                  {formatDate(selectedInDate)}
                </span>
                <span className="station-name">
                  {formatDate(selectedOutDate)}
                </span>
              </div>
              <div className="train-journey-info">
                <div className="time-block departure">
                  <span className="rail-station">{roomDetails?.roomType}</span>
                </div>
                <div className="duration-block">
                  <span className="duration-travel">
                    Travelers: {travelers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Image Display */}
        {roomImage && (
          <div className="room-image-container">
            <img src={roomImage} alt="Room" className="room-image" />
          </div>
        )}

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
        <p>Passenger x {travelers}</p>
        <p>Travel Fare</p>
        <div className="total">₹ {roomPrice}</div>
        <button className="continue-booking-button" onClick={GoPayment}>
          Continue Booking
        </button>
      </div>
    </div>
  );
};

export default RoomInfo;
