import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import "../Traveller&Class/TravelPopUpOpen.css";

const TravellerClassPopupOpen = () => {
  const {
    child,
    adults,
    travelClass,
    infants,
    handleAdultsChange,
    handleChildrenChange,
    handleInfantsChange,
    handleTravelClassChange,
    handleDone,
  } = useFlightsMainContext();
  return (
    <div className="flightTravellerMain">
      <div className="flightPassengers">
        <div className="flightPassengerTitle">Adults: </div>
        <div className="flightPassengerCount">
          <div onClick={() => handleAdultsChange(-1)}>-</div>
          <div>{adults}</div>
          <div onClick={() => handleAdultsChange(1)}>+</div>
        </div>
      </div>
      <div className="flightPassengers">
        <div className="flightPassengerTitle">Childs: </div>
        <div className="flightPassengerCount">
          <div onClick={() => handleChildrenChange(-1)}>-</div>
          <div>{child}</div>
          <div onClick={() => handleChildrenChange(1)}>+</div>
        </div>
      </div>
      <div className="flightPassengers">
        <div className="flightPassengerTitle">Infants: </div>
        <div className="flightPassengerCount">
          <div onClick={() => handleInfantsChange(-1)}>-</div>
          <div>{infants}</div>
          <div onClick={() => handleInfantsChange(1)}>+</div>
        </div>
      </div>
      <div className="flightPassengers">
        <span className="flightPassengerTitle">Class:</span>
        <select
          className="flightPassengerDropDown"
          value={travelClass}
          onChange={handleTravelClassChange}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
      </div>
      <div className="flightDoneButton" onClick={handleDone}>
        Done
      </div>
    </div>
  );
};

export default TravellerClassPopupOpen;
