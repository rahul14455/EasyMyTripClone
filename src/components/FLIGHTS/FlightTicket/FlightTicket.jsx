import React, { useEffect, useState } from "react";
import { flightData } from "../../Services/apiFlightdata";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import "./FlightTicket.css"; // Ensure you have the correct path
import { useNavigate } from "react-router-dom";

const FlightTicket = ({
  source,
  destination,
  weekday,
  selectedDuration,
  price,
  selectedStop,
  selectDeparture,
  date,
}) => {
  const [data, setData] = useState([]);
  const { fromCity, toCity } = useFlightsMainContext();

  const getData = async () => {
    const flightDataArr = await flightData(
      source,
      destination,
      weekday,
      selectedDuration,
      price,
      selectedStop,
      selectDeparture
    );
    setData(flightDataArr);
  };

  const navigate = useNavigate();

  // Ensure `goTOSeat` is passed as a function reference, not invoked immediately
  const goTOSeat = (
    _id,
    departureTime,
    source,
    duration,
    arrivalTime,
    destination,
    ticketPrice
  ) => {
    console.log(date);
    navigate("/FlightSeatBooking", {
      state: {
        _id,
        departureTime,
        source,
        duration,
        arrivalTime,
        destination,
        ticketPrice,
        date,
      },
    });
  };

  useEffect(() => {
    getData();
  }, [
    source,
    destination,
    weekday,
    selectedDuration,
    price,
    selectedStop,
    selectDeparture,
  ]);

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
              <button
                onClick={() =>
                  goTOSeat(
                    item._id,
                    item.departureTime,
                    item.source,
                    item.duration,
                    item.arrivalTime,
                    item.destination,
                    item.ticketPrice
                  )
                }
              >
                Book Now
              </button>
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
