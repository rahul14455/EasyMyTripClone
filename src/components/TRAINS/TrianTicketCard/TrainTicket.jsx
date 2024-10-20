import React, { useEffect, useState } from "react";
import { trainData } from "../../Services/apiTrain";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "../TrianTicketCard/TrainTicket.css";

const TrainTicket = ({
  source,
  destination,
  weekday,
  price,
  priceArr,
  departureArr,
  arrivalArr,
}) => {
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
  const [filteredData, setFilteredData] = useState([]);

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
    fare,
    _id, // Passing _id
    date // Passing date
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
        _id, // Include _id
        date, // Include date
      },
    });
  };

  function filterTrainByFareAndTime(
    trainArray,
    selectedFareRanges,
    arrivalArr,
    departureArr
  ) {
    // Define fare ranges for each category
    const fareRanges = {
      1: { min: 0, max: 600 },
      2: { min: 601, max: 1200 },
      3: { min: 1201, max: 1600 },
      4: { min: 1601, max: Infinity }, // Infinity for fares above 1600
    };

    // Define time ranges for arrival and departure times
    const timeRanges = {
      1: { start: "00:00", end: "06:00" }, // 12am-6am
      2: { start: "06:01", end: "12:00" }, // 6am-12pm
      3: { start: "12:01", end: "18:00" }, // 12pm-6pm
      4: { start: "18:01", end: "23:59" }, // 6pm-12am
    };

    // Helper function to convert time string to minutes
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }

    // Filter buses based on fare range, arrival time range, and departure time range
    const updatedTrainArray = trainArray.filter((bus) => {
      // Filter based on fare range
      const fareMatches =
        selectedFareRanges.length === 0 ||
        selectedFareRanges.some((range) => {
          const { min, max } = fareRanges[range];
          return bus.fare >= min && bus.fare <= max;
        });

      // Filter based on arrival time range
      const arrivalMatches =
        arrivalArr.length === 0 ||
        arrivalArr.some((range) => {
          const { start, end } = timeRanges[range];
          const arrivalTimeMinutes = timeToMinutes(bus.arrivalTime);
          return (
            arrivalTimeMinutes >= timeToMinutes(start) &&
            arrivalTimeMinutes <= timeToMinutes(end)
          );
        });

      // Filter based on departure time range
      const departureMatches =
        departureArr.length === 0 ||
        departureArr.some((range) => {
          const { start, end } = timeRanges[range];
          const departureTimeMinutes = timeToMinutes(bus.departureTime);
          return (
            departureTimeMinutes >= timeToMinutes(start) &&
            departureTimeMinutes <= timeToMinutes(end)
          );
        });

      // Return true only if all conditions match
      return fareMatches && arrivalMatches && departureMatches;
    });

    setFilteredData(updatedTrainArray);
  }

  useEffect(() => {
    filterTrainByFareAndTime(data, priceArr, arrivalArr, departureArr);
  }, [data, priceArr, arrivalArr, departureArr]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="train-detail-container">
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
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
                            item.fare,
                            item._id, // Pass _id
                            departureDate // Pass date
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
