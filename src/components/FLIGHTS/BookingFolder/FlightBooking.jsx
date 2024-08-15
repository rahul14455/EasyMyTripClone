import React, { useEffect, useState } from "react";
import "../BookingFolder/FlightBooking.css";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import ReactDatePicker from "react-datepicker";
import FlightsNoPopup from "../FlightApiCall/FlightsNoPopup";
import LightModeIcon from "@mui/icons-material/LightMode";
import LandscapeIcon from "@mui/icons-material/Landscape";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import FlightTicket from "../FlightTicket/FlightTicket";
import FlightPopup from "../FlightApiCall/FlightPopup";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import TravellerClassNoPopup from "../Traveller&Class/TravellerClassNoPopup";
import TravellerClassPopupOpen from "../Traveller&Class/TravellerClassPopupOpen";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const FlightBooking = () => {
  const [searchparams] = useSearchParams();
  const source = searchparams.get("source");
  const destination = searchparams.get("destination");
  const selectday = searchparams.get("day").slice(0, 3);
  const selectDate = searchparams.get("date");
  console.log(selectday);
  const {
    travelClass,
    handleDateChange,
    dayOfWeek,
    selectedDate,
    fromCity,
    fromIata_Code,
    toIata_Code,
    isFromPopupOpen,
    isToPopupOpen,
    destinaionref,
    handleFrom,
    toref,
    handleTo,
    travellersVisible,
    toIndex,
    fromIndex,
    number,
    day,
    year,
    month,
    weekday,
    setToIndex,
    setFromIndex,
    setSelectedDate,
    setTravelClass,
    totalTravellers,
  } = useFlightsMainContext();

  console.log(day);
  const navigate = useNavigate();

  useEffect(() => {
    setFromIndex(source);
    setToIndex(destination);
    setSelectedDate(new Date(selectDate));
    // setTravelClass(passengerType);
    // setNumber(noOfPassengers);
    // setMaximumPrice(highestFlightPrice);
  }, [source, destination, selectDate]);

  function handlesubSearch() {
    if (fromIndex !== toIndex) {
      const searchParams = new URLSearchParams();
      searchParams.set("source", fromIata_Code);
      searchParams.set("destination", toIata_Code);
      searchParams.set("day", weekday);
      searchParams.set("date", `${month}/${day}/${year}`);
      searchParams.set("passenger", travelClass);
      searchParams.set("number", number);
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
      <div className="Booking-main">
        <div className="flight-from">
          <div>
            <div
              className="flight from"
              onClick={handleFrom}
              ref={destinaionref}
            >
              <span className="label">
                <FaPlaneDeparture /> FROM
              </span>
              {!isFromPopupOpen && <FlightsNoPopup destination="from" />}
              {isFromPopupOpen && <FlightPopup destination="from" />}
            </div>
          </div>
          <div>
            <div className="flight to" onClick={handleTo} ref={toref}>
              <span className="label">
                <FaPlaneArrival /> TO
              </span>
              {!isToPopupOpen && <FlightsNoPopup destination="to" />}
              {isToPopupOpen && <FlightPopup destination="to" />}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="date-picker">
            <ReactDatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="date-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
            />
          </div>
          {selectedDate && <span>{dayOfWeek}</span>}

          <div className="traveller">
            <div className="travellers">
              <span className="label">TRAVELLERS & CLASS</span>
              {!travellersVisible && <TravellerClassNoPopup />}
              {travellersVisible && <TravellerClassPopupOpen />}
            </div>
          </div>
          {/* <span>{travelClass}</span> */}
        </div>
        <button className="search-btn" onClick={handlesubSearch}>
          SEARCH
        </button>
      </div>
      <div className="center">
        <div className="sidebar">
          <div className="heading">
            <p>FILTER</p>
          </div>
          <div className="progrss">
            <span>One Way Price</span>
            <input
              type="range"
              id="slider"
              name="slider"
              min="0"
              max="2500"
              value="100"
            />
            <div className="mini">
              <p>Min: 0</p>
              <p>Max: 2500</p>
            </div>
          </div>

          <div className="stops">
            <span>Stops From {fromCity}</span>
            <div className="non-stop">
              <input type="checkbox" value="0" />
              <label> Non Stop</label>
            </div>

            <div className="one-stop">
              <input type="checkbox" value="1" />
              <label> 1 Stop</label>
            </div>

            <div className="two-stop">
              <input type="checkbox" value="2" />
              <label> 2 Stop</label>
            </div>
          </div>

          <div className="duration">
            <span>Duration</span>
            <div className="one">
              <input type="checkbox" value="1" />
              <label>1 Hour</label>
            </div>

            <div className="two">
              <input type="checkbox" value="2" />
              <label>2 Hour</label>
            </div>

            <div className="three">
              <input type="checkbox" value="3" />
              <label>3 Hour</label>
            </div>

            <div className="four">
              <input type="checkbox" value="4" />
              <label>4 Hour</label>
            </div>

            <div className="five">
              <input type="checkbox" value="5" />
              <label>5 Hour</label>
            </div>

            <div className="six">
              <input type="checkbox" value="6" />
              <label>6 Hour</label>
            </div>
          </div>

          <div className="departure">
            <span>Departure From {fromCity}</span>
            <div className="filter-icons">
              <div className="sunicon">
                <LandscapeIcon />
                <div>
                  <span>Before</span>
                  <br />
                  <span>6 AM</span>
                </div>
              </div>

              <div className="sunicon">
                <LightModeIcon />
                <div>
                  <span>6 AM-</span>
                  <br />
                  <span>12 PM</span>
                </div>
              </div>

              <div className="sunicon">
                <WbTwilightOutlinedIcon />

                <div>
                  <span>12PM-</span>
                  <br />
                  <span>6 PM</span>
                </div>
              </div>

              <div className="sunicon">
                <NightlightOutlinedIcon />
                <div>
                  <span>After</span>
                  <br />
                  <span>6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FlightTicket
          source={source}
          destination={destination}
          weekday={selectday}
        />
      </div>
    </div>
  );
};

export default FlightBooking;
