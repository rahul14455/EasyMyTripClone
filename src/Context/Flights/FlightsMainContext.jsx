import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useFlightIndiudvalContext } from "./FlightIndiudvalContext";
import { format } from "date-fns";

const FlightsMainContext = createContext();

function FlightsMainProvider({ children }) {
  const [fromIndex, setFromIndex] = useState("6514309e348f6fafa1b86600");
  const [toIndex, setToIndex] = useState("6514309e348f6fafa1b86601");
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const { airportList, cityName, setCityName } = useFlightIndiudvalContext();
  const [search, setSearch] = useState("");
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const inputRef = useRef(null);

  const [travellersVisible, setTravellersVisible] = useState(false);
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const [sort, setSort] = useState("cheap");
  const [filter, setFilter] = useState([]);

  const handleAdultsChange = (value) => {
    setAdults((prev) => Math.max(1, prev + value));
    console.log(typeof adults);
  };
  const handleChildrenChange = (value) => {
    setChild((prev) => Math.max(0, prev + value));
    console.log(typeof child);
  };
  const handleInfantsChange = (value) => {
    setInfants((prev) => Math.max(0, prev + value));
    console.log(typeof infants);
  };
  const handleTravelClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  const handleDone = () => {
    setTravellersVisible(false);
  };

  const totalTravellers = adults + child + infants;
  console.log(typeof adults);
  const travellersText = `${parseInt(totalTravellers)} Traveller${
    totalTravellers !== 1 ? "s" : ""
  }`;

  const {
    city: fromCity,
    name: fromName,
    country: fromCountry,
    iata_code: fromIata_Code,
  } = airportList?.find(
    (item) =>
      item._id === fromIndex ||
      item.city === fromIndex ||
      item.iata_code === fromIndex
  ) || {};

  const {
    city: toCity,
    name: toName,
    country: toCountry,
    iata_code: toIata_Code,
  } = airportList?.find(
    (item) =>
      item._id === toIndex ||
      item.city === toIndex ||
      item.iata_code === toIndex
  ) || {};
  const handleFrom = () => {
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
  };
  const handleTo = () => {
    setIsFromPopupOpen(false);
    setIsToPopupOpen(true);
  };
  const chooseCity = (index, e, destination) => {
    e.stopPropagation();
    if (destination === "from") {
      setFromIndex(index);
      setIsFromPopupOpen(false);
    } else if (destination === "to") {
      setToIndex(index);
      setIsToPopupOpen(false);
    }
  };
  const destinaionref = useRef(null);
  const toref = useRef(null);
  const handleClickOut = (event) => {
    if (destinaionref && !destinaionref.current?.contains(event.target)) {
      setIsFromPopupOpen(false);
    }
  };

  const toHandleClickout = (event) => {
    if (toref && !toref.current?.contains(event.target)) {
      setIsToPopupOpen(false);
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const day = format(selectedDate, "dd");
  const month = format(selectedDate, "MMM");
  const year = format(selectedDate, "yyyy");

  console.log(day);
  const number = child + adults + infants;
  const weekday = format(selectedDate, "EEEEEEE");

  return (
    <FlightsMainContext.Provider
      value={{
        weekday,
        year,
        month,
        day,
        number,
        setTravellersVisible,
        travellersVisible,
        toref,
        fromIndex,
        setFromIndex,
        fromCity,
        fromName,
        fromCountry,
        fromIata_Code,
        isFromPopupOpen,
        setIsFromPopupOpen,
        toCity,
        toCountry,
        toIata_Code,
        toName,
        toIndex,
        setToIndex,
        isToPopupOpen,
        setIsToPopupOpen,
        handleFrom,
        handleTo,
        inputRef,
        search,
        setSearch,
        cityName,
        setCityName,
        chooseCity,
        handleClickOut,
        destinaionref,
        toHandleClickout,
        setIsDatePopupOpen,
        isDatePopupOpen,
        handleDateChange,
        setSelectedDate,
        selectedDate,
        totalTravellers,
        travellersText,
        setChild,
        child,
        setAdults,
        adults,
        setTravelClass,
        travelClass,
        setInfants,
        infants,
        handleAdultsChange,
        handleChildrenChange,
        handleInfantsChange,
        handleTravelClassChange,
        handleDone,
        sort,
        setSort,
        filter,
        setFilter,
      }}
    >
      {children}
    </FlightsMainContext.Provider>
  );
}

function useFlightsMainContext() {
  const context = useContext(FlightsMainContext);
  if (context === undefined) {
    throw new Error(
      "FlightsMainContext was used outside of  FlightsMainProvider"
    );
  }
  return context;
}

export { FlightsMainProvider, useFlightsMainContext };
