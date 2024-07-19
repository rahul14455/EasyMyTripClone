import React from "react";
import { flightData } from "../../Services/apiFlightdata";
const FlightTicketCard = () => {
  return (
    <div>
      <div>
        {flightData.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </div>
    </div>
  );
};

export default FlightTicketCard;
