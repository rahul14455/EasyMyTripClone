import React, { useEffect, useState } from "react";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import HotelNoPopup from "../HotelApiCall/HotelNoPopup";
import HotelPopup from "../HotelApiCall/HotelPopup";
import CheckInNoPopup from "../HotelApiCall/DatesCheckIN/CheckInNoPopup";
import CheckInPopup from "../HotelApiCall/DatesCheckIN/CheckInPopup";
import CheckOutNoPop from "../DatesCheckOut/CheckOutNoPop";
import CheckOutPop from "../DatesCheckOut/CheckOutPop";
import GuestNoPopup from "../HotelApiCall/Guest/GuestNoPopup";
import GuestPopup from "../HotelApiCall/Guest/GuestPopup";
import { useLocation } from "react-router-dom";
import "../RoomBooking/RoomBooking.css";

const RoomBooking = () => {
  const {
    destinationPopup,
    handleDestinationPopup,
    destinationref,
    handleClickOut,
    dropdownOpen,
    setDropdownOpen,
    checkInDate,
    checkOutDate,
  } = useHotelMainContext();

  const location = useLocation();

  const { hotel_id } = location.state || {};

  console.log(hotel_id);
  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [handleClickOut]);

  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotel_id}`,
          {
            method: "GET",
            headers: {
              projectID: "wniajom2ck2s",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setHotelData(data.data);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [hotel_id]);

  if (!hotelData) return <div>Loading...</div>;

  return (
    <div>
      <div className="mainbooking">
        <div className="searchbox">
          <div
            className="dest"
            onClick={handleDestinationPopup}
            ref={destinationref}
          >
            <span className="labelicon">
              <FaMapMarkerAlt /> DESTINATION
            </span>
            {!destinationPopup ? <HotelNoPopup /> : <HotelPopup />}
          </div>

          <div className="datepicker">
            <span className="labelicon">
              <FaCalendarAlt /> CHECK-IN
            </span>
            {!checkInDate && <CheckInNoPopup />}
            {checkInDate && <CheckInPopup />}
          </div>

          <div className="datepicker">
            <span className="labelicon">
              <FaCalendarAlt /> CHECK-OUT
            </span>
            {!checkOutDate && <CheckOutNoPop />}
            {checkOutDate && <CheckOutPop />}
          </div>

          <div className="guests">
            <span
              className="labelicon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUsers /> Select Guests
            </span>
            {!dropdownOpen && <GuestNoPopup />}
            {dropdownOpen && <GuestPopup />}
          </div>
          <button className="search-button-hotel">Search Hotels</button>
        </div>
      </div>

      <div className="hotel-container">
        <div className="hotel-card">
          {/* Left Section: Hotel Main Image */}
          <div className="hotel-image-section">
            <img
              src={hotelData.images[0]}
              alt={hotelData.name}
              className="hotel-main-image"
            />
          </div>

          {/* Right Section: Hotel Details and Additional Images */}
          <div className="hotel-details-section">
            <h2 className="hotel-name">{hotelData.name}</h2>
            <p className="hotel-location">
              <FaMapMarkerAlt /> {hotelData.location}
            </p>
            <div className="hotel-rating">
              <span>{hotelData.rating}</span>⭐
            </div>
            <div className="room-type">
              <h3>Suite</h3>
              <p>2 Guests | 1 Room</p>
            </div>
            <div className="room-price">
              <h4>₹ {hotelData.rooms[0].costPerNight}</h4>
              <p>+ ₹409 taxes & fees / night</p>
            </div>
            <div className="check-in-out">
              <p>
                <FaCalendarAlt /> CHECK-IN: 12:00 PM
              </p>
              <p>
                <FaCalendarAlt /> CHECK-OUT: 12:00 PM
              </p>
            </div>
            <div className="amenities">
              <span>Swimming Pool</span>
              <span>Free Wifi</span>
            </div>

            {/* Additional Images */}
            <div className="hotel-images-grid">
              {hotelData.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hotel ${index + 1}`}
                  className="hotel-grid-image"
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="select-rooms-btn">Select Rooms</button>
              <button className="book-now-btn">Book Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="room-list">
        <h3>Available Rooms</h3>
        {hotelData.rooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-card-container">
              {/* Room Type and Image */}
              <div className="room-type">
                <h4>{room.roomType}</h4>
                <img
                  src={hotelData.images[1] || "default-image-url.jpg"}
                  alt={room.roomType}
                  className="room-image"
                />
                <div className="room-details">
                  <span className="bed-type">{room.bedDetail}</span>
                  <span className="room-size">{room.roomSize} sqft</span>
                </div>
              </div>

              {/* Room Benefits */}
              <div className="room-benefits">
                <h4>Room Only</h4>
                <ul>
                  <li>✅ Free Cancellation till 24 hrs before check-in</li>
                  <li>✅ Breakfast not included</li>
                </ul>
              </div>

              {/* Room Price and Book Button */}
              <div className="room-price">
                <span className="price">₹ {room.costPerNight}</span>
                <p>+ ₹409 Taxes & fees (Per Night)</p>
                <button className="book-now-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBooking;
