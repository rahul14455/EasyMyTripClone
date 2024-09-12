import React, { useEffect, useState } from "react";
import { trainData } from "../../Services/apiTrain";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import { format } from "date-fns";
import "./TrainTicket.css";

const TrainTicket = ({ source, destination, weekday, price }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { from, to, departureDate } = useTrainMainContext();
  const day = format(departureDate, "EEE");

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const trainDataArr = await trainData(
        from,
        to,
        day,
        source,
        destination,
        weekday,
        price
      );
      setData(trainDataArr);
    } catch (err) {
      setError("Failed to fetch train data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [from, to, day, source, destination, weekday, price]);

  return (
    <div className="train-detail-container">
      {loading ? (
        <p>Loading trains...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="train-ticket-card">
            {/* Train Header */}
            <div className="train-header">
              <h3 className="train-name">{item.trainName}</h3>
              <div className="train-number">#{item.trainNumber}</div>
            </div>

            {/* Route Info */}
            <div className="train-route">
              <span>{item.source}</span> → <span>{item.destination}</span>
            </div>

            {/* Timings */}
            <div className="train-timing">
              <div>Departure: {item.departureTime}</div>
              <div>Arrival: {item.arrivalTime}</div>
            </div>

            {/* Duration and Fare */}
            <div className="train-info">
              <div className="train-duration">{item.travelDuration}</div>
              <div className="fare">₹ {item.fare}</div>
            </div>

            {/* Coaches */}
            <div className="coaches-info">
              {item.coaches.map((coach) => (
                <div
                  key={coach._id}
                  className={`coach-details ${
                    coach.numberOfSeats > 0 ? "available" : "not-available"
                  }`}
                >
                  <div className="coach-type">{coach.coachType}</div>
                  <div className="seats">
                    {coach.numberOfSeats > 0
                      ? `${coach.numberOfSeats} Seats Available`
                      : "NOT AVAILABLE"}
                  </div>
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="book-now">
              <button>Book Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>No trains available for the selected route and date.</p>
      )}
    </div>
  );
};

export default TrainTicket;
