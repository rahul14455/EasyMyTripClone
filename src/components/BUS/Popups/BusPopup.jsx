import React, { useEffect } from "react";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import { CiSearch } from "react-icons/ci";
import { BusCity } from "../../Services/apiBus";
import BusPopupList from "../Popups/BusPopupList";
import "../Popups/BusPopup.css";

const BusPopup = ({ destination }) => {
  const { inputRef, search, setSearch } = useBusMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  // Filter the bus cities based on the search term
  const filteredCities = BusCity.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bus-popup">
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
      <div className="bus-list">
        {/* First render filtered cities */}
        {filteredCities.map((item, index) => (
          <BusPopupList key={index} destination={destination} item={item} />
        ))}

        {/* Then render remaining cities that do not match the search */}
        {search &&
          BusCity.filter(
            (city) => !city.toLowerCase().includes(search.toLowerCase())
          ).map((item, index) => (
            <BusPopupList key={index} destination={destination} item={item} />
          ))}
      </div>
    </div>
  );
};

export default BusPopup;
