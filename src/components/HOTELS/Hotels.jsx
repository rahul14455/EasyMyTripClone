import React, { useEffect } from "react";
import "./Hotel.css";
import HotelPopup from "./HotelApiCall/HotelPopup";
import HotelNoPopup from "./HotelApiCall/HotelNoPopup";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useHotelMainContext } from "../../Context/Hotels/HotelMainContext";
import CheckInNoPopup from "./HotelApiCall/DatesCheckIN/CheckInNoPopup";
import CheckInPopup from "./HotelApiCall/DatesCheckIN/CheckInPopup";
import CheckOutNoPop from "./DatesCheckOut/CheckOutNoPop";
import CheckOutPop from "./DatesCheckOut/CheckOutPop";
import GuestNoPopup from "./HotelApiCall/Guest/GuestNoPopup";
import GuestPopup from "./HotelApiCall/Guest/GuestPopup";
import OfferComponent from "../OfferComponent";
import Offers from "../Offers";

const Hotels = () => {
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
      <div className="Hotel-MainSection">
        <p className="caption-hotel">Find the Best Hotels</p>
        <div className="Hotel-search-Box">
          <div className="hsearch">
            <div
              className="destination"
              onClick={handleDestinationPopup}
              ref={destinationref}
            >
              <span className="label">
                <FaMapMarkerAlt /> DESTINATION
              </span>
              {!destinationPopup ? <HotelNoPopup /> : <HotelPopup />}
            </div>

            <div className="datepicker">
              <span className="label">
                <FaCalendarAlt /> CHECK-IN
              </span>
              {!checkInDate && <CheckInNoPopup />}
              {checkInDate && <CheckInPopup />}
            </div>

            <div className="datepicker">
              <span className="label">
                <FaCalendarAlt /> CHECK-OUT
              </span>
              {!checkOutDate && <CheckOutNoPop />}
              {checkOutDate && <CheckOutPop />}
            </div>

            <div className="guests">
              <span
                className="label guests-label"
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
      </div>
      <Offers />
    </div>
  );
};

export default Hotels;
