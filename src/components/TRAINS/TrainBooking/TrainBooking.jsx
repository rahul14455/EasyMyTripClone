import React, { useEffect, useState } from "react";
import "../TrainBooking/TrainBooking.css";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";
import TrainPopup from "../TrainPopups/TrainPopup";
import TrainNoPopup from "../TrainPopups/TrainNoPopup";
import DateNoPopup from "../DepartureDate/DateNoPopup";
import DatePopup from "../DepartureDate/DatePopup";
import TrainTicket from "../TrianTicketCard/TrainTicket";
import { trainData } from "../../Services/apiTrain";
import { useSearchParams } from "react-router-dom";
import { useBusIndiudvalContext } from "../../../Context/Bus/BusIndiudvalContext";
const TrainBooking = () => {
  const { fromtrainCity, toTrainCity, cityName } = useBusIndiudvalContext();
  const {
    to,
    setTo,
    from,
    setFrom,
    isToPopupOpen,
    setIsToPopupOpen,
    isFromPopupOpen,
    setIsFromPopupOpen,
    isDatePopupOpen,
    destinaionref,
    handleFrom,
  } = useTrainMainContext();
  const handleSearch = () => {};
  const [searchparams] = useSearchParams();
  const source = searchparams.get("source");
  const destination = searchparams.get("destination");
  // const selectday = searchparams.get("day").slice(0, 3);
  // const selectDate = searchparams.get("date");

  const [price, setPrice] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState([]);
  const [selectedArrival, setSelectedArrival] = useState([]);

  const handlePrice = (value) => {
    if (selectedPrice.includes(value)) {
      // Exclude 1 (remove it from the array)
      setSelectedPrice(selectedPrice.filter((price) => price !== value));
    } else {
      // Include 1 (add it to the array)
      setSelectedPrice([...selectedPrice, value]);
    }
  };

  const handleDeparture = (value) => {
    if (selectedDeparture.includes(value)) {
      // Exclude 1 (remove it from the array)
      setSelectedDeparture(
        selectedDeparture.filter((price) => price !== value)
      );
    } else {
      // Include 1 (add it to the array)
      setSelectedDeparture([...selectedDeparture, value]);
    }
  };

  const handleArrival = (value) => {
    if (selectedArrival.includes(value)) {
      // Exclude 1 (remove it from the array)
      setSelectedArrival(selectedArrival.filter((price) => price !== value));
    } else {
      // Include 1 (add it to the array)
      setSelectedArrival([...selectedArrival, value]);
    }
  };

  console.log(from);
  console.log(to);
  const handleChange = (event) => {
    const selectedPrice = event.target.value;
    setPrice(selectedPrice);
    const filterCondition = {
      price: { $lte: selectedPrice },
    };

    // You can use this filterCondition to update your query or perform other actions
    console.log("Filter Condition:", filterCondition);
  };

  return (
    <div>
      <div className="Train-booking-MainSection">
        <div className="Train-ticketBooking-Box">
          <div className="tsearch">
            <div className="train" ref={destinaionref}>
              <label className="label" htmlFor="from">
                From
              </label>
              <input
                type="text"
                id="from"
                className="train-input"
                placeholder="Enter departure station"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => {
                  setIsFromPopupOpen(true);
                  setIsToPopupOpen(false);
                }}
              />
              {isFromPopupOpen ? (
                <div
                  style={{
                    position: "absolute",
                    width: "470px",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    top: "-70px",
                    left: "180px",
                  }}
                >
                  <TrainPopup destination="from" />
                </div>
              ) : (
                <TrainNoPopup destination="from" />
              )}
            </div>

            <div className="train" ref={destinaionref}>
              <label className="label" htmlFor="to">
                To
              </label>
              <input
                type="text"
                id="to"
                className="train-input"
                placeholder="Enter destination station"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => {
                  setIsToPopupOpen(true);
                  setIsFromPopupOpen(false);
                }}
              />
              {isToPopupOpen ? (
                <div
                  style={{
                    position: "absolute",
                    width: "470px",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    top: "-70px",
                    left: "510px",
                  }}
                >
                  <TrainPopup destination="to" />
                </div>
              ) : (
                <TrainNoPopup destination="to" />
              )}
            </div>

            <div className="datepicker-train">
              <label className="label" htmlFor="departureDate">
                Departure Date
              </label>
              {!isDatePopupOpen && <DateNoPopup />}
              {isDatePopupOpen && <DatePopup />}
            </div>

            <button className="search-button-train" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {/* train-side-pannel */}

      <div className="train-center">
        <div className="train-side-pannel">
          <span>Filter By</span>
          <div className="journey-coach">
            <h3>Journey Coach Filter</h3>
            <div className="journey-price-checks">
              <input
                type="checkbox"
                value={1}
                checked={selectedPrice.includes(1)}
                onClick={() => {
                  handlePrice(1);
                }}
              />
              <label> Below - ₹ 600 </label>
            </div>

            <div className="price-checks">
              <input
                type="checkbox"
                value={0}
                checked={selectedPrice.includes(2)}
                onClick={() => {
                  handlePrice(2);
                }}
              />
              <label> ₹ 601 - ₹ 1200</label>
            </div>

            <div className="price-checks">
              <input
                type="checkbox"
                value={0}
                checked={selectedPrice.includes(3)}
                onClick={() => {
                  handlePrice(3);
                }}
              />
              <label> 1201 - ₹ 1600</label>
            </div>

            <div className="price-checks">
              <input
                type="checkbox"
                value={0}
                checked={selectedPrice.includes(4)}
                onClick={() => {
                  handlePrice(4);
                }}
              />
              <label> above - ₹ 1600</label>
            </div>
          </div>

          <div className="departure-coach">
            <h3>Departure From New Delhi</h3>

            <div className="departure-checks">
              <input
                type="checkbox"
                checked={selectedDeparture.includes(1)}
                onClick={() => {
                  handleDeparture(1);
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                checked={selectedDeparture.includes(2)}
                onClick={() => {
                  handleDeparture(2);
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                checked={selectedDeparture.includes(3)}
                onClick={() => {
                  handleDeparture(3);
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                checked={selectedDeparture.includes(4)}
                onClick={() => {
                  handleDeparture(4);
                }}
              />
              <label> Night 6pm - 12am</label>
            </div>
          </div>

          <div className="arrival-coach">
            <h3>Arrival From New Delhi</h3>

            <div className="arrival-checks">
              <input
                type="checkbox"
                checked={selectedArrival.includes(1)}
                onClick={() => {
                  handleArrival(1);
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                checked={selectedArrival.includes(2)}
                onClick={() => {
                  handleArrival(2);
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                checked={selectedArrival.includes(3)}
                onClick={() => {
                  handleArrival(3);
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                checked={selectedArrival.includes(4)}
                onClick={() => {
                  handleArrival(4);
                }}
              />
              <label> Night 6pm - 12am</label>
            </div>
          </div>
        </div>

        <TrainTicket
          source={source}
          destination={destination}
          // weekday={selectday}
          setDeparture={setDeparture}
          setArrival={setArrival}
          price={price}
          priceArr={selectedPrice}
          departureArr={selectedDeparture}
          arrivalArr={selectedArrival}
        />
      </div>
    </div>
  );
};

export default TrainBooking;
