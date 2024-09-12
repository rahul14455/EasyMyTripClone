import React, { useEffect, useState } from "react";
import { trainData } from "../../Services/apiTrain";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import { format } from "date-fns";
const TrainTicket = ({
  source,
  destination,
  weekday,
  price,
  setArrival,
  setDeparture,
}) => {
  const [data, setData] = useState([]);
  const { from, to, departureDate } = useTrainMainContext();
  // console.log({ from, to }, format(departureDate, "EEE"));
  const day = format(departureDate, "EEE");
  const getData = async () => {
    console.log({ day });
    const trainDataArr = await trainData(
      from,
      to,
      day,
      source,
      destination,
      weekday,
      setArrival,
      price,
      setDeparture
    );
    setData(trainDataArr);
  };

  console.log(data);

  useEffect(() => {
    getData();
  }, [source, destination, weekday, setArrival, price, setDeparture]);

  return (
    <div className="flight-detail-container">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="flight-ticket-card">
            <div className="ticket-id">
              <span>{item.trainNumber}</span>
            </div>
            <div className="flight-route">
              <span>{item.source}</span> → <span>{item.destination}</span>
            </div>
            <div className="dept-time">{item.departureTime}</div>
            <div className="segment-duration">
              <span>{item.arrivalTime}h 10m</span>
            </div>
            <div className="flight-arrival-time">{item.arrivalTime}</div>
            <div className="ticketprice">
              ₹ {item.fare}
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
        <p>No Trains available for the selected route and date.</p>
      )}
    </div>
  );
};

export default TrainTicket;
