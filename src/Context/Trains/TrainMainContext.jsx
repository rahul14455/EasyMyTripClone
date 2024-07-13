import { createContext, useContext, useState } from "react";

const TrainMainContext = createContext();

function TrainMainProvider({ children }) {
  const [departureDate, setDepartureDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
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
