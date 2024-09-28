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

  // useEffect(() => {
  //   setFrom(source);
  //   setTo(destination);
  //   // setSelectedDate(new Date(selectDate));
  //   // setTravelClass(passengerType);
  //   // setNumber(noOfPassengers);
  //   // setMaximumPrice(highestFlightPrice);
  // }, [source, destination]);
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
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> Below - ₹ 600 </label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> ₹ 601 - ₹ 1200</label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> 1201 - ₹ 1600</label>
            </div>

            <div className="price-checks">
              <input type="checkbox" value={price} onChange={handleChange} />
              <label> above - ₹ 1600</label>
            </div>
          </div>

          <div className="departure-coach">
            <h3>Departure From New Delhi</h3>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "6:00" });
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "7:00", $lte: "11:00" });
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "17:00" });
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="departure-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "18:00", $lte: "12:00" });
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
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "6:00" });
                }}
              />
              <label> Early Morning 12am - 6am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "7:00", $lte: "11:00" });
                }}
              />
              <label> Morning 7am - 11 am</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "12:00", $lte: "17:00" });
                }}
              />
              <label> Afternoon 12pm - 5pm</label>
            </div>

            <div className="arrival-checks">
              <input
                type="checkbox"
                onClick={() => {
                  setDeparture({ $gte: "18:00", $lte: "12:00" });
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
        />
      </div>
    </div>
  );
};

export default TrainBooking;
