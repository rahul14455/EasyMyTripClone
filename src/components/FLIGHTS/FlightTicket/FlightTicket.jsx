import React, { useEffect, useState } from "react";
import { flightData } from "../../Services/apiFlightdata";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import "./FlightTicket.css"; // Ensure you have the correct path

const FlightTicket = ({ source, destination, weekday }) => {
  const [data, setData] = useState([]);
  const { fromCity, toCity } = useFlightsMainContext();

  const getData = async () => {
    const flightDataArr = await flightData(source, destination, weekday);
    setData(flightDataArr);
  };

  useEffect(() => {
    getData();
  }, [source, destination, weekday]);

  return (
    <div className="flight-detail-container">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="flight-ticket-card">
            <div className="ticket-id">
              <span>{item.flightID}</span>
            </div>
            <div className="flight-route">
              <span>{item.source}</span> → <span>{item.destination}</span>
            </div>
            <div className="dept-time">{item.departureTime}</div>
            <div className="segment-duration">
              <span>{item.duration}h 10m</span>
            </div>
            <div className="flight-arrival-time">{item.arrivalTime}</div>
            <div className="ticketprice">
              ₹ {item.ticketPrice}
              <div className="seats">
                <span>Seats left: {item.availableSeats}</span>
              </div>
            </div>
            <div className="booknow">
              <button>Book Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>No flights available for the selected route and date.</p>
      )}
    </div>
  );
};

export default FlightTicket;
