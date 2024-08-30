import { createContext, useContext, useRef, useState } from "react";
const BusMainContext = createContext();

function BusMainProvider({ children }) {
  const [departureDate, setDepartureDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [fromIndex, setFromIndex] = useState();
  const [toIndex, setToIndex] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const destinaionref = useRef(null);
  const inputRef = useRef(null);
  const toref = useRef(null);

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
  return (
    <BusMainContext.Provider
      value={{
        handleClickOut,
        toHandleClickout,
        search,
        setSearch,
        handleTo,
        toref,
        inputRef,
        handleFrom,
        destinaionref,
        departureDate,
        setDepartureDate,
        isDatePopupOpen,
        setIsDatePopupOpen,
        isFromPopupOpen,
        setIsFromPopupOpen,
        isToPopupOpen,
        setIsToPopupOpen,
        handleDateChange,
        dayOfWeek,
        setDayOfWeek,
        selectedDate,
        toIndex,
        fromIndex,
        setSelectedDate,
        chooseCity,
        to,
        setTo,
        from,
        setFrom,
      }}
    >
      {children}
    </BusMainContext.Provider>
  );
}

function useBusMainContext() {
  const context = useContext(BusMainContext);
  if (context === undefined) {
    throw new Error("BusMainContext was used outside of BusMainProvider");
  }
  return context;
}

export { BusMainProvider, useBusMainContext };
