import React from "react";
import { useHotelMainContext } from "../../../../Context/Hotels/HotelMainContext";

const GuestPopup = () => {
  const {
    handleDone,
    handleChildrenChange,
    handleAdultsChange,
    child,
    dropdownOpen,
    adults,
  } = useHotelMainContext();
  return (
    <div>
      {dropdownOpen && (
        <div className="dropdown-form">
          <div className="guests-control">
            <label htmlFor="adults">Adults:</label>
            <div className="counter">
              <button
                className="counter-button"
                onClick={() => handleAdultsChange(adults - 1)}
                disabled={adults <= 1}
              >
                -
              </button>
              <span className="counter-value">{adults}</span>
              <button
                className="counter-button"
                onClick={() => handleAdultsChange(adults + 1)}
                disabled={adults >= 10}
              >
                +
              </button>
            </div>
          </div>
          <div className="guests-control">
            <label htmlFor="children">Children:</label>
            <div className="counter">
              <button
                className="counter-button"
                onClick={() => handleChildrenChange(child - 1)}
                disabled={child <= 0}
              >
                -
              </button>
              <span className="counter-value">{child}</span>
              <button
                className="counter-button"
                onClick={() => handleChildrenChange(child + 1)}
                disabled={child >= 10}
              >
                +
              </button>
            </div>
          </div>
          <button className="done-button" onClick={handleDone}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestPopup;
