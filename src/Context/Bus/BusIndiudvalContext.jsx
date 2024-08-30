import { createContext, useContext, useState } from "react";

const BusIndiudvalContext = createContext();

function BusIndiudvalProvider({ children }) {
  const [fromtrainCity, setFromTraincity] = useState();
  const [toTrainCity, setToTrainCity] = useState();
  const [cityName, setCityName] = useState(null);

  return (
    <BusIndiudvalContext.Provider
      value={{
        fromtrainCity,
        setFromTraincity,
        toTrainCity,
        setToTrainCity,
        cityName,
        setCityName,
      }}
    >
      {children}
    </BusIndiudvalContext.Provider>
  );
}

function useBusIndiudvalContext() {
  const context = useContext(BusIndiudvalContext);
  if (context === undefined) {
    throw new Error("BusMainContext was used outside of BusMainProvider");
  }
  return context;
}

export { BusIndiudvalProvider, useBusIndiudvalContext };
