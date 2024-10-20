import React, { useEffect, useState } from "react";
import "../HotelBooking/HotelBooking.css";
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
import HotelRoomCard from "../HotelRoomCard/HotelRoomCard";

const HotelBooking = () => {
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

  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");

  console.log(checkInDate, checkOutDate);
  const handleChange = (event) => {
    const selectedPrice = event.target.value;
    setPrice(selectedPrice);
    const filterCondition = {
      price: { $lte: selectedPrice },
    };

    // You can use this filterCondition to update your query or perform other actions
    console.log("Filter Condition:", filterCondition);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [handleClickOut]);

  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  console.log(selectedPrice);

  const handlePrice = (value) => {
    if (selectedPrice.includes(value)) {
      // Exclude 1 (remove it from the array)
      setSelectedPrice(selectedPrice.filter((price) => price !== value));
    } else {
      // Include 1 (add it to the array)
      setSelectedPrice([...selectedPrice, value]);
    }
  };

  const handleRating = (value) => {
    if (selectedRating.includes(value)) {
      // Exclude 1 (remove it from the array)
      setSelectedRating(selectedRating.filter((price) => price !== value));
    } else {
      // Include 1 (add it to the array)
      setSelectedRating([...selectedRating, value]);
    }
  };

  return (
    <div className="hotelbooking-main">
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
            {!destinationPopup ? (
              <HotelNoPopup />
            ) : (
              <div
                style={{
                  position: "absolute",
                  maxWidth: "400px",
                  zIndex: 10,
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  top: "-53px",
                  left: "0px",
                }}
              >
                <HotelPopup destination="to" />
              </div>
            )}
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
      <div className="cradsalign">
        <div className="hotel-sidebar">
          {/* mapview */}
          <div className="mapview">
            <div className="mapimage">
              <img
                src="https://www.easemytrip.com/hotels/images/maplocico.svg"
                alt="imag"
              />
              <button>Show on Map</button>
            </div>
          </div>
          {/* sidebar filter */}
          <div className="hotel-filter-pannel">
            <div className="hotel-prices">
              <h3>Price per night</h3>
              <div className="price-checks">
                <input
                  type="checkbox"
                  value={1}
                  checked={selectedPrice.includes(1)}
                  onClick={() => {
                    handlePrice(1);
                  }}
                />
                <label> ₹ Below - ₹ 2000</label>
              </div>

              <div className="price-checks">
                <input
                  type="checkbox"
                  value={0}
                  onClick={() => {
                    handlePrice(2);
                  }}
                />
                <label> ₹ 2001 - ₹ 3000</label>
              </div>

              <div className="price-checks">
                <input
                  type="checkbox"
                  value={0}
                  onClick={() => {
                    handlePrice(3);
                  }}
                />
                <label> ₹ 3001 - ₹ 5000</label>
              </div>

              <div className="price-checks">
                <input
                  type="checkbox"
                  value={0}
                  onClick={() => {
                    handlePrice(4);
                  }}
                />
                <label> ₹ 5001 - ₹ 8000</label>
              </div>

              <div className="price-checks">
                <input
                  type="checkbox"
                  value={0}
                  onClick={() => {
                    handlePrice(5);
                  }}
                />
                <label> ₹ above - ₹ 8000</label>
              </div>
            </div>
            <div className="ratings-section">
              <div className="rating-head">
                <h3>User Rating</h3>
              </div>
              <div className="rating-all">
                <input
                  type="checkbox"
                  value={5}
                  onClick={() => {
                    handleRating(3);
                  }}
                />
                <label>Excellent: 4.2+</label>
              </div>

              <div className="rating-all">
                <input
                  type="checkbox"
                  value={4.5}
                  onClick={() => {
                    handleRating(2);
                  }}
                />
                <label>Very good: 3.5+</label>
              </div>

              <div className="rating-all">
                <input
                  type="checkbox"
                  value={4}
                  onClick={() => {
                    handleRating(1);
                  }}
                />
                <label>Good: 3+</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <HotelRoomCard priceArr={selectedPrice} ratingArr={selectedRating} />
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
