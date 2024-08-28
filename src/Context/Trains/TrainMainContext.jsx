import { createContext, useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

const TrainMainContext = createContext();

function TrainMainProvider({ children }) {
  const [departureDate, setDepartureDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isDatePopupOpen, setDatePopupOpen] = useState(false);

  const [fromIndex, setFromIndex] = useState("Delhi Junction");
  const [toIndex, setToIndex] = useState("Surat");

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const inputRef = useRef(null);
  const destinaionref = useRef(null);
  const toref = useRef(null);

  const handleTrainDateChange = (date) => {
    setDepartureDate(date);
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
    <TrainMainContext.Provider
      value={{
        handleTrainDateChange,
        departureDate,
        setDepartureDate,
        dayOfWeek,
        setDayOfWeek,
        isToPopupOpen,
        setIsToPopupOpen,
        isFromPopupOpen,
        setIsFromPopupOpen,
        isDatePopupOpen,
        setDatePopupOpen,
        toIndex,
        setToIndex,
        fromIndex,
        setFromIndex,
        inputRef,
        search,
        setSearch,
        from,
        setFrom,
        to,
        setTo,
        chooseCity,
      }}
    >
      {children}
    </TrainMainContext.Provider>
  );
}

function useTrainMainContext() {
  const context = useContext(TrainMainContext);
  if (context === undefined) {
    throw new Error("TrainMainContext was used outside of  TrainMainProvider");
  }
  return context;
}

export { useTrainMainContext, TrainMainProvider };
