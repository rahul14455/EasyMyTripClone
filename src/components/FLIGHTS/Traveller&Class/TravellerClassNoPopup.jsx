import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import { BiDownArrow } from "react-icons/bi";

const TravellerClassNoPopup = () => {
  const { travelClass, totalTravellers } = useFlightsMainContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
      }}
    >
      <div>
        <span style={{ fontWeight: "700", fontSize: "32px" }}>
          {totalTravellers}
        </span>{" "}
        Traveller
        {totalTravellers !== 1 ? "s" : ""} <BiDownArrow />
      </div>
      <div>{travelClass}</div>
    </div>
  );
};

export default TravellerClassNoPopup;
