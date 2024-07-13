import React from "react";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";

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
    travellersVisible,
  } = useFlightsMainContext();
  return (
    <div>
      {travellersVisible && (
        <div className="travellers-form" style={{ border: "1px solid red" }}>
          <div className="travellers-counter">
            <div className="counter">
              <div className="counter-label">Adults:</div>
              <div
                className="counter-button"
                onClick={() => handleAdultsChange(-1)}
              >
                -
              </div>

              <div className="counter-value">{adults}</div>

              <div
                className="counter-button"
                onClick={() => handleAdultsChange(1)}
              >
                +
              </div>
            </div>

            <div className="counter">
              <div className="counter-label">Children:</div>
              <div
                className="counter-button"
                onClick={() => handleChildrenChange(-1)}
              >
                -
              </div>
              <div className="counter-value">{child}</div>
              <div
                className="counter-button"
                onClick={() => handleChildrenChange(1)}
              >
                +
              </div>
            </div>
            <div className="counter">
              <div className="counter-label">Infants:</div>
              <div
                className="counter-button"
                onClick={() => handleInfantsChange(-1)}
              >
                -
              </div>
              <div className="counter-value">{infants}</div>
              <div
                className="counter-button"
                onClick={() => handleInfantsChange(1)}
              >
                +
              </div>
            </div>
            <div className="travel-classes">
              <span className="classes-label">Class:</span>
              <select
                className="classes-dropdown"
                value={travelClass}
                onChange={handleTravelClassChange}
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
            <button className="done-button" onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravellerClassPopupOpen;
