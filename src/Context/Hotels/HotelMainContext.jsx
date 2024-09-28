import { createContext, useContext, useRef, useState } from "react";

const HotelMainContext = createContext();
function HotelMainProvider({ children }) {
  const [destinationPopup, setDestinationPopup] = useState(false);
  const [cityName, setCityName] = useState("Mumbai, Maharashtra");
  const destinationref = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guestsInput, setGuestsInput] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAdultsChange = (value) => {
    setAdults(value);
  };

  const handleChildrenChange = (value) => {
    setChild(value);
  };

  const handleDone = () => {
    const guestsText = `${parseInt(adults)} Adult${
      adults !== 1 ? "s" : ""
    }, ${parseInt(child)} Child${child !== 1 ? "ren" : ""}`;
    setGuestsInput(guestsText);
    setDropdownOpen(false);
  };

  const handleDestinationPopup = () => {
    setDestinationPopup(true);
  };
  const handleClickOut = (event) => {
    if (destinationref && !destinationref.current?.contains(event.target)) {
      setDestinationPopup(false);
    }
  };

  const chooseCity = (city, event) => {
    event.stopPropagation();
    setCityName(city);
    setDestinationPopup(false);
  };

  const [selectedInDate, setSelectedInDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [selectedOutDate, setSelectedOutDate] = useState();
  const handleDateChange = (date) => {
    setSelectedInDate(date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date).getDay();
    setDayOfWeek(days[day]);
  };

  return (
    <HotelMainContext.Provider
      value={{
        search,
        setSearch,
        destinationPopup,
        setDestinationPopup,
        cityName,
        setCityName,
        handleDestinationPopup,
        destinationref,
        handleClickOut,
        inputRef,
        chooseCity,
        child,
        checkInDate,
        setCheckInDate,
        dayOfWeek,
        setDayOfWeek,
        selectedInDate,
        setSelectedInDate,
        handleDateChange,
        setCheckOutDate,
        checkOutDate,
        selectedOutDate,
        setSelectedOutDate,
        handleDone,
        handleChildrenChange,
        handleAdultsChange,
        toggleDropdown,

        guestsInput,
        setGuestsInput,
        dropdownOpen,
        setDropdownOpen,

        setChild,
        adults,
        setAdults,
      }}
    >
      {children}
    </HotelMainContext.Provider>
  );
}

function useHotelMainContext() {
  const context = useContext(HotelMainContext);
  if (context === undefined) {
    throw new Error("HotelMainContext was used outside of  HotelMainProvider");
  }
  return context;
}
export { HotelMainProvider, useHotelMainContext };
