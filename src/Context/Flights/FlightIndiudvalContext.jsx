import { createContext, useContext, useState } from "react";
import useFlightList from "../../components/FLIGHTS/FlightApiCall/useFlightList";
const FlightIndiudvalContext = createContext();
function FlightIndiudvalProvider({ children }) {
  const { isLoading, flights } = useFlightList();
  const [cityName, setCityName] = useState(null);
  const airportList = flights?.data.airports;
  console.log(flights?.data.airports);
  return (
    <FlightIndiudvalContext.Provider
      value={{ isLoading, flights, airportList, cityName, setCityName }}
    >
      {children}
    </FlightIndiudvalContext.Provider>
  );
}

function useFlightIndiudvalContext() {
  const context = useContext(FlightIndiudvalContext);
  if (context === undefined) {
    throw new Error(
      "FlightIndiudvalContext was used outside of FlightIndiudvalProvider"
    );
  }
  return context;
}
export { FlightIndiudvalProvider, useFlightIndiudvalContext };
