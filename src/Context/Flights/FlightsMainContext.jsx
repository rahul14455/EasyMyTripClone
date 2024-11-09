import { createContext, useContext, useRef, useState } from "react";
import { useFlightIndiudvalContext } from "./FlightIndiudvalContext";
import { format } from "date-fns";

const FlightsMainContext = createContext();

function FlightsMainProvider({ children }) {
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [travellersVisible, setTravellersVisible] = useState(false);

  const [fromIndex, setFromIndex] = useState("6514309e348f6fafa1b86600");
  const [toIndex, setToIndex] = useState("6514309e348f6fafa1b86601");
  const { airportList, cityName, setCityName } = useFlightIndiudvalContext();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const destinaionref = useRef(null);
  const toref = useRef(null);
  const dateref = useRef(null);
  const classref = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("cheap");
  const [filter, setFilter] = useState([]);

  const year = format(selectedDate, "yyyy");
  const shortYear = format(selectedDate, "yy");
  const month = format(selectedDate, "MMM");
  const weekday = format(selectedDate, "EEEEEEE");
  const day = format(selectedDate, "dd");
  const number = child + adults + infants;

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

  function handleClickOutside(event) {
    if (destinaionref.current && !destinaionref.current.contains(event.target))
      setIsFromPopupOpen(false);
    if (toref.current && !toref.current.contains(event.target))
      setIsToPopupOpen(false);
    if (dateref.current && !dateref.current.contains(event.target))
      setIsDatePopupOpen(false);
    if (classref.current && !classref.current.contains(event.target))
      setTravellersVisible(false);
  }

  const handleFrom = (e) => {
    e.stopPropagation();
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
    setIsDatePopupOpen(false);
    setTravellersVisible(false);
  };
  const handleTo = (e) => {
    e.stopPropagation();
    setIsFromPopupOpen(false);
    setIsToPopupOpen(true);
    setIsDatePopupOpen(false);
    setTravellersVisible(false);
  };

  function handleMainArrowButtonClick() {
    const tempIndex = fromIndex;
    setFromIndex(toIndex);
    setToIndex(tempIndex);
  }

  function handleDeparture(event) {
    event.stopPropagation();
    setIsDatePopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setTravellersVisible(false);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePopupOpen(false);
  };

  function handleDateClose(e) {
    e.stopPropagation();
    // setIsDatePopupOpen(false);
  }

  function handleClass(event) {
    event.stopPropagation();
    setTravellersVisible(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setIsDatePopupOpen(false);
  }

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

  const handleDone = (e) => {
    e.stopPropagation();
    setTravellersVisible(false);
  };

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

  const totalTravellers = adults + child + infants;

  // const handleClickOut = (event) => {
  //   if (destinaionref && !destinaionref.current?.contains(event.target)) {
  //     setIsFromPopupOpen(false);
  //   }
  // };

  // const toHandleClickout = (event) => {
  //   if (toref && !toref.current?.contains(event.target)) {
  //     setIsToPopupOpen(false);
  //   }
  // };

  // const [dayOfWeek, setDayOfWeek] = useState("");

  return (
    <FlightsMainContext.Provider
      value={{
        isFromPopupOpen,
        setIsFromPopupOpen,
        isToPopupOpen,
        setIsToPopupOpen,
        isDatePopupOpen,
        setIsDatePopupOpen,
        travellersVisible,
        setTravellersVisible,
        fromIndex,
        setFromIndex,
        toIndex,
        setToIndex,
        airportList,
        cityName,
        setCityName,
        selectedDate,
        setSelectedDate,
        adults,
        setAdults,
        child,
        setChild,
        infants,
        setInfants,
        travelClass,
        setTravelClass,
        destinaionref,
        toref,
        dateref,
        classref,
        inputRef,
        search,
        setSearch,
        sort,
        setSort,
        filter,
        setFilter,
        year,
        shortYear,
        month,
        weekday,
        day,
        number,
        fromCity,
        fromName,
        fromCountry,
        fromIata_Code,
        toCity,
        toName,
        toCountry,
        toIata_Code,
        handleTo,
        handleClickOutside,
        handleFrom,
        handleMainArrowButtonClick,
        handleDeparture,
        handleDateChange,
        handleDateClose,
        handleClass,
        chooseCity,
        handleDone,
        handleAdultsChange,
        handleChildrenChange,
        handleInfantsChange,
        handleTravelClassChange,
        totalTravellers,
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
