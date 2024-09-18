import React, { useEffect, useState } from "react";
import { trainData } from "../../Services/apiTrain";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "../TrianTicketCard/TrainTicket.css";
const TrainTicket = ({ source, destination, weekday, price }) => {
  const {
    from,
    to,
    departureDate,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
  } = useTrainMainContext();
  const day = format(departureDate, "EEE");
  const navigate = useNavigate();

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

  const handleBookNow = (
    trainName,
    trainNumber,
    departureTime,
    source,
    travelDuration,
    arrivalTime,
    destination,
    fare
  ) => {
    navigate("/TrainSeatBooking", {
      state: {
        trainName,
        trainNumber,
        departureTime,
        source,
        travelDuration,
        arrivalTime,
        destination,
        fare,
      },
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="train-detail-container">
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="train-ticket-card">
            <div className="train-route-header">
              <div className="route-info">
                <span className="train-route">
                  <span className="train-station">{item.source}</span>
                  <span className="train-arrow">→</span>
                  <span className="train-station">{item.destination}</span>
                </span>
                <span className="days-of-operation">
                  Runs on: {item.daysOfOperation.join(", ")}
                </span>
              </div>
            </div>

            <div className="train-name">
              <h3 className="train-name">{item.trainName}</h3>
              <span className="train-number">#{item.trainNumber}</span>
            </div>

            <div className="train-details">
              <div className="journey-info">
                <div className="time-block departure">
                  <span className="time">{item.departureTime}</span>
                  <span className="station">{item.source}</span>
                  <span className="date">
                    {format(departureDate, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="duration-block">
                  <span className="seats-left">
                    {item.availableSeats} Seats Left
                  </span>
                </div>
                <div className="time-block arrival">
                  <span className="time">{item.arrivalTime}</span>
                  <span className="station">{item.destination}</span>
                  <span className="date">
                    {format(departureDate, "EEE, dd MMM yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* <span className="duration">{item.travelDuration}</span> */}

            <div className="seat-availability">
              <h3>Seat Availability</h3>
              <div className="coaches-section">
                {item.coaches.map((coach) => (
                  <div
                    key={coach._id}
                    className={`coach-card ${
                      coach.numberOfSeats > 0 ? "available" : "not-available"
                    }`}
                  >
                    <div className="coach-info">
                      <span className="coach-type">({coach.coachType})</span>
                      <span className="coach-price">₹ {coach.fare}</span>
                      <span className="coach-seats">
                        {coach.numberOfSeats > 0
                          ? `${coach.numberOfSeats} Seats Available`
                          : "NOT AVAILABLE"}
                      </span>
                    </div>
                    {coach.numberOfSeats > 0 && (
                      <button
                        className="book-now-button"
                        onClick={() =>
                          handleBookNow(
                            item.trainName,
                            item.trainNumber,
                            item.departureTime,
                            item.source,
                            item.travelDuration,
                            item.arrivalTime,
                            item.destination,
                            item.fare
                          )
                        }
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
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
