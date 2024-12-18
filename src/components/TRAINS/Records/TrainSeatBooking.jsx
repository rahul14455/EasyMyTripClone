import { useNavigate, useLocation } from "react-router-dom";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import "../Records/TrainSeatBooking.css";
import { format } from "date-fns";

const TrainSeatBooking = () => {
  const { from, to, departureDate } = useTrainMainContext();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    trainName,
    trainNumber,
    departureTime,
    source,
    travelDuration,
    arrivalTime,
    destination,
    fare,
    _id, // Receiving _id
    date, // Receiving date
  } = location.state || {};

  const handleTrainPayment = () => {
    navigate("/TrainPayment", {
      state: {
        fare,
        arrivalTime,
        departureTime,
        source,
        destination,
        _id, // Passing _id
        date, // Passing date
      },
    });
  };

  const formattedDate =
    departureDate instanceof Date
      ? departureDate.toLocaleDateString(undefined, {
          weekday: "long",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : departureDate;

  return (
    <div className="cross-dip">
      <div className="train-seat-booking-container">
        <div className="train-card-full">
          <h2 className="card-title">Train Details</h2>
          <div className="train-info-container">
            <div className="train-left">
              <div className="train-name">
                {trainName && <span>{trainName}</span>}
              </div>
              <div className="train-number">
                {trainNumber && <span>#{trainNumber}</span>}
              </div>
            </div>
            <div className="train-right">
              <div className="train-route">
                <span className="station-name">{from}</span>
                <span className="train-arrow">→</span>
                <span className="station-name">{to}</span>
              </div>
              <div className="train-journey-info">
                <div className="time-block departure">
                  <span className="time-dept">{departureTime}</span>
                  <span className="rail-station">{source}</span>
                  <span className="date-train">{formattedDate}</span>
                </div>
                <div className="duration-block">
                  <span className="duration-travel">{travelDuration}</span>
                </div>
                <div className="time-block arrival">
                  <span className="time-dept">{arrivalTime}</span>
                  <span className="rail-station">{destination}</span>
                  <span className="date-train">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="travellers-card">
          <h2 className="card-title">Travellers Details</h2>
          <div className="card-content">
            <h5>First Name & (Middle name, if any)</h5>
            <input type="text" className="input-field" />
            <h5>Last Name</h5>
            <input type="text" className="input-field" />
          </div>
        </div>
      </div>

      <div className="price-summary-card">
        <h4>Price Summary</h4>
        <p>Passenger x1</p>
        <p>Travel Fare</p>
        <div className="total">₹ {fare}</div>
        <button
          className="continue-booking-button"
          onClick={handleTrainPayment}
        >
          Continue Booking
        </button>
      </div>
    </div>
  );
};

export default TrainSeatBooking;
