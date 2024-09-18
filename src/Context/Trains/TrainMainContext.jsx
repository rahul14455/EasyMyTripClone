import { createContext, useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { trainCity } from "../../components/Services/apiTrain";
import { format } from "date-fns";

const TrainMainContext = createContext();

function TrainMainProvider({ children }) {
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isDatePopupOpen, setDatePopupOpen] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState("");

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("Delhi Junction");
  const [to, setTo] = useState("Surat");
  const inputRef = useRef(null);
  const destinaionref = useRef(null);
  const toref = useRef(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log(day);
  };

  const handleFrom = () => {
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
  };
  const handleTo = () => {
    setIsFromPopupOpen(false);
    setIsToPopupOpen(true);
  };

  console.log(departureDate);
  const chooseCity = (index, e, destination) => {
    e.stopPropagation();
    const cityName = trainCity[index]; // Fetch the city name from trainCity array
    if (destination === "from") {
      setFrom(cityName); // Set the from city
      setIsFromPopupOpen(false);
    } else if (destination === "to") {
      setTo(cityName); // Set the to city
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

        inputRef,
        search,
        setSearch,
        from, // Exposing the from state
        setFrom, // Exposing the setFrom function
        to, // Exposing the to state
        setTo, // Exposing the setTo function
        chooseCity,
        toHandleClickout,
        handleClickOut,
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </TrainMainContext.Provider>
  );
}

function useTrainMainContext() {
  const context = useContext(TrainMainContext);
  if (context === undefined) {
    throw new Error("TrainMainContext was used outside of TrainMainProvider");
  }
  return context;
}

export { useTrainMainContext, TrainMainProvider };
