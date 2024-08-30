import React, { useEffect } from "react";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import { CiSearch } from "react-icons/ci";
import { BusCity } from "../../Services/apiBus";
import "../Popups/BusPopupList";
import BusPopupList from "../Popups/BusPopupList";
import "../Popups/BusPopupList.css";
const BusPopup = ({ destination }) => {
  const { inputRef, search, setSearch } = useBusMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <div className="train-popup">
      <div className="searchbox">
        <CiSearch />
        <input
          type="text"
          ref={inputRef}
          placeholder={`Search ${destination}`}
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 0 && /^[a-zA-Z\s]*$/.test(value)) {
              setSearch(value);
            } else {
              setSearch("");
            }
          }}
        />
      </div>
      <div className="flight-list">
        {BusCity?.map((item, index) => (
          <BusPopupList key={index} destination={destination} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BusPopup;
