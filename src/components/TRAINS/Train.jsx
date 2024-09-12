import React from "react";
import "./Train.css";
import { useTrainMainContext } from "../../Context/Trains/TrainMainContext";
import DateNoPopup from "./DepartureDate/DateNoPopup";
import DatePopup from "./DepartureDate/DatePopup";
import Offers from "../Offers";
import TrainPopup from "../TRAINS/TrainPopups/TrainPopup";
import TrainNoPopup from "./TrainPopups/TrainNoPopup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { trainData, trainCity } from "../Services/apiTrain";
const Train = () => {
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

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/TrainBooking");
  };

  console.log({ from, to });

  function handleMainSearch() {
    if (from !== to) {
      const searchParams = new URLSearchParams();
      searchParams.append("source");
      searchParams.append("destination");
      searchParams.append("destination");
      // searchParams.append("date", `${month}/${day}/${year}`);
      searchParams.append("arrival");
      navigate({
        pathname: "/FlightBooking",
        search: `?${searchParams.toString()}`,
      });
    } else {
      toast.dismiss();
      toast.error(
        "Cannot proceed further until the source and destination are different. Please correct it.",
        { style: { border: "1px solid black" } }
      );
    }
  }

  return (
    <div>
      <div className="Train-MainSection">
        <div className="caption-train">
          <img
            src="https://www.easemytrip.com/images/train-img/train-icon.svg"
            alt="irctc"
          />
          <p>Book Train Tickets</p>
        </div>

        <div className="Train-ticket-Box">
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
                <TrainPopup destination="from" />
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
                <TrainPopup destination="to" />
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

        <div className="bottom-heading">
          <img
            src="https://www.easemytrip.com/images/train-img/IRCTC-logo-nw2.png"
            className="irctc-logo"
            alt="logo"
          />
          <p>IRCTC Authorized Partner</p>
        </div>
      </div>
      <Offers />
    </div>
  );
};

export default Train;
