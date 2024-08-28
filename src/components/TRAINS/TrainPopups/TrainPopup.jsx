import React, { useEffect } from "react";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import TrainPopupList from "../TrainPopupList";
import { CiSearch } from "react-icons/ci";
import { trainCity } from "../../Services/apiTrain";
import "../TrainPopups/TrainPopup.css";
import { useTrainIndiudvalContext } from "../../../Context/Trains/TrainIndiudvalContext";
const TrainPopup = ({ destination }) => {
  const { inputRef, search, setSearch, cityName, setCityName, setFrom } =
    useTrainMainContext();
  const { fromtrainCity, setFromTraincity, toTrainCity, setToTrainCity } =
    useTrainIndiudvalContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

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
        {trainCity?.map((item, index) => (
          <TrainPopupList key={index} destination={destination} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TrainPopup;
