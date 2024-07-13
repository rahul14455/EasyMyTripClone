import React from "react";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";

const HotelNoPopup = () => {
  const { cityName } = useHotelMainContext();
  return (
    <div>
      <h1>{cityName}</h1>
      <h2>India</h2>
    </div>
  );
};

export default HotelNoPopup;
