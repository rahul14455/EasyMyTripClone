import React from "react";
import { useHotelMainContext } from "../../../../Context/Hotels/HotelMainContext";

const GuestNoPopup = () => {
  const {
    handleDone,
    handleChildrenChange,
    handleAdultsChange,
    toggleDropdown,
    guestsInput,
    setGuestsInput,
    dropdownOpen,
    setDropdownOpen,
    setChild,
    adults,
    setAdults,
  } = useHotelMainContext();
  return (
    <div>
      <input
        type="text"
        value={guestsInput}
        placeholder="Select guests"
        readOnly
        className="guests-input"
      />
    </div>
  );
};

export default GuestNoPopup;
