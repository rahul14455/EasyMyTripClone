import React from "react";
import { useTrainMainContext } from "../../Context/Trains/TrainMainContext";
import { trainCity } from "../Services/apiTrain";
import { FaTrainSubway } from "react-icons/fa6";
import "../TRAINS/TrainPopupList.css";
const TrainPopupList = ({ item, destination }) => {
  const { setFrom, setTo, setIsFromPopupOpen, setIsToPopupOpen } =
    useTrainMainContext();
  console.log(trainCity);

  const chooseCity = (index, e, destination) => {
    e.stopPropagation();
    if (destination === "from") {
      setFrom(item);
      setIsFromPopupOpen(false);
    } else if (destination === "to") {
      setTo(item);
      setIsToPopupOpen(false);
    }
  };
  return (
    <div>
      <div
        className="train-list-item"
        onClick={(e) => {
          // setFrom(item);
          // setTo(item);
          chooseCity(item, e, destination);
        }}
      >
        <div className="train-info">
          <FaTrainSubway />
          <p>{item}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainPopupList;
