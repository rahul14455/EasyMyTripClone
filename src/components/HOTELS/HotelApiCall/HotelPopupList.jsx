import React from "react";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";
import "../HotelApiCall/HotelPopList.css";
const HotelPopupList = ({ item }) => {
  const { chooseCity } = useHotelMainContext();
  console.log(item);

  return (
    <div
      className="popup-list-item"
      onClick={(e) => chooseCity(item.cityState, e)}
    >
      <div className="hotel-info">
        <p>{item.cityState}</p>
      </div>
    </div>
  );
};

export default HotelPopupList;
