import React, { useEffect, useState } from "react";
import { busData } from "../../Services/apiBus";
import { format, isValid } from "date-fns";
import "../Tickets/BusTicket.css";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";

const BusTicket = ({ source, destination, weekday, price }) => {
  const { from, to, departureDate } = useBusMainContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validDepartureDate = isValid(departureDate)
    ? departureDate
    : new Date();
  const day = format(validDepartureDate, "EEE");

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

  useEffect(() => {
    getData();
  }, [from, to, day, source, destination, weekday, price]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bus-detail-container">
      {data?.length > 0 ? (
        data.map((item) => (
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
                <button className="select-seats">Select Seats</button>
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
