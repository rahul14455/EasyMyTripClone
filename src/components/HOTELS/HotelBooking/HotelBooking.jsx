import React, { useEffect } from "react";
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

  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [handleClickOut]);

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
        </div>
      </div>
      <div className="hotel-sidebar">
        <div className="mapview">
          <div className="mapimage">
            <img
              src="https://www.easemytrip.com/hotels/images/maplocico.svg"
              alt="imag"
            />
            <button>Show on Map</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
