import { createContext, useContext, useRef, useState } from "react";

const TrainMainContext = createContext();

function TrainMainProvider({ children }) {
  const [departureDate, setDepartureDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);

  const [fromIndex, setFromIndex] = useState("6514309e348f6fafa1b86600");
  const [toIndex, setToIndex] = useState("6514309e348f6fafa1b86601");

  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

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

  return (
    <TrainMainContext.Provider
      value={{
        departureDate,
        setDepartureDate,
        handleTrainDateChange,
        dayOfWeek,
        setDayOfWeek,
        isToPopupOpen,
        setIsToPopupOpen,
        isFromPopupOpen,
        setIsFromPopupOpen,
        toIndex,
        setToIndex,
        fromIndex,
        setFromIndex,
        inputRef,
        search,
        setSearch,
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
