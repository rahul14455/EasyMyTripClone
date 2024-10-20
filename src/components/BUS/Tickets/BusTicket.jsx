import React, { useEffect, useState } from "react";
import { busData } from "../../Services/apiBus";
import { format, isValid } from "date-fns";
import "../Tickets/BusTicket.css";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";
import { useLocation, useNavigate } from "react-router-dom";

const BusTicket = ({
  source,
  destination,
  weekday,
  price,
  priceArr,
  departureArr,
  arrivalArr,
}) => {
  const { from, to, departureDate } = useBusMainContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const validDepartureDate = isValid(departureDate)
    ? departureDate
    : new Date();
  const day = format(validDepartureDate, "EEE");

  const navigate = useNavigate();
  const location = useLocation();

  const selectseat = (
    _id, // Add id
    date, // Add date
    seats,
    fare,
    arrivalTime,
    departureTime,
    source,
    destination,
    type,
    name
  ) => {
    navigate("/SeatSelection", {
      state: {
        _id, // Pass id
        date, // Pass date
        seats,
        fare,
        arrivalTime,
        departureTime,
        source,
        destination,
        type,
        name,
      },
    });
  };
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const busDataArr = await busData(
        from || source,
        to || destination,
        day || weekday,
        price
      );
      setData(busDataArr);
    } catch (err) {
      setError("Failed to fetch bus data");
    } finally {
      setLoading(false);
    }
  };

  function filterBusesByFareAndTime(
    busArray,
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
    const updatedBusArray = busArray.filter((bus) => {
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

    setFilteredData(updatedBusArray);
  }

  console.log(data, priceArr, departureArr, arrivalArr);

  useEffect(() => {
    getData();
  }, [from, to, day, source, destination, weekday, price]);

  useEffect(() => {
    filterBusesByFareAndTime(data, priceArr, arrivalArr, departureArr);
  }, [data, priceArr, arrivalArr, departureArr]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bus-detail-container">
      {filteredData?.length > 0 ? (
        filteredData.map((item) => (
          <div key={item?._id} className="bus-ticket-card">
            <div className="bus-header">
              <div className="bus-info">
                <h3>{item?.name}</h3>
                <span className="bus-type">{item?.type}</span>
                {item?.recommended && (
                  <div className="recommended-badge">Recommended</div>
                )}
              </div>
              <div className="bus-timing">
                <div className="time-block">
                  <span className="time">{item?.departureTime}</span>
                  <span>{item?.source}</span>
                </div>
                <span className="arrow">→</span>
                <div className="time-block">
                  <span className="time">{item?.arrivalTime}</span>
                  <span>{item?.destination}</span>
                </div>
              </div>
              <div className="fare-section">
                <span className="fare">₹{item?.fare}</span>
                <button
                  className="select-seats"
                  onClick={() =>
                    selectseat(
                      item._id, // Pass _id
                      validDepartureDate, // Pass date
                      item.seats,
                      item.fare,
                      item.arrivalTime,
                      item.departureTime,
                      item.source,
                      item.destination,
                      item.type,
                      item.name
                    )
                  }
                  disabled={!item.available || item.seats <= 0} // Disable button if no seats available
                >
                  Select Seats
                </button>
                <span className="seat-left">
                  {item?.available
                    ? `${item?.seats} Seats Left`
                    : "Not Available"}
                </span>
              </div>
            </div>

            {/* Accordion Section */}
            <details className="accordion">
              <summary className="accordion-summary">Amenities</summary>
              <div className="bus-amenities">
                <p>{item?.amenities?.join(", ") || "No amenities available"}</p>
              </div>
            </details>
          </div>
        ))
      ) : (
        <p>No buses available for the selected route and date.</p>
      )}
    </div>
  );
};

export default BusTicket;
