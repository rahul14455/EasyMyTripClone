import React, { useEffect } from "react";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import TrainPopupList from "../TrainPopupList";
import { CiSearch } from "react-icons/ci";
import { trainCity } from "../../Services/apiTrain";
import "../TrainPopups/TrainPopup.css";

const TrainPopup = ({ destination }) => {
  const { inputRef, search, setSearch } = useTrainMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Filter the cities based on the search term
  const filteredCities = trainCity.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="train-popup"
      //   style={{ left: destination === "to" ? "260px" : "-0px" }}
    >
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
        {/* First render filtered cities */}
        {filteredCities.map((item, index) => (
          <TrainPopupList key={index} destination={destination} item={item} />
        ))}

        {/* Then render remaining cities that do not match the search */}
        {search &&
          trainCity
            .filter(
              (city) => !city.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <TrainPopupList
                key={index}
                destination={destination}
                item={item}
              />
            ))}
      </div>
    </div>
  );
};

export default TrainPopup;
