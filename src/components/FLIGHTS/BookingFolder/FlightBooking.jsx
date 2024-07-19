import React from "react";
import "../BookingFolder/FlightBooking.css";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";
import ReactDatePicker from "react-datepicker";
import FlightsNoPopup from "../FlightApiCall/FlightsNoPopup";
import LightModeIcon from "@mui/icons-material/LightMode";
import LandscapeIcon from "@mui/icons-material/Landscape";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import FlightTicketCard from "../FlightTicket/FlightTicketCard";

const FlightBooking = ({ destination }) => {
  const {
    travellersText,
    setTravellersVisible,
    travelClass,
    handleDateChange,
    dayOfWeek,
    selectedDate,
    fromCity,
    fromName,
    fromCountry,
    fromIata_Code,
    toCity,
    toCountry,
    toIata_Code,
    toName,
    HandleGo,
  } = useFlightsMainContext();
  let city, iataCode, name, country;
  if (destination === "from") {
    city = fromCity;
    iataCode = fromIata_Code;
    name = fromName;
    country = fromCountry;
  }
  if (destination === "to") {
    city = toCity;
    iataCode = toIata_Code;
    name = toName;
    country = toCountry;
  }

  return (
    <div>
      <div className="Booking-main">
        <div className="flight-from">
          <div>
            <FlightsNoPopup destination="from" />
          </div>
          <div>
            <FlightsNoPopup destination="to" />
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
            <input
              type="text"
              className="travellers-input"
              placeholder="Travellers"
              value={travellersText}
              onClick={() => setTravellersVisible((prev) => !prev)}
              readOnly
            />
          </div>
          <span>{travelClass}</span>
        </div>
        <button className="search-btn" onClick={HandleGo}>
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
        {/* <FlightTicketCard /> */}
      </div>
    </div>
  );
};

export default FlightBooking;
