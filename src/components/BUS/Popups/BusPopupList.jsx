import React from "react";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import { FaBus } from "react-icons/fa";
import { BusCity } from "../../Services/apiBus";
import "../Popups/BusPopupList.css";
const BusPopupList = ({ destination, item }) => {
  const { setTo, setFrom, setIsFromPopupOpen, setIsToPopupOpen } =
    useBusMainContext();
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
          <FaBus />
          <p>{item}</p>
        </div>
      </div>
    </div>
  );
};

export default BusPopupList;
