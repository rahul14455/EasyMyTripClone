import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";

const TravellerClassNoPopup = () => {
  const { travellersText, setTravellersVisible, travelClass } =
    useFlightsMainContext();
  return (
    <div>
      <input
        type="text"
        className="travellers-input"
        placeholder="Travellers"
        value={travellersText}
        onClick={() => setTravellersVisible((prev) => !prev)}
        readOnly
      />
      <span>{travelClass}</span>
    </div>
  );
};

export default TravellerClassNoPopup;
